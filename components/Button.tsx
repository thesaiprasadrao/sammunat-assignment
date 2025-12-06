import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-sm transition-all duration-300 ease-in-out font-sans text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-stone-200 text-stone-800 hover:bg-stone-300 hover:shadow-md",
    outline: "border border-stone-300 text-stone-600 hover:border-stone-800 hover:text-stone-800 bg-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};