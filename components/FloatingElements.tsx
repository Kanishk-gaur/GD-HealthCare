'use client';

import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { ContactButton } from './ContactButton';
import Link from 'next/link';
import { MessageCircle, Phone, HelpCircle } from 'lucide-react';

export function FloatingElements() {
  return (
    <>
      {/* WhatsApp Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <WhatsAppButton
          phoneNumber="+919876543210"
          message="Hi, I would like to inquire about medical treatment at GD Healthcare"
          text=""
          withIcon={true}
          color="green"
          rounded={true}
          className="h-14 w-14 p-0 flex items-center justify-center shadow-lg"
        />
      </div>

      {/* Phone Button - Bottom Center-Right */}
      <div className="fixed bottom-6 right-28 z-40">
        <ContactButton
          type="phone"
          value="+919876543210"
          text=""
          color="blue"
          className="h-14 w-14 p-0 flex items-center justify-center shadow-lg rounded-full"
        />
      </div>

      {/* Consultation Button - Bottom Center-Right (further) */}
      <div className="fixed bottom-6 right-50 z-40 hidden md:block">
        <Link
          href="/consultation"
          className="fixed bottom-6 right-24 flex items-center justify-center h-14 w-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all"
        >
          <HelpCircle size={24} />
        </Link>
      </div>
    </>
  );
}
