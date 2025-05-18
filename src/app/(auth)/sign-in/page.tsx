import { SigninForm } from "@/components/shared/auth/signinForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";

export const metadata = {
  title: "Login",
};

const SignIn = () => {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl dark:border-gray-400">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back to Shoppix.</CardTitle>
        <CardDescription>
          Please log in or sign up to continue using our app.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <SigninForm />
      </CardContent>
      <Separator />
      <CardFooter className="text-gray-500 dark:text-gray-400 text-sm justify-center mt-3 pb-3">
        Don&apos;t have an account ?
        <Link
          href={"/sign-up"}
          className="underline ms-1 text-black dark:text-white"
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
};
export default SignIn;
