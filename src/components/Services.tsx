import { useTranslations } from "next-intl";
import { Heading } from "./Heading";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const Services = () => {
  const t = useTranslations("HomePage.Services");

  const services = [
    {
      icon: <Truck size={24} />,
      title: t("service1.title"),
      description: t("service1.description"),
    },
    {
      icon: <ShieldCheck size={24} />,
      title: t("service2.title"),
      description: t("service2.description"),
    },
    {
      icon: <RefreshCcw size={24} />,
      title: t("service3.title"),
      description: t("service3.description"),
    },
    {
      icon: <Headset size={24} />,
      title: t("service4.title"),
      description: t("service4.description"),
    },
  ];

  return (
    <div className="container mx-auto py-12 px-3">
      <Heading
        title={t("Heading.title")}
        description={t("Heading.description")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-center transition-colors"
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
