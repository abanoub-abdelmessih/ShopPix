const links = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/abanoub-abd-elmessih/",
  },
  {
    title: "GitHub",
    href: "https://github.com/Abanoub-Abd-Elmessih",
  },
  {
    title: "Gmail",
    href: "mailto:abanoubabdelmessih110@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-white py-12 dark:bg-transparent">
      <div className="mx-auto container px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground  block text-center text-sm ">
            © {new Date().getFullYear()} ShopPix, All rights reserved
          </span>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
