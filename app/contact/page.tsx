'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
    alert('Thank you for contacting us. We will get back to you soon!')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="w-full">
      {/* Header - Updated Gradient */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with our medical experts for personalized consultation
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info - Updated */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} className="text-[#ffa649] group-hover:text-[#ff4c88] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <a href="tel:+919711614738" className="text-[#ff4c88] hover:underline">
                      +91 9711 614 738
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} className="text-[#ffa649] group-hover:text-[#ff4c88] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <a href="mailto:info@gdhealthcare.com" className="text-[#ff4c88] hover:underline">
                      info@gdhealthcare.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} className="text-[#ffa649] group-hover:text-[#ff4c88] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Location</h3>
                    <p className="text-muted-foreground">New Delhi, India</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock size={24} className="text-[#ffa649] group-hover:text-[#ff4c88] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Hours</h3>
                    <p className="text-muted-foreground">24/7 Available</p>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-bold mb-4">Connect With Us</h3>
                  <a
                    href="https://wa.me/919711614738"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Updated */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-8 border border-[#ffa649]/10 hover:border-[#ffa649]/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#ff4c88]/5">
                <h2 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                    Send us a Message
                  </span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#ffa649]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#ffa649]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[#ffa649]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#ffa649]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="treatment">Treatment Inquiry</option>
                      <option value="cost">Cost Estimation</option>
                      <option value="visa">Visa Assistance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-[#ffa649]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300 resize-none"
                      placeholder="Tell us about your medical needs..."
                    ></textarea>
                  </div>

                  {/* Submit - Updated */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA - Updated */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              Have Questions?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Check our FAQ section or call us for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919711614738"
              className="px-8 py-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-105"
            >
              Call Now
            </a>
            <a
              href="/"
              className="px-8 py-3 border-2 border-[#ff4c88] text-[#ff4c88] rounded-lg font-semibold hover:bg-gradient-to-r hover:from-[#ffa649] hover:to-[#ff4c88] hover:text-white hover:border-transparent transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}