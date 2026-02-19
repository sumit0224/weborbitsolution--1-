'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  budget: string;
  timeline: string;
};

const quickButtons = ['Website Development', 'App Development', 'SaaS Development', 'Talk to Expert'];
const leadIntentRegex = /(price|pricing|cost|quote|budget|timeline|project|proposal|hire|consultation|demo)/i;
const SUBMIT_DEBOUNCE_MS = 250;
const REQUEST_THROTTLE_MS = 1200;

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSaving, setLeadSaving] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: 'assistant',
      content:
        'Hi, I am your WebOrbitSolution AI assistant. Planning to build a SaaS product, website, or app in India? I can help with scope, cost, and next steps.',
    },
  ]);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    budget: '',
    timeline: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRequestAtRef = useRef(0);
  const lastSubmittedTextRef = useRef('');

  const payloadMessages = useMemo(
    () => messages.map((msg) => ({ role: msg.role, content: msg.content })).slice(-12),
    [messages],
  );

  const pushMessage = (role: Message['role'], content: string) => {
    setMessages((prev) => [...prev, { id: createId(), role, content }]);
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });
  };

  const askAssistant = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || loading) return;
    const now = Date.now();
    const isRapidRepeat = now - lastRequestAtRef.current < REQUEST_THROTTLE_MS;
    const isDuplicate = lastSubmittedTextRef.current === trimmed.toLowerCase();
    if (isRapidRepeat && isDuplicate) {
      return;
    }
    lastRequestAtRef.current = now;
    lastSubmittedTextRef.current = trimmed.toLowerCase();

    pushMessage('user', trimmed);
    setInput('');
    setLoading(true);
    setLeadError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...payloadMessages, { role: 'user', content: trimmed }],
        }),
      });

      const data = await response.json().catch(() => ({}));
      const reply = typeof data?.reply === 'string' && data.reply ? data.reply : 'Could you share more details?';
      pushMessage('assistant', reply);

      if (data?.shouldCaptureLead || leadIntentRegex.test(trimmed)) {
        setLeadOpen(true);
      }
    } catch {
      pushMessage(
        'assistant',
        'I am temporarily unavailable. Please share your Name, Email, Phone, Budget, Timeline, and Project Details for a free consultation.',
      );
      if (leadIntentRegex.test(trimmed)) {
        setLeadOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const scheduleAskAssistant = (text: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      askAssistant(text);
    }, SUBMIT_DEBOUNCE_MS);
  };

  const submitLead = async () => {
    if (leadSaving) return;

    setLeadSaving(true);
    setLeadError('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submitLead: true,
          lead: leadForm,
          messages: payloadMessages,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setLeadError(data?.error || 'Unable to submit. Please try again.');
        return;
      }

      pushMessage(
        'assistant',
        data?.reply ||
          'Your request has been captured successfully. Our team will contact you soon with consultation options.',
      );
      setLeadOpen(false);
      setLeadForm({
        name: '',
        email: '',
        phone: '',
        projectDetails: '',
        budget: '',
        timeline: '',
      });
    } catch {
      setLeadError('Lead submission failed. Please try again.');
    } finally {
      setLeadSaving(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[95]">
      {open && (
        <div className="w-[min(92vw,380px)] h-[min(76vh,620px)] bg-[#0b0b0b] border border-white/15 rounded-lg shadow-2xl flex flex-col overflow-hidden mb-3">
          <div className="px-4 py-3 border-b border-white/10 bg-black/70">
            <p className="text-primary text-xs uppercase tracking-[0.25em]">AI Assistant</p>
            <p className="text-white text-sm mt-1">Free consultation support for India projects</p>
          </div>

          <div ref={containerRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[90%] p-3 text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-white/10 text-gray-100 border border-white/10'
                    : 'ml-auto bg-primary/20 text-white border border-primary/40'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Thinking...</div>}
          </div>

          <div className="px-3 py-2 border-t border-white/10 bg-black/60">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickButtons.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    label === 'Talk to Expert'
                      ? setLeadOpen(true)
                      : scheduleAskAssistant(`I need help with ${label.toLowerCase()} in India.`)
                  }
                  className="text-[11px] px-2 py-1 border border-white/20 text-gray-200 hover:border-primary hover:text-primary transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {leadOpen && (
              <div className="border border-primary/40 bg-primary/10 p-3 space-y-2 mb-2">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Consultation Form</p>
                <input
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none"
                />
                <input
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Email"
                  type="email"
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none"
                />
                <input
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none"
                />
                <input
                  value={leadForm.budget}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, budget: e.target.value }))}
                  placeholder="Project Budget (e.g. INR 5L-10L)"
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none"
                />
                <input
                  value={leadForm.timeline}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, timeline: e.target.value }))}
                  placeholder="Timeline (e.g. 8 weeks)"
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none"
                />
                <textarea
                  value={leadForm.projectDetails}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, projectDetails: e.target.value }))}
                  placeholder="Project Details"
                  rows={3}
                  className="w-full px-2 py-2 text-sm bg-black/50 border border-white/20 outline-none resize-none"
                />
                {leadError && <p className="text-red-400 text-xs">{leadError}</p>}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitLead}
                    disabled={leadSaving}
                    className="px-3 py-2 text-xs uppercase tracking-[0.2em] bg-primary text-black font-semibold disabled:opacity-60"
                  >
                    {leadSaving ? 'Submitting...' : 'Book Free Consultation'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadOpen(false)}
                    className="px-3 py-2 text-xs uppercase tracking-[0.2em] border border-white/30 text-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    scheduleAskAssistant(input);
                  }
                }}
                placeholder="Ask about pricing, timeline, or services..."
                className="flex-1 px-3 py-2 text-sm bg-black/60 border border-white/20 outline-none"
              />
              <button
                type="button"
                onClick={() => scheduleAskAssistant(input)}
                disabled={loading}
                className="px-3 py-2 text-xs uppercase tracking-[0.2em] border border-white/30 hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-3 bg-primary text-black font-semibold text-sm uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-colors"
      >
        {open ? 'Close Chat' : 'AI Chat'}
      </button>
    </div>
  );
};

export default ChatbotWidget;
