'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { translate } = useTranslation()
  return (
    <footer className="bg-gradient-to-br from-[#ffa649] via-[#ffa649]/95 to-[#ff4c88] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image src="/1.png" alt="GD Healthcare" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg text-white">GD Healthcare</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              {translate('Trusted Medical Healthcare Worldwide | Leading medical tourism company in India, committed to providing high-quality healthcare services.')}
            </p>
            {/* Trust Badge */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/80">{translate('Trusted by 50K+ patients')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white relative inline-block">
              {translate('Quick Links')}
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hospitals" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Hospitals')}
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Doctors')}
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Treatments')}
                </Link>
              </li>
              <li>
                <Link href="/patient-testimonials" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Patient Testimonials')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white relative inline-block">
              {translate('Company')}
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('About Us')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  {translate('Terms & Conditions')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white relative inline-block">
              {translate('Get In Touch')}
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white/50 rounded-full"></span>
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+919711614738" className="text-white/80 hover:text-white transition-colors">
                    +91 9711 614 738
                  </a>
                  <a href="tel:+9184468817445" className="text-white/80 hover:text-white transition-colors">
                    +91 8446 881 7445
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail size={16} className="text-white" />
                </div>
                <a href="mailto:info@gdhealthcare.in" className="text-white/80 hover:text-white transition-colors">
                  info@gdhealthcare.in
                </a>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <MapPin size={16} className="text-white" />
                </div>
                <p className="text-white/80">{translate('New Delhi, India')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} {translate('GD Healthcare Private Limited. All rights reserved.')}
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/share/19Siav2yNP/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Facebook"
            >
              <FaFacebook size={18} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Twitter"
            >
              <FaTwitter size={18} className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/gd-healthcare-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} className="text-white" />
            </a>
            <a
              href="https://www.instagram.com/gd_healthcare_pvt_ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Instagram"
            >
              <FaInstagram size={18} className="text-white" />
            </a>
            <a
              href="https://youtube.com/@gdhealthcare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="YouTube"
            >
              <FaYoutube size={18} className="text-white" />
            </a>
          </div>
        </div>

        {/* Back to Top Button - Floating */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-white text-[#ff4c88] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
          aria-label={translate('Back to top')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  )
}