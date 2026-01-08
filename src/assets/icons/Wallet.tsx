interface Props {
  className: string;
  color: string;
}

export const Wallet = ({ className, color }: Props) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.333 14.8667H9.33301"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        d="M2.66699 14.8666V8.70662C2.66699 5.98662 4.867 3.78662 7.587 3.78662H15.0803C17.8003 3.78662 20.0003 5.47995 20.0003 8.19995"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        d="M23.307 16.2668C22.6403 16.9068 22.3203 17.8935 22.587 18.9068C22.9203 20.1468 24.147 20.9335 25.427 20.9335H26.667V22.8669C26.667 25.8135 24.2803 28.2002 21.3337 28.2002H8.00033C5.05366 28.2002 2.66699 25.8135 2.66699 22.8669V13.5335C2.66699 10.5869 5.05366 8.2002 8.00033 8.2002H21.3337C24.267 8.2002 26.667 10.6002 26.667 13.5335V15.4668H25.227C24.4803 15.4668 23.8003 15.7602 23.307 16.2668Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        d="M29.333 16.8268V19.5735C29.333 20.3202 28.7196 20.9335 27.9596 20.9335H25.3863C23.9463 20.9335 22.6263 19.8802 22.5063 18.4402C22.4263 17.6002 22.7463 16.8135 23.3063 16.2668C23.7996 15.7602 24.4796 15.4668 25.2263 15.4668H27.9596C28.7196 15.4668 29.333 16.0802 29.333 16.8268Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
