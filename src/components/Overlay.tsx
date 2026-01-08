interface Props {
  setIsOpen: Function;
}

export const Overlay = ({ setIsOpen }: Props) => {
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-[#141414cc] z-50"
      onClick={() => setIsOpen()}
    />
  );
};
