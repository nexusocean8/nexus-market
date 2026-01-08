interface Props {
  className: string;
}

export const Notification = ({ className }: Props) => {
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
        d="M16.0268 3.87988C11.6135 3.87988 8.02678 7.46655 8.02678 11.8799V15.7332C8.02678 16.5466 7.68012 17.7865 7.26678 18.4799L5.73345 21.0266C4.78678 22.5999 5.44012 24.3466 7.17345 24.9332C12.9201 26.8532 19.1201 26.8532 24.8668 24.9332C26.4801 24.3999 27.1868 22.4932 26.3068 21.0266L24.7734 18.4799C24.3734 17.7865 24.0268 16.5466 24.0268 15.7332V11.8799C24.0268 7.47988 20.4268 3.87988 16.0268 3.87988Z"
        stroke="white"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <path
        d="M18.4929 4.26643C18.0796 4.14643 17.6529 4.05309 17.2129 3.99976C15.9329 3.83976 14.7062 3.93309 13.5596 4.26643C13.9462 3.27976 14.9062 2.58643 16.0262 2.58643C17.1462 2.58643 18.1062 3.27976 18.4929 4.26643Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <path
        d="M20.0264 25.4136C20.0264 27.6136 18.2264 29.4136 16.0264 29.4136C14.933 29.4136 13.9197 28.9602 13.1997 28.2402C12.4797 27.5202 12.0264 26.5069 12.0264 25.4136"
        stroke="white"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
};
