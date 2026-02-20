import React from 'react';
import { headers } from 'next/headers';

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

const JsonLd = async ({ data }: JsonLdProps) => {
  if (!data) return null;
  const nonce = (await headers()).get('x-nonce') || undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
