import { ChangeEvent } from 'react';

interface Props {
  name?: string;
  className?: string;
  divClassName?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeHolder: string;
}

export const TextArea = ({
  name = '',
  className = '',
  divClassName = '',
  required = false,
  value,
  onChange,
  placeHolder,
}: Props) => {
  return (
    <textarea
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all duration-200 resize-none ${className} ${divClassName}`}
      placeholder={placeHolder}
    />
  );
};
