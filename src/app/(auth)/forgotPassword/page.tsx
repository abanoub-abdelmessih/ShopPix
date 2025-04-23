"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ResetPassword,
  SendResetCode,
  VerifyResetCode,
} from "@/components/shared/auth/ForgotPasswordForm";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [tab, setTab] = useState("email");
  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const userEmail = Cookies.get("email");
  const handleTabChange = (value: string) => {
    if (tab === "newPasswordTab") {
      return;
    }

    if (
      value === "email" ||
      (value === "verifyCode" && emailSent) ||
      (value === "newPasswordTab" && codeVerified)
    ) {
      setTab(value);
    }
  };

  const handleEmailSuccess = () => {
    setEmailSent(true);
    setTab("verifyCode");
  };

  const handleCodeSuccess = () => {
    setCodeVerified(true);
    setTab("newPasswordTab");
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Follow the steps to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" disabled={tab === "newPasswordTab"}>
              Email
            </TabsTrigger>
            <TabsTrigger
              value="verifyCode"
              disabled={!emailSent || tab === "newPasswordTab"}
            >
              Verify Code
            </TabsTrigger>
            <TabsTrigger value="newPasswordTab" disabled={!codeVerified}>
              New Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <SendResetCode onSuccess={handleEmailSuccess} />
          </TabsContent>

          <TabsContent value="verifyCode">
            <Button
              variant={"outline"}
              className="w-full text-gray-500"
              onClick={() => setTab("email")}
            >
              A reset code has been sent to:
              <span className="font-semibold text-black">{userEmail}</span>
            </Button>
            <VerifyResetCode onSuccess={handleCodeSuccess} />
          </TabsContent>

          <TabsContent value="newPasswordTab">
            <ResetPassword />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {tab !== "newPasswordTab" && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/login" className="text-gray-500">
              Remember your password?{" "}
              <span className="text-black">Sign in</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
