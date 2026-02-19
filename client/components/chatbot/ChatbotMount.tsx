'use client';

import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(() => import('./ChatbotWidget'), {
  ssr: false,
  loading: () => null,
});

const ChatbotMount = () => {
  return <ChatbotWidget />;
};

export default ChatbotMount;

