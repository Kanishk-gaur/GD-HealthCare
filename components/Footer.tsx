'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">GD</span>
              </div>
              <span className="font-bold text-lg">GD Healthcare</span>
            </div>
            <p className="text-sm text-white/80">
              Your trusted partner for world-class medical tourism with personalized care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hospitals" className="hover:text-accent transition-colors">
                  Hospitals
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-accent transition-colors">
                  Doctors
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-accent transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+919999999999" className="hover:text-accent transition-colors">
                  +91 9999 999 999
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={18} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:info@gdhealthcare.com" className="hover:text-accent transition-colors">
                  info@gdhealthcare.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <p>New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/80">
            © 2024 GD Healthcare. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}