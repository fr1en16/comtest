import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  ...props
}) => {
  const base =
    'px-8 py-4 font-bold uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary:
      'bg-compass-button-bg text-compass-button-text hover:opacity-90',
    secondary:
      'bg-compass-bg-primary text-white hover:opacity-90',
    outline:
      'bg-transparent text-compass-heading-secondary border border-compass-heading-secondary/30 hover:bg-compass-heading-secondary/5',
    danger: 'bg-red-500 text-white hover:opacity-90',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
