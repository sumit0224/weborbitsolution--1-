import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">Terms & Conditions</h1>
        <p className="text-gray-400 mt-6">Last updated: [Add Date]</p>

        <div className="mt-8 text-gray-300 space-y-4">
          <p>Welcome to [Your Business Name].</p>
          <p>
            By accessing or using our website and services, you agree to comply with and be bound by the following Terms
            & Conditions. Please read them carefully before using our services.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. Definitions</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>“Company”, “We”, “Us”, “Our” refers to [Your Business Name].</li>
              <li>“Client”, “You”, “User” refers to any person or business using our services.</li>
              <li>“Services” refers to all IT, digital, development, consulting, and related services provided by us.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">2. Acceptance of Terms</h2>
            <p className="mt-3">By using our website or services, you confirm that:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>You are legally capable of entering into a binding agreement.</li>
              <li>You accept these Terms & Conditions in full.</li>
            </ul>
            <p className="mt-3">If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">3. Scope of Services</h2>
            <p className="mt-3">We provide IT-related services including but not limited to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Website & application development</li>
              <li>UI/UX design</li>
              <li>Digital marketing & SEO</li>
              <li>Software consulting</li>
              <li>Maintenance & support services</li>
            </ul>
            <p className="mt-3">
              The exact scope, timeline, and pricing will be defined in a proposal, quotation, or agreement shared with
              the client.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">4. Payments & Billing</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>All payments must be made as per the agreed quotation or invoice.</li>
              <li>Advance payment may be required before starting a project.</li>
              <li>Delays in payment may result in service suspension.</li>
              <li>Prices are exclusive of applicable taxes unless stated otherwise.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">5. Refund & Cancellation</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Payments once made are non-refundable, unless explicitly mentioned in writing.</li>
              <li>Project cancellation after work commencement may not be eligible for a refund.</li>
              <li>Any approved refund will be processed within 7–10 business days.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">6. Client Responsibilities</h2>
            <p className="mt-3">The client agrees to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Provide accurate and complete project requirements.</li>
              <li>Share required content, credentials, and approvals on time.</li>
              <li>Respond promptly to avoid project delays.</li>
            </ul>
            <p className="mt-3">Delays caused by the client may impact delivery timelines.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">7. Intellectual Property</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>All original work created by us remains our property until full payment is received.</li>
              <li>
                After payment, ownership of final deliverables is transferred to the client, unless stated otherwise.
              </li>
            </ul>
            <p className="mt-3">We reserve the right to showcase completed work in our portfolio.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">8. Confidentiality</h2>
            <p className="mt-3">We respect client confidentiality and will not disclose sensitive information, except:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>When required by law</li>
              <li>With client’s written permission</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">9. Limitation of Liability</h2>
            <p className="mt-3">We are not liable for:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data, revenue, or business due to service usage</li>
              <li>Third-party tools, hosting, or software failures</li>
            </ul>
            <p className="mt-3">Our liability is limited to the amount paid for the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">10. Third-Party Services</h2>
            <p className="mt-3">
              Our services may involve third-party platforms, tools, or APIs. We are not responsible for changes,
              downtime, or policies of third-party providers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">11. Termination</h2>
            <p className="mt-3">We reserve the right to terminate services if:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Terms are violated</li>
              <li>Payments are not made</li>
              <li>Illegal or unethical activities are involved</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">12. Governing Law</h2>
            <p className="mt-3">
              These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any
              disputes shall be subject to the jurisdiction of Indian courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">13. Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right to modify these Terms at any time. Updated terms will be posted on this page with a
              revised date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">14. Contact Information</h2>
            <p className="mt-3">For any questions regarding these Terms & Conditions, contact us at:</p>
            <div className="mt-4 space-y-2">
              <p>Business Name: [Your Business Name]</p>
              <p>Email: [Your Email Address]</p>
              <p>Phone: [Your Contact Number]</p>
              <p>Address: [Your Business Address]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
