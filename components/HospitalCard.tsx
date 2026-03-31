'use client';

import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Bed, Users } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { ContactButton } from './ContactButton';

interface HospitalCardProps {
  name: string;
  location: string;
  image?: string;
  beds: number;
  doctors: number;
  rating: number;
  description: string;
  phoneNumber?: string;
  email?: string;
  badges?: string[];
}

export function HospitalCard({
  name,
  location,
  image,
  beds,
  doctors,
  rating,
  description,
  phoneNumber = '+919876543210',
  email = 'info@gdhealthcare.com',
  badges = [],
}: HospitalCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {image ? (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-5xl">
          🏥
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <MapPin size={16} />
              {location}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {badges.map((badge) => (
              <span
                key={badge}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <Bed size={16} className="text-primary" />
            <div>
              <div className="text-gray-600">Beds</div>
              <div className="font-semibold">{beds}+</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-secondary" />
            <div>
              <div className="text-gray-600">Doctors</div>
              <div className="font-semibold">{doctors}+</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <WhatsAppButton
            phoneNumber={phoneNumber}
            message={`I'd like to know more about treatment options at ${name}`}
            text="WhatsApp"
            size="sm"
            color="green"
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
