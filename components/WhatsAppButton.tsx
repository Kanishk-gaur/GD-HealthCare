import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
  className?: string;
  color?: 'green' | 'teal' | 'blue' | 'orange' | 'purple' | 'cyan';
  rounded?: boolean;
}

const colorClasses = {
  green: 'bg-green-600 hover:bg-green-700 text-white',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  orange: 'bg-orange-600 hover:bg-orange-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  cyan: 'bg-cyan-600 hover:bg-cyan-700 text-white',
};

const variantClasses = {
  primary: '',
  secondary: 'opacity-90',
  outline: 'border-2 border-current bg-transparent text-current',
  ghost: 'bg-transparent hover:bg-opacity-10',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function WhatsAppButton({
  phoneNumber = '+919876543210',
  message = 'Hi, I would like to inquire about medical treatment',
  text = 'Chat on WhatsApp',
  variant = 'primary',
  size = 'md',
  withIcon = true,
  className = '',
  color = 'green',
  rounded = false,
}: WhatsAppButtonProps) {
  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    window.open(
      `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleWhatsApp}
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all
        ${colorClasses[color]}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${rounded ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
    >
      {withIcon && <MessageCircle size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
      {text}
    </button>
  );
}
