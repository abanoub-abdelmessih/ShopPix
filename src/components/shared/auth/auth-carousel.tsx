import Image from "next/image";
import { SwiperAuthCarousel } from "./SwiperAuthCarousel";

export const AuthCarousel = () => {
  return (
    <SwiperAuthCarousel pagination autoplay loop spaceBetween={0}>
      <DivContainer
        imagePath="/images/auth/auth1.jpg"
        imagePosition="bottom"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Deleniti, aliquid?"
      />
      <DivContainer
        imagePath="/images/auth/auth2.jpg"
        imagePosition="bottom"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Deleniti, aliquid?"
      />
      <DivContainer
        imagePath="/images/auth/auth3.jpg"
        imagePosition="center"
        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Deleniti, aliquid?"
      />
    </SwiperAuthCarousel>
  );
};
const DivContainer = ({
  imagePath,
  imagePosition,
  desc,
}: {
  imagePath: string;
  imagePosition: string;
  desc: string;
}) => {
  return (
    <div className="relative cursor-grab bg-black/30 h-full">
      <Image
        src={imagePath}
        alt="Carousel Image"
        fill
        sizes="100%"
        priority
        style={{
          objectFit: "cover",
          objectPosition: imagePosition,
        }}
        className="-z-10"
      />
      <div className=" absolute top-[70%] right-[50%] text-center translate-x-1/2">
        <span className="text-4xl text-white font-bold text-nowrap">
          Welcome to Shoppix
        </span>
        <p className="text-gray-200 text-lg xl:text-xl mt-3">{desc}</p>
      </div>
    </div>
  );
};
