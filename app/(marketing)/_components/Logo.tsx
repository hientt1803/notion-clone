import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "@/node_modules/next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        height={40}
        width={40}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        height={40}
        width={40}
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold dark:text-white", font.className)}>Jotion</p>
    </div>
  );
};

export default Logo;
