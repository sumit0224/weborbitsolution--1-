import React from 'react';

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

const JsonLd = ({ data }: JsonLdProps) => {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
