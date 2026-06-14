import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-compass-heading-secondary/60">
          {label}
        </label>
      )}
      <input
        className={`w-full px-5 py-4 bg-white border border-compass-text-muted/30 text-compass-button-text focus:outline-none focus:border-compass-bg-primary/50 placeholder:text-compass-text-muted/50 transition-colors ${
          error ? 'border-red-500' : ''
        } ${className}`}
        style={{ borderRadius: 0 }}
        {...props}
      />
      {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{error}</span>}
    </div>
  );
};

export default Input;
