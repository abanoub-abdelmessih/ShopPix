interface headingProps {
  title: string;
  description: string;
  id?: string;
}
export const Heading = ({ title, description, id }: headingProps) => {
  return (
    <div id={id} className="text-center mb-5 pt-10 space-y-2 font-poppins px-5">
      <h3 className="font-normal text-xl sm:text-2xl md:text-3xl text-zinc-600 dark:text-zinc-300">
        {title}
      </h3>
      <p className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-800 dark:text-zinc-200">
        {description}
      </p>
    </div>
  );
};
