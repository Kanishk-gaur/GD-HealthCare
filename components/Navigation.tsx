'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/hospitals', label: 'Hospitals' },
    { href: '/doctors', label: 'Doctors' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/countries', label: 'Countries' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GD</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-primary">
              GD Healthcare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="tel:+919999999999"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">Free Consultation</span>
            </a>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919999999999"
              className="block m-4 px-4 py-2 bg-accent text-white rounded-lg text-center font-medium hover:bg-accent/90 transition-colors"
            >
              Free Consultation
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
