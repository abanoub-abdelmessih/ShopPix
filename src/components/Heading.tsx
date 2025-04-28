interface headingProps {
  title: string;
  description: string;
  id?: string;
}
export const Heading = ({ title, description, id }: headingProps) => {
  return (
    <div id={id} className="text-center my-4">
      <h3 className="font-bold font-poppins text-4xl">{title}</h3>
      <p className="text-xl">{description}</p>
    </div>
  );
};
