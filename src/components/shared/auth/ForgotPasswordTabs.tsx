"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResetPassword,
  SendResetCode,
  VerifyResetCode,
} from "@/components/shared/auth/ForgotPasswordForm";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export const ForgotPasswordTabs = () => {
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
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 gap-2">
        <TabsTrigger
          value="email"
          disabled={tab === "newPasswordTab"}
          className="text-xs md:text-sm"
        >
          Email
        </TabsTrigger>
        <TabsTrigger
          value="verifyCode"
          className="text-xs md:text-sm"
          disabled={!emailSent || tab === "newPasswordTab"}
        >
          Verify Code
        </TabsTrigger>
        <TabsTrigger
          value="newPasswordTab"
          className="text-xs md:text-sm"
          disabled={!codeVerified}
        >
          New Password
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email">
        <SendResetCode onSuccess={handleEmailSuccess} />
      </TabsContent>

      <TabsContent value="verifyCode">
        <Button
          variant={"outline"}
          className="w-full text-gray-500 flex-col text-xs gap-0.5 py-6"
          onClick={() => setTab("email")}
        >
          A reset code has been sent to:
          <span className="font-semibold text-black text-sm">{userEmail}</span>
        </Button>
        <VerifyResetCode onSuccess={handleCodeSuccess} />
      </TabsContent>

      <TabsContent value="newPasswordTab">
        <ResetPassword />
      </TabsContent>
      {tab !== "newPasswordTab" && (
        <Button asChild variant="outline" className="w-full mt-4">
          <Link href="/login" className="text-gray-500 dark:text-gray-400">
            Remember your password?
            <span className="text-black  dark:text-white"> Sign in</span>
          </Link>
        </Button>
      )}
    </Tabs>
  );
};
