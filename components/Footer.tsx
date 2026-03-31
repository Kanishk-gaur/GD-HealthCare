'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useTranslation } from '@/lib/i18n/useTranslation';

export function Footer() {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GD</span>
              </div>
              <span className="font-bold text-white">GD Healthcare</span>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Providing world-class medical treatment at affordable prices for patients worldwide.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} />
                <span>info@gdhealthcare.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-teal-400">{t('nav.home')}</Link></li>
              <li><Link href="/hospitals" className="hover:text-teal-400">{t('nav.hospitals')}</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-400">{t('nav.doctors')}</Link></li>
              <li><Link href="/cost" className="hover:text-teal-400">{t('nav.cost')}</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-400">{t('footer.privacy')}</Link></li>
              <li><Link href="#" className="hover:text-teal-400">{t('footer.terms')}</Link></li>
              <li><Link href="#" className="hover:text-teal-400">{t('footer.about')}</Link></li>
              <li><Link href="#" className="hover:text-teal-400">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-teal-400"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-teal-400"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-teal-400"><FaLinkedin size={20} /></a>
              <a href="#" className="hover:text-teal-400"><FaInstagram size={20} /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © {currentYear} GD Healthcare. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}