import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-gray-400 mt-6">Last updated: February 6, 2026</p>

        <div className="mt-10 space-y-8 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p className="mt-3">We collect contact details you submit through forms and analytics data for site performance.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">2. How We Use Data</h2>
            <p className="mt-3">We use data to respond to inquiries, improve our services, and communicate relevant updates.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">3. Data Sharing</h2>
            <p className="mt-3">We do not sell personal data. We only share with trusted partners as required to deliver services.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">4. Your Rights</h2>
            <p className="mt-3">You can request access, updates, or deletion of your data at any time.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">5. Contact</h2>
            <p className="mt-3">Questions? Email hello@weborbit.com.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
