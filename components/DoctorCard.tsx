'use client';

import React from 'react';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { ContactButton } from './ContactButton';

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  image?: string;
  experience: number;
  qualifications?: string[];
  phoneNumber?: string;
  email?: string;
}

export function DoctorCard({
  name,
  specialty,
  hospital,
  image,
  experience,
  qualifications = [],
  phoneNumber = '+919876543210',
  email = 'doctor@gdhealthcare.com',
}: DoctorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {image ? (
        <div className="relative h-56 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-56 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-6xl">
          👨‍⚕️
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-primary font-medium mt-1">{specialty}</p>
        <p className="text-xs text-gray-600 mt-1">{hospital}</p>

        <div className="flex items-center gap-1 mt-3 text-sm text-gray-700">
          <Award size={16} className="text-amber-500" />
          <span>{experience}+ years experience</span>
        </div>

        {qualifications.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-semibold mb-2">Qualifications:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {qualifications.map((qual) => (
                <li key={qual} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <WhatsAppButton
            phoneNumber={phoneNumber}
            message={`I'd like to consult with Dr. ${name} about my medical condition`}
            text="WhatsApp"
            size="sm"
            color="teal"
            className="flex-1 justify-center"
          />
          <ContactButton
            type="phone"
            value={phoneNumber}
            text="Call"
            size="sm"
            color="blue"
            className="flex-1 justify-center"
          />
        </div>
      </div>
    </div>
  );
}
