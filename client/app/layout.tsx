import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import SiteLayout from '../layouts/SiteLayout';
import LoaderCleanup from './LoaderCleanup';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { baseMetadata } from '../lib/seo';

export const metadata = baseMetadata;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const nonce = headers().get('x-nonce') || undefined;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
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

        <div id="loader-wrapper">
          <div id="loader-text" className="loader-text-container">WebOrbit Solution</div>
          <div className="loader-blind" style={{ left: '0%', transitionDelay: '0.0s' }} />
          <div className="loader-blind" style={{ left: '20%', transitionDelay: '0.1s' }} />
          <div className="loader-blind" style={{ left: '40%', transitionDelay: '0.15s' }} />
          <div className="loader-blind" style={{ left: '60%', transitionDelay: '0.2s' }} />
          <div className="loader-blind" style={{ left: '80%', transitionDelay: '0.25s' }} />
        </div>

        <SiteLayout>{children}</SiteLayout>
        <LoaderCleanup />

        <Script id="theme-init" strategy="beforeInteractive" nonce={nonce}>
          {`(function () {
            const stored = localStorage.getItem('theme');
            const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
            document.documentElement.dataset.theme = theme;
          })();`}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TBPMWFC2RV" strategy="lazyOnload" nonce={nonce} />
        <Script id="gtag-init" strategy="lazyOnload" nonce={nonce}>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-TBPMWFC2RV');`}
        </Script>

        <Script id="clarity-init" strategy="lazyOnload" nonce={nonce}>
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vfn1lr7rml");`}
        </Script>

        
      </body>
    </html>
  );
}
