'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CheckCircle, Upload } from 'lucide-react';

export default function ConsultationPage() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    medicalCondition: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      medicalCondition: '',
      message: '',
    });
  };

  const treatments = [
    'Joint Replacement',
    'Heart Surgery',
    'Brain Surgery',
    'Cancer Treatment',
    'Fertility Treatment',
    'Dental Surgery',
    'Obesity Surgery',
    'Liver Transplant',
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('form.title')}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            {t('form.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {t('form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {t('form.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {t('form.phone')} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {t('form.country')} *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Medical Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.medical_condition')} *
                    </label>
                    <select
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your condition...</option>
                      {treatments.map((treatment) => (
                        <option key={treatment} value={treatment}>
                          {treatment}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.message')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us more about your condition and what you're looking for..."
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.upload')}
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
                        <Upload className="text-gray-400 mb-2" size={24} />
                        <span className="text-sm font-medium text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG up to 10MB
                        </span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900">How would you like to proceed?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="submit"
                        className="bg-primary text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        {t('form.submit')}
                      </button>
                      <WhatsAppButton
                        phoneNumber="+919876543210"
                        message={`Hi, I would like to request a consultation. My name is ${formData.name || '[Your Name]'} and I'm interested in ${formData.medicalCondition || 'medical treatment'}.`}
                        text={t('form.whatsapp_submit')}
                        color="green"
                        className="w-full justify-center"
                      />
                      <button
                        type="button"
                        className="bg-purple-600 text-white hover:bg-purple-700 font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        {t('form.video_submit')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg p-8 sticky top-20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Consult with Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Expert Doctors</p>
                      <p className="text-sm text-gray-600">15+ years of experience</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Save Up to 70%</p>
                      <p className="text-sm text-gray-600">Compared to Western prices</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Complete Support</p>
                      <p className="text-sm text-gray-600">Visa, accommodation, transport</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">World-Class Hospitals</p>
                      <p className="text-sm text-gray-600">JCI accredited facilities</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">24/7 Assistance</p>
                      <p className="text-sm text-gray-600">Multilingual support team</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Post-Treatment Care</p>
                      <p className="text-sm text-gray-600">Telemedicine follow-ups</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-blue-200">
                  <p className="text-sm text-gray-600 mb-4">
                    💬 <strong>Need immediate help?</strong>
                  </p>
                  <WhatsAppButton
                    phoneNumber="+919876543210"
                    message="Hi, I would like to schedule a consultation right away. Please help me."
                    text="Chat with us on WhatsApp"
                    color="green"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Patients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Rodriguez',
                country: 'Spain',
                quote: '"GD Healthcare made my treatment journey seamless and affordable. Highly recommended!"',
              },
              {
                name: 'Ahmed Al-Rashid',
                country: 'UAE',
                quote: '"The doctors were exceptional and the facilities were world-class. Best decision ever!"',
              },
              {
                name: 'Elena Popov',
                country: 'Russia',
                quote: '"Compassionate care, expert doctors, and transparent pricing. Simply outstanding!"',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How long does the consultation process take?',
                a: 'Our initial consultation is usually completed within 24-48 hours. You will receive a detailed assessment and treatment plan.',
              },
              {
                q: 'What happens after I submit the form?',
                a: 'Our medical team will review your information and contact you within 24 hours to discuss your options and next steps.',
              },
              {
                q: 'Is the consultation really free?',
                a: 'Yes! Our initial consultation is completely free with no obligation. You only pay for the actual treatment.',
              },
              {
                q: 'Do you help with visa and travel arrangements?',
                a: 'Absolutely! We provide complete visa assistance, airport pickup, accommodation, and transport as part of our service.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
