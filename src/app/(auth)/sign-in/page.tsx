import { SigninForm } from "@/components/shared/auth/signinForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Login",
};

const SignIn = () => {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
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
    </Card>
  );
};
export default SignIn;
