import { Heading } from "./Heading";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Truck size={24} />,
      title: "Free Shipping",
      description: "On all orders over $50",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: <RefreshCcw size={24} />,
      title: "Easy Returns",
      description: "Within 30 days",
    },
    {
      icon: <Headset size={24} />,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-3">
      <Heading
        title="Our Services"
        description="What we offer to our valued customers"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-center transition-colors"
          >
            <div className="mb-4 text-indigo-600 dark:text-indigo-400">
              {service.icon}
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
