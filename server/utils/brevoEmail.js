import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';

const emailApi = new TransactionalEmailsApi();
emailApi.authentications.apiKey.apiKey = process.env.BREVO_API_KEY || '';

const defaultSender = {
  email: process.env.BREVO_SENDER_EMAIL || '',
  name: process.env.BREVO_SENDER_NAME || 'WebOrbitSolution',
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from = defaultSender,
  replyTo,
}) => {
  if (!process.env.BREVO_API_KEY) {
    return { ok: false, error: 'BREVO_API_KEY is missing.' };
  }

  if (!from?.email) {
    return { ok: false, error: 'Sender email is required and must be verified in Brevo.' };
  }

  if (!to || (Array.isArray(to) ? to.length === 0 : !to.email)) {
    return { ok: false, error: 'Recipient email is required.' };
  }

  if (!subject || !html) {
    return { ok: false, error: 'Subject and HTML content are required.' };
  }

  const message = new SendSmtpEmail();
  message.sender = { name: from.name, email: from.email };
  message.to = Array.isArray(to) ? to : [to];
  message.subject = subject;
  message.htmlContent = html;

  if (text) {
    message.textContent = text;
  }

  if (replyTo?.email) {
    message.replyTo = replyTo;
  }

  try {
    const response = await emailApi.sendTransacEmail(message);
    return { ok: true, data: response.body };
  } catch (error) {
    const details = error?.body || error?.response?.body || error?.message;
    return { ok: false, error: 'Brevo send failed.', details };
  }
};
