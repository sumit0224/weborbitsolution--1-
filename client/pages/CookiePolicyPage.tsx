import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl">
        <h1 className="font-body font-black text-4xl md:text-6xl uppercase tracking-tighter">Cookie Policy</h1>
        <p className="text-gray-400 mt-6">Last updated: February 10, 2026</p>

        <div className="mt-8 text-gray-300 space-y-4">
          <p>
            This Cookie Policy explains how WebOrbitSolution (“we”, “us”, “our”) uses cookies and similar technologies
            when you visit our website.
          </p>
          <p>By continuing to browse or use our website, you agree to our use of cookies as described in this policy.</p>
        </div>

        <div className="mt-10 space-y-10 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">1. What Are Cookies?</h2>
            <p className="mt-3">
              Cookies are small text files that are stored on your device (computer, mobile, or tablet) when you visit a
              website. Cookies help improve website functionality, user experience, and performance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">2. How We Use Cookies</h2>
            <p className="mt-3">We use cookies to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Ensure proper website functionality</li>
              <li>Improve website performance and speed</li>
              <li>Understand user behavior and preferences</li>
              <li>Analyze traffic and usage patterns</li>
              <li>Enhance security and prevent fraud</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">3. Types of Cookies We Use</h2>
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">a) Essential Cookies</h3>
                <p className="mt-2">These cookies are required for basic website functionality and cannot be disabled.</p>
                <p className="mt-2">Examples include:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Page navigation</li>
                  <li>Form submission</li>
                  <li>Security features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">b) Performance & Analytics Cookies</h3>
                <p className="mt-2">These cookies help us understand how visitors interact with our website, such as:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                  <li>Traffic sources</li>
                </ul>
                <p className="mt-2">We may use tools like Google Analytics to collect this data.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">c) Functional Cookies</h3>
                <p className="mt-2">These cookies remember your preferences such as:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Language selection</li>
                  <li>Form auto-fill information</li>
                  <li>User settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">d) Third-Party Cookies</h3>
                <p className="mt-2">Some cookies may be placed by third-party services we use for:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li>Analytics</li>
                  <li>Marketing</li>
                  <li>Performance tracking</li>
                </ul>
                <p className="mt-2">
                  We do not control third-party cookies and recommend reviewing their respective policies.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">4. Managing Cookies</h2>
            <p className="mt-3">You can control or delete cookies through your browser settings.</p>
            <p className="mt-3">Please note that disabling cookies may affect certain features of the website.</p>
            <p className="mt-3">Common browsers that allow cookie control:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">5. Consent</h2>
            <p className="mt-3">
              By using our website, you consent to the use of cookies in accordance with this Cookie Policy. Where
              required, we may display a cookie consent banner for explicit approval.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">6. Changes to This Cookie Policy</h2>
            <p className="mt-3">
              We may update this policy from time to time to reflect changes in technology or legal requirements. Any
              updates will be posted on this page with a revised date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">7. Contact Us</h2>
            <p className="mt-3">If you have any questions about our Cookie Policy, please contact us:</p>
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

export default CookiePolicyPage;
