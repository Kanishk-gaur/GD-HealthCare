'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { translate } = useTranslation()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/hospitals', label: 'Hospitals' },
    { href: '/doctors', label: 'Doctors' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/patient-testimonials', label: 'Patient Testimonials' },
    { href: '/countries', label: 'Countries' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ffa649]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#ffa649] to-[#ff4c88] group-hover:shadow-lg group-hover:shadow-[#ff4c88]/30 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">GD</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              GD Healthcare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-[#ff4c88] transition-all duration-300 relative group"
              >
                {translate(link.label)}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] hover:shadow-lg hover:shadow-[#ff4c88]/30 hover:scale-105"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">{translate('Free Consultation')}</span>
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#ffa649]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-[#ff4c88]" />
              ) : (
                <Menu size={24} className="text-[#ff4c88]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-[#ffa649]/10 animate-in slide-in-from-top-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-[#ff4c88] transition-colors duration-200 border-l-2 border-transparent hover:border-[#ffa649] pl-4"
                onClick={() => setIsOpen(false)}
              >
                {translate(link.label)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block m-4 px-4 py-3 rounded-lg text-white text-center font-medium transition-all duration-300 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] hover:shadow-lg hover:shadow-[#ff4c88]/30"
              onClick={() => setIsOpen(false)}
            >
              {translate('Free Consultation')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}