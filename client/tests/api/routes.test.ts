import { GET as getBlogPosts } from '../../app/api/blog/posts/route';
import { POST as postChat } from '../../app/api/chat/route';

describe('API routes', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  test('chat route returns a valid welcome response', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: [] }),
    });

    const response = await postChat(request as never);
    const payload = (await response.json()) as { reply?: string };

    expect(response.status).toBe(200);
    expect(payload.reply).toContain('Welcome to WebOrbitSolution');
  });

  test('blog posts route returns 500 when backend base URL is missing in production', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    delete process.env.API_BASE_URL;
    delete process.env.PAYMENTS_BACKEND_URL;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    const request = new Request('http://localhost/api/blog/posts');
    const response = await getBlogPosts(request);
    const payload = (await response.json()) as { error?: string };

    expect(response.status).toBe(500);
    expect(payload.error).toContain('Blog backend is not configured');
  });
});
