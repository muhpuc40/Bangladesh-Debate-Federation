import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCookie, FaChild, FaEnvelope, FaLock, FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated to match your site's color scheme */}
      <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Bangladesh Debate Federation ("BDF", "we", "our", or "us") respects your privacy and is committed to protecting your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden shadow-sm">
              
              {/* Last Updated */}
              <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-4">
                <p className="text-emerald-800">
                  <span className="font-semibold">Effective Date:</span> March 1, 2025
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-8 divide-y divide-gray-200">
                
                {/* Section 1 */}
                <div className="pb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaShieldAlt className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">1. Information We Collect</h2>
                      <p className="text-gray-700 mb-4">We may collect the following information:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Educational institution</li>
                        <li>Registration details for tournaments, events, or programs</li>
                        <li>Any information you voluntarily provide through forms or communication</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaLock className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">2. How We Use Your Information</h2>
                      <p className="text-gray-700 mb-4">We use your information to:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Register and manage participants</li>
                        <li>Communicate about events, tournaments, and programs</li>
                        <li>Improve our services and website</li>
                        <li>Send important updates and announcements</li>
                        <li>Maintain internal records</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaShieldAlt className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">3. Data Protection</h2>
                      <p className="text-gray-700">
                        We take reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaShareAlt className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">4. Sharing of Information</h2>
                      <p className="text-gray-700 mb-4">We do not sell or rent your personal information.</p>
                      <p className="text-gray-700 mb-4">We may share information only when:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Required by law</li>
                        <li>Necessary for event management (e.g., with tournament organizers)</li>
                        <li>You give us consent</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaCookie className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">5. Cookies</h2>
                      <p className="text-gray-700">
                        Our website may use cookies to improve user experience and analyze website traffic. You can choose to disable cookies through your browser settings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaExternalLinkAlt className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">6. Third-Party Links</h2>
                      <p className="text-gray-700">
                        Our website may contain links to third-party sites. We are not responsible for their privacy practices or content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaChild className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">7. Children's Privacy</h2>
                      <p className="text-gray-700">
                        We do not knowingly collect personal information from children under 13 without parental or institutional consent.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaShieldAlt className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">8. Changes to This Policy</h2>
                      <p className="text-gray-700">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 9 - Contact */}
                <div className="pt-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaEnvelope className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">9. Contact Us</h2>
                      <p className="text-gray-700 mb-2">For any questions regarding this Privacy Policy, please contact:</p>
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
                        <p className="font-semibold text-emerald-800">Bangladesh Debate Federation</p>
                        <p className="text-emerald-600">Email: connect.bdf@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Note */}
              <div className="bg-gray-50 px-8 py-4 border-t border-emerald-100">
                <p className="text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} Bangladesh Debate Federation. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;