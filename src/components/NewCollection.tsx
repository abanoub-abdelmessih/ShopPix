import Image from "next/image";
import { Heading } from "./Heading";

const NewCollection = () => {
  const images = [
    {
      path: "/images/newCollection/NewCollection1.jpg",
      title: "Summer Collection",
      description: "Explore our latest seasonal designs",
    },
    {
      path: "/images/newCollection/NewCollection2.jpg",
      title: "Featured Item",
      description: "The centerpiece of our new line",
    },
    {
      path: "/images/newCollection/NewCollection3.jpg",
      title: "Limited Edition",
      description: "Exclusive styles for a limited time",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col container mx-auto p-3">
      <Heading
        title="New Collection"
        description="Explore the latest arrivals handpicked just for you."
      />

      <div className="flex-1 flex flex-col md:flex-row gap-3 bg-white p-2 md:p-4 rounded-lg">
        {/* Main image */}
        <div className="relative w-full flex-1 group overflow-hidden">
          <Image
            src={images[1].path}
            alt={images[1].title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-zinc-800/50 opacity-0 group-hover:opacity-100 duration-300 rounded-lg flex flex-col justify-end p-3 items-start">
            <h3 className="text-xl font-semibold">{images[1].title}</h3>
            <p className="mt-1 text-sm text-gray-200">
              {images[1].description}
            </p>
          </div>
        </div>

        {/* Side images */}
        <div className="flex flex-col w-full md:w-1/2 gap-4 flex-1">
          {[images[0], images[2]].map((img, index) => (
            <div
              key={index}
              className="relative flex-1 group overflow-hidden rounded-lg"
            >
              <Image
                src={img.path}
                alt={img.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-zinc-800/50 opacity-0 group-hover:opacity-100 duration-300 rounded-lg flex flex-col justify-end p-3 items-start">
                <h3 className="text-xl font-semibold">{img.title}</h3>
                <p className="mt-1 text-sm text-gray-200">{img.description}</p>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
