interface Props {
  title: string;
}

export const Metadata = ({ title }: Props) => {
  return (
    <>
      <title className="capitalize">{title}</title>
    </>
  );
};
