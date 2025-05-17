interface HeadingProps {
  title: string;
  description: string;
  id?: string;
}

export const Heading = ({ title, description, id }: HeadingProps) => {
  return (
    <div id={id} className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3">
          <h3 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl md:text-2xl font-bold">
            {title}
          </h3>

          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight md:flex-1">
            {description}
          </p>
        </div>

        <div className="mt-6 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 w-16 rounded-full"></div>
      </div>
    </div>
  );
};
