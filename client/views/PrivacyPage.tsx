'use client';

import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-gray-400 mt-6">Last updated: February 9, 2026</p>

        <div className="mt-8 text-gray-300 space-y-4">
          <p>
            Welcome to WebOrbitSolution. We value your trust and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            website or services.
          </p>
        </div>

        <div className="mt-10 space-y-10 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p className="mt-3">We may collect the following types of information:</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">a. Personal Information</h3>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Project or service-related details</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">b. Technical Information</h3>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and usage data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">c. Client Project Data</h3>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Business data shared for development, design, marketing, or IT services</li>
                  <li>Login credentials or access (only when explicitly provided for service purposes)</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Provide and manage IT services</li>
              <li>Communicate with clients and respond to inquiries</li>
              <li>Improve our website and service quality</li>
              <li>Process payments and invoices</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">3. Data Sharing & Disclosure</h2>
            <p className="mt-3">We do not sell, rent, or trade your personal information.</p>
            <p className="mt-3">We may share data only:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>With trusted service partners (hosting, payment gateways, tools)</li>
              <li>When required by law or government authorities</li>
              <li>To protect our legal rights and prevent misuse</li>
            </ul>
            <p className="mt-3">All third parties are required to maintain data confidentiality.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">4. Data Security</h2>
            <p className="mt-3">
              We implement appropriate technical and organizational measures to protect your data, including:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Secure servers and encrypted connections</li>
              <li>Restricted access to sensitive data</li>
              <li>Regular security reviews</li>
            </ul>
            <p className="mt-3">However, no digital transmission is 100% secure.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">5. Client Confidentiality</h2>
            <p className="mt-3">
              All client projects, documents, source code, and credentials are treated as strictly confidential. We
              never reuse, resell, or disclose client work without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">6. Cookies & Tracking</h2>
            <p className="mt-3">We may use cookies to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Improve website performance</li>
              <li>Analyze traffic and user behavior</li>
            </ul>
            <p className="mt-3">You can control cookie preferences through your browser settings.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">7. Data Retention</h2>
            <p className="mt-3">We retain personal information only as long as:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Required to deliver services</li>
              <li>Necessary for legal, accounting, or business purposes</li>
            </ul>
            <p className="mt-3">Data is securely deleted when no longer needed.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">8. Your Rights</h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us using the details below.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">9. Third-Party Links</h2>
            <p className="mt-3">
              Our website may contain links to third-party sites. We are not responsible for their privacy practices or
              content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">10. Policy Updates</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">11. Contact Us</h2>
            <p className="mt-3">If you have any questions or concerns about this Privacy Policy, contact us at:</p>
            <div className="mt-4 space-y-2">
              <p>WebOrbitSolution</p>
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

export default PrivacyPage;
