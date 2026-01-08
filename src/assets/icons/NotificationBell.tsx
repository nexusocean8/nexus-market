interface Props {
  className: string;
  color: string;
}

export const NotificationBell = ({ className, color }: Props) => {
  return (
    <div className={className}>
      <svg
        className="absolute w-8 h-8 top-2.5 left-"
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
      >
        <path
          d="M16.9496 3.87988C12.5363 3.87988 8.94964 7.46655 8.94964 11.8799V15.7332C8.94964 16.5466 8.60297 17.7865 8.18964 18.4799L6.6563 21.0266C5.70964 22.5999 6.36297 24.3466 8.0963 24.9332C13.843 26.8532 20.043 26.8532 25.7896 24.9332C27.403 24.3999 28.1096 22.4932 27.2296 21.0266L25.6963 18.4799C25.2963 17.7865 24.9496 16.5466 24.9496 15.7332V11.8799C24.9496 7.47988 21.3496 3.87988 16.9496 3.87988Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M19.4158 4.26643C19.0024 4.14643 18.5758 4.05309 18.1358 3.99976C16.8558 3.83976 15.6291 3.93309 14.4824 4.26643C14.8691 3.27976 15.8291 2.58643 16.9491 2.58643C18.0691 2.58643 19.0291 3.27976 19.4158 4.26643Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9492 25.4136C20.9492 27.6136 19.1492 29.4136 16.9492 29.4136C15.8559 29.4136 14.8426 28.9602 14.1226 28.2402C13.4026 27.5202 12.9492 26.5069 12.9492 25.4136"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>

      <div className="relative w-3.5 h-3.5 top-1 left-[17px] bg-red-500 rounded-md border-[2.5px]" />
    </div>
  );
};
