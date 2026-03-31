'use client';

import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color?: 'teal' | 'blue' | 'green' | 'orange' | 'purple' | 'cyan';
}

const bgColorClasses = {
  teal: 'bg-teal-50',
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
  cyan: 'bg-cyan-50',
};

const textColorClasses = {
  teal: 'text-teal-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600',
  cyan: 'text-cyan-600',
};

export function ServiceCard({
  icon,
  title,
  description,
  color = 'teal',
}: ServiceCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${bgColorClasses[color]} mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
