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
const THROTTLE_MIN_INTERVAL_MS = 800;
const rateStore = new Map<string, { count: number; resetAt: number; lastAt: number }>();

const leadIntentRegex = /(price|pricing|cost|quote|budget|timeline|project|proposal|hire|consultation|demo)/i;
const hindiRegex = /(mujhe|mujh|bnvani|banvani|banana|banani|chahiye|kitna|kaise|kab|krna|karna|hai|h)/i;
const pricingRegex = /(price|pricing|cost|budget|quote|estimate|rate|kitna)/i;
const timelineRegex = /(timeline|deadline|delivery|time|weeks|months|kab)/i;

type ServiceIntent = 'website' | 'app' | 'saas' | 'seo' | 'customSoftware' | 'general';

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

const getTrafficState = (key: string) => {
  const now = Date.now();
  const existing = rateStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS, lastAt: now });
    return { limited: false, reason: '' };
  }

  if (now - existing.lastAt < THROTTLE_MIN_INTERVAL_MS) {
    existing.lastAt = now;
    return { limited: true, reason: 'throttle' };
  }

  if (existing.count >= RATE_MAX) {
    existing.lastAt = now;
    return { limited: true, reason: 'rate' };
  }

  existing.count += 1;
  existing.lastAt = now;
  return { limited: false, reason: '' };
};

const detectServiceIntent = (text: string): ServiceIntent => {
  if (/(saas|subscription|multi-tenant|tenant)/i.test(text)) return 'saas';
  if (/(android|ios|mobile app|app development|\bapp\b)/i.test(text)) return 'app';
  if (/(seo|ranking|google|bing|traffic)/i.test(text)) return 'seo';
  if (/(custom software|crm|erp|automation|dashboard|portal)/i.test(text)) return 'customSoftware';
  if (/(website|web site|landing page|web development|\bsite\b)/i.test(text)) return 'website';
  return 'general';
};

const getServiceLine = (intent: ServiceIntent, hinglish: boolean) => {
  if (hinglish) {
    switch (intent) {
      case 'website':
        return 'Bilkul, hum Website Development mein help karte hain aur conversion-focused website build karte hain.';
      case 'app':
        return 'Bilkul, hum Android/iOS App Development aur scalable backend ke saath complete support dete hain.';
      case 'saas':
        return 'Bilkul, hum SaaS Product Development mein MVP se scalable architecture tak end-to-end support dete hain.';
      case 'seo':
        return 'Bilkul, hum SEO Services ke through Google/Bing aur AI search visibility improve karte hain.';
      case 'customSoftware':
        return 'Bilkul, hum Custom Software Development se business workflows ke hisaab se system build karte hain.';
      default:
        return 'Hum Website, App, SaaS, Custom Software, SEO aur IT Consulting services PAN India provide karte hain.';
    }
  }

  switch (intent) {
    case 'website':
      return 'Great. We can help with Website Development and conversion-focused implementation.';
    case 'app':
      return 'Great. We can help with Android/iOS App Development with scalable backend architecture.';
    case 'saas':
      return 'Great. We can help with SaaS Product Development from MVP to scale.';
    case 'seo':
      return 'Great. We can help with SEO Services for Google, Bing, and AI search visibility.';
    case 'customSoftware':
      return 'Great. We can help with Custom Software Development aligned to your workflow.';
    default:
      return 'We support Website, App, SaaS, Custom Software, SEO, and IT Consulting across India.';
  }
};

const getPricingLine = (intent: ServiceIntent, hinglish: boolean) => {
  if (hinglish) {
    switch (intent) {
      case 'website':
        return 'Website projects usually INR 40,000 se start hote hain aur scope ke hisaab se INR 3.5L+ tak ja sakte hain.';
      case 'app':
        return 'App MVP projects usually INR 3L se start hote hain; complex apps ke liye budget higher hota hai.';
      case 'saas':
        return 'SaaS MVP budget generally INR 4L se start hota hai, growth-stage products ke liye phased budget plan banta hai.';
      case 'customSoftware':
        return 'Custom software projects typically INR 3L+ se start hote hain based on modules and integrations.';
      default:
        return 'Pricing scope, features, integrations, aur timeline par depend karti hai; hum consultation mein accurate estimate share karte hain.';
    }
  }

  switch (intent) {
    case 'website':
      return 'Website projects usually start around INR 40,000 and can scale to INR 3.5L+ based on scope.';
    case 'app':
      return 'App MVP projects usually start around INR 3L, with higher budgets for advanced features and integrations.';
    case 'saas':
      return 'SaaS MVP budgets generally start around INR 4L with phased scaling based on roadmap complexity.';
    case 'customSoftware':
      return 'Custom software projects typically start around INR 3L+ based on workflows and integrations.';
    default:
      return 'Pricing depends on scope, integrations, and timeline; we provide accurate estimates after a short discovery call.';
  }
};

const fallbackReply = (messages: ChatMessage[]) => {
  const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user')?.content || '';
  const normalized = lastUserMessage.toLowerCase();
  const intent = detectServiceIntent(normalized);
  const isHinglish = hindiRegex.test(normalized);
  const asksPricing = pricingRegex.test(normalized);
  const asksTimeline = timelineRegex.test(normalized);
  const buildIntent = /(need|want|looking|build|develop|start|mujhe|chahiye|bnvani|banvani|banani)/i.test(normalized);
  const shouldCaptureLead = leadIntentRegex.test(lastUserMessage) || asksPricing || asksTimeline || buildIntent;

  const lines: string[] = [getServiceLine(intent, isHinglish)];

  if (asksPricing) {
    lines.push(getPricingLine(intent, isHinglish));
  }

  if (asksTimeline) {
    lines.push(
      isHinglish
        ? 'Typical timeline basic website ke liye 2-4 weeks, app/SaaS MVP ke liye 6-12 weeks hoti hai.'
        : 'Typical timeline is 2-4 weeks for a basic website and 6-12 weeks for app/SaaS MVP delivery.',
    );
  }

  lines.push(
    isHinglish
      ? 'Agar aap chaho to main free consultation ke liye Name, Email, Phone, Budget, Timeline aur Project Details le sakta hoon.'
      : 'If you want, I can capture your Name, Email, Phone, Budget, Timeline, and Project Details for a free consultation.',
  );

  return {
    reply: lines.join(' '),
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
    const plainTextReply = content.trim();
    return {
      reply: plainTextReply || fallbackReply(messages).reply,
      shouldCaptureLead: leadIntentRegex.test(plainTextReply) || fallbackReply(messages).shouldCaptureLead,
    };
  }
};

export async function POST(request: NextRequest) {
  const key = getClientKey(request);
  const traffic = getTrafficState(key);
  if (traffic.limited) {
    return NextResponse.json(
      {
        error:
          traffic.reason === 'throttle'
            ? 'Please wait a moment before sending the next message.'
            : 'Too many requests. Please try again in a minute.',
      },
      { status: 429 },
    );
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
