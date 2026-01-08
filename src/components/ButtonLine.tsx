import { ReactNode } from 'react';

interface Props {
  className: string;
  text: string | ReactNode;
  type: 'button' | 'submit';
  onClick: Function;
  disabled?: boolean;
}

export const ButtonLine = ({
  className,
  text,
  type,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      onClick={() => onClick()}
      disabled={disabled}
      className={`cursor-pointer all-[unset] box-border inline-flex items-start gap-2.5 px-[35px] py-[15px] relative rounded-[10px] border border-[#888] border-solid border-divider ${className}`}
    >
      <div
        className={`relative w-fit mt-[-1.00px] font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] whitespace-nowrap [font-style:var(--button-font-style)]`}
      >
        {text}
      </div>
    </button>
  );
};
