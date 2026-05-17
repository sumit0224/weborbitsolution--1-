import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import SiteLayout from '../layouts/SiteLayout';
import ChatbotMount from '../components/chatbot/ChatbotMount';
import ThirdPartyScripts from '../components/ThirdPartyScripts';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { baseMetadata } from '../lib/seo';
import { organizationJsonLd } from '../lib/structured-data';

export const metadata = baseMetadata;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
  colorScheme: 'light dark',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = (await headers()).get('x-nonce') || undefined;
  const globalOrgSchema = organizationJsonLd();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOrgSchema) }}
        />

        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <defs>
            <filter id="liquid-flow">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={1} result="noise">
                <animate attributeName="baseFrequency" dur="8s" values="0.015; 0.025; 0.015" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={10} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <SiteLayout>{children}</SiteLayout>
        <ChatbotMount />

        <Script id="theme-init" strategy="beforeInteractive" nonce={nonce}>
          {`(function () {
            const stored = localStorage.getItem('theme');
            const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
            document.documentElement.dataset.theme = theme;
          })();`}
        </Script>

        <ThirdPartyScripts nonce={nonce} />
      </body>
    </html>
  );
}
