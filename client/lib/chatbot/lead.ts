type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LeadCaptureInput = {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  budget: string;
  timeline: string;
};

const splitName = (fullName: string) => {
  const normalized = fullName.trim().replace(/\s+/g, ' ');
  const [first, ...rest] = normalized.split(' ');
  return {
    firstName: first || 'Client',
    lastName: rest.join(' ') || 'Inquiry',
  };
};

const trimSlash = (value: string) => value.replace(/\/+$/, '');
const getLeadApiUrl = () => {
  if (typeof window !== 'undefined') {
    return '/api/inquiry';
  }

  const configured =
    process.env.API_BASE_URL || process.env.PAYMENTS_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
  if (configured) {
    return `${trimSlash(configured)}/api/inquiry`;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:4000/api/inquiry';
  }

  return '';
};

const buildInquiryMessage = (lead: LeadCaptureInput, messages: ChatMessage[]) => {
  const userContext = messages
    .filter((item) => item.role === 'user')
    .slice(-3)
    .map((item) => item.content)
    .join('\n- ');

  return [
    'Lead Source: AI Chatbot',
    `Phone: ${lead.phone}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    `Project Details: ${lead.projectDetails}`,
    userContext ? `Recent User Questions:\n- ${userContext}` : '',
  ]
    .filter(Boolean)
    .join('\n');
};

export const saveLeadToBackend = async (lead: LeadCaptureInput, messages: ChatMessage[]) => {
  const name = lead.name?.trim() || '';
  const email = lead.email?.trim().toLowerCase() || '';
  const phone = lead.phone?.trim() || '';
  const projectDetails = lead.projectDetails?.trim() || '';
  const budget = lead.budget?.trim() || '';
  const timeline = lead.timeline?.trim() || '';

  if (!name || !email || !phone || !projectDetails || !budget || !timeline) {
    return { ok: false, error: 'All lead fields are required.' };
  }

  const { firstName, lastName } = splitName(name);
  const message = buildInquiryMessage(
    {
      name,
      email,
      phone,
      projectDetails,
      budget,
      timeline,
    },
    messages,
  );

  try {
    const inquiryUrl = getLeadApiUrl();
    if (!inquiryUrl) {
      return { ok: false, error: 'Lead service is not configured.' };
    }

    const response = await fetch(inquiryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        message,
      }),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.ok) {
      return { ok: false, error: data?.error || 'Failed to save lead.' };
    }

    return { ok: true, id: data.id as string | undefined };
  } catch (error) {
    return { ok: false, error: 'Lead service is temporarily unavailable.' };
  }
};
