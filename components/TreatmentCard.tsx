'use client';

import React from 'react';
import Image from 'next/image';
import { WhatsAppButton } from './WhatsAppButton';

interface TreatmentCardProps {
  icon?: string;
  title: string;
  description: string;
  image?: string;
  phoneNumber?: string;
  buttonColor?: 'green' | 'teal' | 'blue' | 'orange' | 'purple' | 'cyan';
}

export function TreatmentCard({
  icon = '🏥',
  title,
  description,
  image,
  phoneNumber = '+919876543210',
  buttonColor = 'green',
}: TreatmentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {image ? (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center text-5xl">
          {icon}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <WhatsAppButton
          phoneNumber={phoneNumber}
          message={`I'm interested in ${title} treatment at GD Healthcare. Please provide more information.`}
          text="Get More Info"
          size="sm"
          color={buttonColor}
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}
