'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(() => import('./ChatbotWidget'), {
  ssr: false,
  loading: () => null,
});

const CHATBOT_IDLE_LOAD_MS = 8000;

const ChatbotMount = () => {
  const [shouldMountWidget, setShouldMountWidget] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  const mountWidget = useCallback((open = false) => {
    setOpenOnMount(open);
    setShouldMountWidget(true);
  }, []);

  useEffect(() => {
    if (shouldMountWidget) return;

    const onFirstInteraction = () => {
      mountWidget(false);
    };

    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });

    const timeout = window.setTimeout(() => {
      mountWidget(false);
    }, CHATBOT_IDLE_LOAD_MS);

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.clearTimeout(timeout);
    };
  }, [mountWidget, shouldMountWidget]);

  if (!shouldMountWidget) {
    return (
      <div className="fixed bottom-5 right-5 z-[95]">
        <button
          type="button"
          onClick={() => mountWidget(true)}
          className="px-4 py-3 bg-primary text-black font-semibold text-sm uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-colors"
          aria-label="Open AI chat"
        >
          AI Chat
        </button>
      </div>
    );
  }

  return <ChatbotWidget autoOpen={openOnMount} />;
};

export default ChatbotMount;
