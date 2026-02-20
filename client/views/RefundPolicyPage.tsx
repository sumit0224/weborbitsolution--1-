'use client';

import React from 'react';

const RefundPolicyPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">
          Refund & Cancellation Policy
        </h1>
        <p className="text-gray-400 mt-6">Last updated: February 10, 2026</p>

        <div className="mt-8 text-gray-300 space-y-4">
          <p>Thank you for choosing WebOrbitSolution.</p>
          <p>
            We value your trust and strive to deliver high-quality IT services. Please read our Refund & Cancellation
            Policy carefully before making a purchase.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. No Automatic Refunds</h2>
            <p className="mt-3">
              All payments made to WebOrbitSolution are non-refundable by default unless explicitly stated in writing or
              mentioned in the service agreement or quotation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">2. Cancellation by Client</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>The client may request cancellation by email or written communication.</li>
              <li>If cancellation is requested before work has started, a partial or full refund may be considered.</li>
              <li>
                If work has already begun, no refund will be issued, as resources and time have already been allocated.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">3. Cancellation by Company</h2>
            <p className="mt-3">We reserve the right to cancel a project or service if:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Required information or approvals are not provided by the client</li>
              <li>Payments are delayed or not received</li>
              <li>The project involves illegal, unethical, or policy-violating activities</li>
            </ul>
            <p className="mt-3">In such cases, no refund will be applicable for completed or ongoing work.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">4. Service-Based Nature of Work</h2>
            <p className="mt-3">Our services are customized and digital in nature, including:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Website & application development</li>
              <li>UI/UX design</li>
              <li>Digital marketing & SEO</li>
              <li>Software consulting & maintenance</li>
            </ul>
            <p className="mt-3">Due to the nature of these services, refunds are generally not possible once work has started.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">5. Refund Eligibility (If Approved)</h2>
            <p className="mt-3">Refunds may be issued only if:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>The service was not initiated at all</li>
              <li>There is a written agreement specifying a refund clause</li>
              <li>The issue is acknowledged and approved by our management</li>
            </ul>
            <p className="mt-3">Approved refunds will be processed within 7–10 business days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">6. Payment Gateway Charges</h2>
            <p className="mt-3">
              Any transaction or payment gateway charges deducted by banks or third-party providers will not be refunded.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">7. Chargebacks & Disputes</h2>
            <p className="mt-3">Initiating a chargeback without contacting us first may result in:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Immediate service suspension</li>
              <li>Permanent account termination</li>
              <li>Legal action, if applicable</li>
            </ul>
            <p className="mt-3">We encourage clients to contact us directly for resolution.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">8. Policy Updates</h2>
            <p className="mt-3">
              We reserve the right to update or modify this policy at any time without prior notice. Changes will be
              effective immediately upon posting on our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">9. Contact Us</h2>
            <p className="mt-3">For questions related to refunds or cancellations, please contact:</p>
            <div className="mt-4 space-y-2">
              <p>Business Name: WebOrbitSolution</p>
              <p>Email: hello@weborbitsolution.in</p>
              <p>Phone: +91 9310513770</p>
              <p>Address: Sector-128, Noida</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicyPage;
