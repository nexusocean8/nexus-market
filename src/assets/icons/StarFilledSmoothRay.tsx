interface Props {
  className: string;
}

export const StarFilledSmoothRay = ({ className }: Props) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="60"
      viewBox="0 0 60 60"
      width="60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.3094 16.3372C27.811 13.2919 32.1898 13.2919 32.6914 16.3372L34.2431 25.7573L43.6631 27.3089C46.7085 27.8105 46.7085 32.1893 43.6631 32.6909L34.2431 34.2426L32.6914 43.6626C32.1898 46.708 27.811 46.708 27.3094 43.6626L25.7578 34.2426L16.3377 32.6909C13.2924 32.1893 13.2924 27.8105 16.3377 27.3089L25.7578 25.7573L27.3094 16.3372Z"
        fill="#684C5C"
      />
    </svg>
  );
};
