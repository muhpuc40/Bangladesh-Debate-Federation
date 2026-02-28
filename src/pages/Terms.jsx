import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaUserCheck, FaCalendarCheck, FaCopyright, FaExclamationTriangle, FaBan, FaScroll, FaEnvelope } from 'react-icons/fa';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated to match your site's color scheme */}
      <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Bangladesh Debate Federation (BDF)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden shadow-sm">
              
              {/* Effective Date */}
              <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-4">
                <p className="text-emerald-800">
                  <span className="font-semibold">Effective Date:</span> March 1, 2025
                </p>
              </div>

              {/* Introduction */}
              <div className="px-8 py-6 bg-emerald-50 border-b border-emerald-100">
                <p className="text-gray-700">
                  By accessing or using the website and services of Bangladesh Debate Federation ("BDF"), you agree to the following Terms of Service.
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-8 divide-y divide-gray-200">
                
                {/* Section 1 */}
                <div className="pb-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaGavel className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">1. Use of Services</h2>
                      <p className="text-gray-700">
                        You agree to use BDF services only for lawful purposes and in a way that does not violate any applicable laws of Bangladesh.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaUserCheck className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">2. User Responsibilities</h2>
                      <p className="text-gray-700 mb-4">You agree:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>To provide accurate and truthful information</li>
                        <li>Not to misuse the website or services</li>
                        <li>Not to attempt unauthorized access to any part of the system</li>
                        <li>Not to upload harmful or illegal content</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaCalendarCheck className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">3. Event Participation</h2>
                      <p className="text-gray-700 mb-4">Participation in BDF events and tournaments is subject to:</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Registration requirements</li>
                        <li>Competition rules</li>
                        <li>Code of conduct</li>
                      </ul>
                      <p className="text-gray-700 mt-4">
                        Failure to comply may result in disqualification or suspension.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaCopyright className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">4. Intellectual Property</h2>
                      <p className="text-gray-700 mb-4">
                        All content on the BDF website (logos, text, images, documents) is the property of Bangladesh Debate Federation unless otherwise stated.
                      </p>
                      <p className="text-gray-700">
                        You may not copy, reproduce, or distribute without written permission.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaExclamationTriangle className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">5. Limitation of Liability</h2>
                      <p className="text-gray-700 mb-4">
                        BDF shall not be held responsible for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Technical issues</li>
                        <li>Data loss</li>
                        <li>Event cancellation or rescheduling</li>
                        <li>Any indirect or incidental damages</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaBan className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">6. Termination</h2>
                      <p className="text-gray-700">
                        We reserve the right to suspend or terminate access if users violate these terms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaScroll className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">7. Changes to Terms</h2>
                      <p className="text-gray-700">
                        BDF may update these Terms of Service at any time. Continued use of the website means acceptance of updated terms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="py-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <FaGavel className="text-emerald-700 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">8. Governing Law</h2>
                      <p className="text-gray-700">
                        These terms are governed by the laws of the People's Republic of Bangladesh.
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
                      <h2 className="text-2xl font-bold text-emerald-900 mb-4">9. Contact Information</h2>
                      <p className="text-gray-700 mb-2">For any concerns about these Terms of Service, contact:</p>
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

export default Terms;