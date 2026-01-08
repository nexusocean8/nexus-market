interface Props {
  selected: number;
  setSelected: Function;
}

export const Menu = ({ selected, setSelected }: Props) => {
  const buttons = [
    { id: 1, label: 'Assets' },
    { id: 2, label: 'Creations' },
    { id: 3, label: 'Collections' },
    { id: 4, label: 'Likes' },
  ];

  return (
    <div className="relative w-full mx-auto h-px bg-gray-600 my-12 md:mt-8">
      <div className="absolute w-full flex justify-center">
        <div className="flex justify-center w-full px-2 md:px-0 -top-9 md:-top-14 absolute">
          {buttons.map((button) => (
            <button
              key={`menu-${button.id}`}
              onClick={() => setSelected(button.id)}
              className={`hover-opacity w-1/4 md:w-1/5 xl:w-1/6 md:mx-3 lg:mx-6 flex flex-col items-center gap-2`}
            >
              <div className="mb-2 md:mb-5 font-medium text-center leading-tight md:leading-normal">
                {button.label}
              </div>

              {selected === button.id && (
                <div className="h-1 w-full bg-lavender-500 rounded-t-lg" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
