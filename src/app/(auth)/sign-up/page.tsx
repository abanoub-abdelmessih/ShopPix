import { SignupForm } from "@/components/shared/auth/signupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Register",
};

const SignUp = () => {
  return (
    <section className="w-full py-10">
      <Card className="w-full max-w-xl mx-auto shadow-xl">
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
      </Card>
    </section>
  );
};

export default SignUp;
