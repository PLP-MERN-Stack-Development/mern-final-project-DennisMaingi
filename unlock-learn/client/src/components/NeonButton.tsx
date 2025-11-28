import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow' | 'ghost';
  children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  variant = 'cyan', 
  children, 
  className = '',
  ...props 
}) => {
  const variants = {
    cyan: 'bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]',
    magenta: 'bg-fuchsia-600 text-white border-fuchsia-500 hover:bg-fuchsia-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.8)]',
    yellow: 'bg-yellow-500 text-black border-yellow-400 hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(250,204,21,0.8)]',
    ghost: 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]'
  };

  return (
    <button
      className={`
        relative px-6 py-3 rounded-xl font-semibold
        border-2 
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-1
        active:scale-95 active:translate-y-0
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};
