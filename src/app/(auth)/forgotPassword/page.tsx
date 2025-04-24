import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ForgotPasswordTabs } from "@/components/shared/auth/ForgotPasswordTabs";

export const metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Follow the steps to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordTabs />
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
