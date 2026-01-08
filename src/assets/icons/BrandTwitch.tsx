interface Props {
  className: string;
}

export const BrandTwitch = ({ className }: Props) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 23 24"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9079 3.05566V14.0909L15.5442 18.5041H11.9081L9.64354 20.7111H6.81774V18.5041H3.18164V5.99777L4.32181 3.05566H19.9079ZM18.4536 4.52672H6.09015V15.562H8.99865V17.7681L11.1814 15.561H15.5442L18.4527 12.6189V4.52672H18.4536ZM15.5451 7.46883V11.8829H14.0899V7.46977H15.5442L15.5451 7.46883ZM11.9081 7.46883V11.8829H10.4538V7.46977H11.9081V7.46883Z"
        fill="white"
      />
    </svg>
  );
};
