import { NextRequest, NextResponse } from 'next/server';
import { getChatbotSystemPrompt } from '../../../lib/chatbot/systemPrompt';
import { saveLeadToBackend, type LeadCaptureInput } from '../../../lib/chatbot/lead';

export const runtime = 'nodejs';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
  submitLead?: boolean;
  lead?: LeadCaptureInput;
};

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 25;
const rateStore = new Map<string, { count: number; resetAt: number }>();

const leadIntentRegex = /(price|pricing|cost|quote|budget|timeline|project|proposal|hire|consultation|demo)/i;

const safeMessages = (messages: ChatMessage[] = []) =>
  messages
    .filter((msg) => msg && (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string')
    .map((msg) => ({
      role: msg.role,
      content: msg.content.trim().slice(0, 600),
    }))
    .filter((msg) => msg.content.length > 0)
    .slice(-12);

const getClientKey = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0]?.trim();
  return ip || 'unknown';
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const existing = rateStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_MAX) {
    return true;
  }

  existing.count += 1;
  return false;
};

const fallbackReply = (messages: ChatMessage[]) => {
  const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user')?.content || '';
  const shouldCaptureLead = leadIntentRegex.test(lastUserMessage);
  return {
    reply: shouldCaptureLead
      ? 'We can help with that. Please share your Name, Email, Phone, Budget, Timeline, and Project Details for a free consultation plan.'
      : 'We help with Website Development, App Development, SaaS Product Development, Custom Software, SEO, and IT Consulting across India. Share your goal and I can suggest the best next step.',
    shouldCaptureLead,
  };
};

const callOpenAI = async (messages: ChatMessage[]) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackReply(messages);
  }

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: getChatbotSystemPrompt() },
        ...messages,
      ],
    }),
    cache: 'no-store',
  });

  if (!completion.ok) {
    return fallbackReply(messages);
  }

  const data = await completion.json().catch(() => ({}));
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    return fallbackReply(messages);
  }

  try {
    const parsed = JSON.parse(content);
    return {
      reply: String(parsed.reply || '').trim() || fallbackReply(messages).reply,
      shouldCaptureLead: Boolean(parsed.shouldCaptureLead),
    };
  } catch {
    return fallbackReply(messages);
  }
};

export async function POST(request: NextRequest) {
  const key = getClientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as ChatRequestBody;
  const messages = safeMessages(body.messages || []);

  if (body.submitLead) {
    if (!body.lead) {
      return NextResponse.json({ error: 'Lead details are missing.' }, { status: 400 });
    }

    const result = await saveLeadToBackend(body.lead, messages);
    if (!result.ok) {
      return NextResponse.json({ error: result.error || 'Unable to capture lead.' }, { status: 500 });
    }

    return NextResponse.json({
      reply:
        'Thank you. Your consultation request is submitted successfully. Our team will contact you shortly to discuss scope, timeline, and pricing.',
      shouldCaptureLead: false,
      leadSaved: true,
    });
  }

  if (messages.length === 0) {
    return NextResponse.json({
      reply:
        'Welcome to WebOrbitSolution. We provide Website, App, SaaS, and Custom Software development across India. What are you planning to build?',
      shouldCaptureLead: false,
    });
  }

  try {
    const result = await callOpenAI(messages);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(fallbackReply(messages));
  }
}
