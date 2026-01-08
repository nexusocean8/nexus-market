import { ChangeEvent } from 'react';

interface Props {
  name?: string;
  className?: string;
  divClassName?: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

export const Input = ({
  name = '',
  className = '',
  divClassName = '',
  type,
  required = false,
  value,
  onChange,
  placeHolder,
}: Props) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      required={required}
      onChange={onChange}
      className={`w-full h-12 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all duration-200 ${className} ${divClassName}`}
      placeholder={placeHolder}
    />
  );
};
