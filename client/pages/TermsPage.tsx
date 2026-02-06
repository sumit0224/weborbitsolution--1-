import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">Terms of Service</h1>
        <p className="text-gray-400 mt-6">Last updated: February 6, 2026</p>

        <div className="mt-10 space-y-8 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. Overview</h2>
            <p className="mt-3">These Terms govern your access to WebOrbitSolution and any services or content we provide.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">2. Engagements</h2>
            <p className="mt-3">Project scopes, timelines, and fees are defined in written proposals or statements of work.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">3. Payments</h2>
            <p className="mt-3">Invoices are due per the schedule defined in your agreement. Late payments may pause delivery.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">4. Intellectual Property</h2>
            <p className="mt-3">We transfer rights upon full payment unless otherwise specified.</p>
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

export default TermsPage;
