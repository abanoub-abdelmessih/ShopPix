import { SignupForm } from "@/components/shared/auth/signupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

const SignUp = () => {
  return (
    <section className="w-full py-10">
      <Card className="w-full max-w-xl mx-auto shadow-xl dark:border-gray-400">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Shoppix !</CardTitle>
          <CardDescription>
            Let&apos;s get you started with your new account
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <SignupForm />
        </CardContent>
        <Separator />
        <CardFooter className="text-gray-500 dark:text-gray-400 text-sm justify-center mt-3 pb-3">
          Already have an account?
          <Link
            href="/sign-in"
            className="underline ms-1 text-black dark:text-white"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUp;
