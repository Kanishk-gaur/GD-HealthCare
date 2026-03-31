'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ArrowRight, TrendingDown } from 'lucide-react';
import Link from 'next/link';

const costData = [
  {
    procedure: 'Knee Replacement',
    india: 12000,
    usa: 35000,
    uk: 28000,
  },
  {
    procedure: 'Hip Replacement',
    india: 14000,
    usa: 40000,
    uk: 32000,
  },
  {
    procedure: 'Bypass Surgery',
    india: 10000,
    usa: 45000,
    uk: 35000,
  },
  {
    procedure: 'IVF Treatment',
    india: 4000,
    usa: 12000,
    uk: 10000,
  },
  {
    procedure: 'Dental Implant',
    india: 800,
    usa: 2500,
    uk: 2000,
  },
  {
    procedure: 'Cataract Surgery',
    india: 1500,
    usa: 5000,
    uk: 4000,
  },
  {
    procedure: 'Spine Surgery',
    india: 16000,
    usa: 50000,
    uk: 40000,
  },
  {
    procedure: 'Oncology Treatment',
    india: 8000,
    usa: 30000,
    uk: 25000,
  },
];

export default function CostPage() {
  const t = useTranslation();

  const calculateSavings = (india: number, usa: number) => {
    return Math.round(((usa - india) / usa) * 100);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('cost_page.title')}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            {t('cost_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Cost Comparison Table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-4 text-left font-semibold text-gray-900">
                    Procedure
                  </th>
                  <th className="px-4 py-4 text-right font-semibold text-gray-900">
                    In India ($)
                  </th>
                  <th className="px-4 py-4 text-right font-semibold text-gray-900">
                    In USA ($)
                  </th>
                  <th className="px-4 py-4 text-right font-semibold text-gray-900">
                    In UK ($)
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-teal-600">
                    Savings
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {costData.map((row, index) => {
                  const savings = calculateSavings(row.india, row.usa);
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {row.procedure}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700 font-semibold">
                        ${row.india.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        ${row.usa.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        ${row.uk.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          <TrendingDown size={16} />
                          {savings}%
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <WhatsAppButton
                          phoneNumber="+919876543210"
                          message={`I'm interested in ${row.procedure} treatment at GD Healthcare. Please provide a quote.`}
                          text="Quote"
                          size="sm"
                          color="green"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why Choose GD Healthcare?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <span>Transparent pricing with no hidden charges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <span>World-class doctors and accredited hospitals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <span>All-inclusive packages with accommodation and transport</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <span>Flexible payment plans available</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cost Estimate Form */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get Personalized Cost Estimate
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your details to receive an accurate cost breakdown for your treatment.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Procedure of Interest
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select a procedure...</option>
                  {costData.map((row) => (
                    <option key={row.procedure} value={row.procedure}>
                      {row.procedure}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Additional Information
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us about your medical condition..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-blue-700 font-semibold px-8 py-3 rounded-lg transition-colors flex-1"
                >
                  Get Estimate
                </button>
                <WhatsAppButton
                  phoneNumber="+919876543210"
                  message="I would like to get a cost estimate for my treatment. Please provide more details."
                  text="WhatsApp for Quote"
                  color="green"
                  className="flex-1 justify-center"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Treatment?
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Book a free consultation with our medical experts today.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Schedule Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
