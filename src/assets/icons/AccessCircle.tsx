interface Props {
  color: string;
}

export const AccessCircle = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
    >
      <circle cx="16.9229" cy="16" r="16" fill={color} fillOpacity="0.2" />
      <circle cx="16.9229" cy="16" r="11" fill={color} fillOpacity="0.4" />
      <circle cx="16.9229" cy="16" r="6" fill={color} />
      <circle cx="16.9229" cy="16" r="3" fill="url(#paint0_radial_2193_984)" />
      <defs>
        <radialGradient
          id="paint0_radial_2193_984"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13.5149 12.7801) rotate(44.7672) scale(10.4381 12.2695)"
        >
          <stop stopColor="#384143" />
          <stop offset="0.499187" stopColor="#161b1f" />
          <stop offset="1" stopColor="#384143" />
        </radialGradient>
      </defs>
    </svg>
  );
};
