"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    const loggedOut = await logoutAccount();

    try {
      if (loggedOut) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-normal text-gray-600">
          {user?.name}
        </h1>
        <p className="text-14 truncate font-semibold text-gray-700">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogOut}>
        {!isLoading ? (
          <Image src="/icons/logout.svg" fill alt="logout" />
        ) : (
          <>
            <Loader2 size={30} className="animate-spin text-bankGradient" />
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
