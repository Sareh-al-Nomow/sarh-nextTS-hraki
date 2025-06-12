// app/ClientLayoutPart.tsx

"use client";

import { AuthContext } from "@/store/AuthContext";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ClientLayoutPart() {
  const { loginWithGoogle } = useContext(AuthContext);

  const searchParams = useSearchParams();

  useEffect(() => {
    const googleLoginToken = searchParams.get("token");

    if (googleLoginToken) {
      console.log("Google Token:", googleLoginToken);
      localStorage.setItem("token", googleLoginToken);
      loginWithGoogle(googleLoginToken);
    }
  }, [searchParams]);

  return <></>;
}
