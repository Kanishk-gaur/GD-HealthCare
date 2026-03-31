'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  country: string;
  condition: string;
  testimonial: string;
  image?: string;
  rating?: number;
}

export function TestimonialCard({
  name,
  country,
  condition,
  testimonial,
  image,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <Quote className="text-teal-600 opacity-20" size={32} />
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 mb-6 italic line-clamp-4">"{testimonial}"</p>

      <div className="flex items-center gap-4">
        {image ? (
          <div className="relative w-12 h-12">
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center text-lg">
            👤
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{country}</p>
          <p className="text-xs text-teal-600 font-medium">Treated for {condition}</p>
        </div>
      </div>
    </div>
  );
}
