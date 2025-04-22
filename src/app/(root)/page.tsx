// import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      {/* <Button asChild> */}
      <Link href={"/sign-up"}>Register</Link>
      {/* </Button> */}
    </div>
  );
}
