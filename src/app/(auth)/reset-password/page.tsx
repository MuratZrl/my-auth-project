"use client";

import React, { Suspense } from "react";

import ResetPasswordPage from "@/app/(auth)/reset-password/ResetPasswordPage";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
