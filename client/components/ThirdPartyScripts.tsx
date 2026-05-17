'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

type ThirdPartyScriptsProps = {
  nonce?: string;
};

const SCRIPT_DELAY_MS = 6000;

const ThirdPartyScripts = ({ nonce }: ThirdPartyScriptsProps) => {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    if (shouldLoadScripts) return;

    const enableScripts = () => setShouldLoadScripts(true);

    const onFirstInteraction = () => {
      enableScripts();
    };

    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

    const timeout = window.setTimeout(enableScripts, SCRIPT_DELAY_MS);

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      window.clearTimeout(timeout);
    };
  }, [shouldLoadScripts]);

  if (!shouldLoadScripts) {
    return null;
  }

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-TBPMWFC2RV" strategy="afterInteractive" nonce={nonce} />
      <Script id="gtag-init" strategy="afterInteractive" nonce={nonce}>
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-TBPMWFC2RV');`}
      </Script>

      <Script id="clarity-init" strategy="afterInteractive" nonce={nonce}>
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "vfn1lr7rml");`}
      </Script>
    </>
  );
};

export default ThirdPartyScripts;
