interface Props {
  className: string;
}

export const Login = ({ className }: Props) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="46"
      viewBox="0 0 46 46"
      width="46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.2042 25.8176L25.2042 20.911L20.2975 20.911"
        stroke="url(#paint0_radial_2192_622)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <path
        d="M15.3909 30.7242L25.1371 20.978"
        stroke="url(#paint1_radial_2192_622)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <path
        d="M15.3333 15.3333C19.5692 11.0975 25.875 10.5417 30.6666 15.3333C35.4583 20.125 34.9025 26.4308 30.6666 30.6666"
        stroke="url(#paint2_radial_2192_622)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />

      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(19.9509 20.898) rotate(18.2483) scale(9.52026 8.99636)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_2192_622"
          r="1"
        >
          <stop stopColor="#384143" />

          <stop offset="0.499187" stopColor="#161b1f" />

          <stop offset="1" stopColor="#384143" />
        </radialGradient>

        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(14.7019 31.3605) rotate(-40.8163) scale(17.0696 2.91988)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_2192_622"
          r="1"
        >
          <stop stopColor="#384143" />

          <stop offset="0.499187" stopColor="#161b1f" />

          <stop offset="1" stopColor="#384143" />
        </radialGradient>

        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(14.2501 15.2926) rotate(18.2482) scale(29.7508 28.1136)"
          gradientUnits="userSpaceOnUse"
          id="paint2_radial_2192_622"
          r="1"
        >
          <stop stopColor="#384143" />

          <stop offset="0.499187" stopColor="#161b1f" />

          <stop offset="1" stopColor="#384143" />
        </radialGradient>
      </defs>
    </svg>
  );
};
