"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/components";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const onLoginClick = () => {
    router.push("/login");
  };
  const onSignupClick = () => {
    router.push("/signup");
  };

  const signedIn = false; //! Replace with actual authentication logic

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-b-[#4d7298] bg-[#2c3438] p-4 text-[#aabfc6]">
      <div className="text-2xl font-bold">House Nest AI</div>
      <div className="flex items-center justify-center space-x-4">
        <Link
          href="#features"
          className={`hover:text-[#4d7298] ${pathname === "/" ? "text-semibold hover:bold" : ""}`}
        >
          Home
        </Link>
        <Link
          href="#features"
          className={`hover:text-[#4d7298] ${pathname === "/features" ? "text-semibold hover:bold" : ""}`}
        >
          Features
        </Link>
        <Link
          href="#about"
          className={`hover:text-[#4d7298] ${pathname === "/about" ? "font-semibold hover:font-bold" : ""}`}
        >
          About
        </Link>
        <Link
          href="#contact"
          className={`hover:text-[#4d7298] ${pathname === "/contact" ? "font-semibold hover:font-bold" : ""}`}
        >
          Contact
        </Link>
        {signedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-[#4d7298]">
              Dashboard
            </Link>
            <Link href="/login" className="hover:text-[#4d7298]">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Button
              label="login"
              onClick={onLoginClick}
              className="hover:scale-1.05 w-30 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
            />

            <Button
              label="signup"
              onClick={onSignupClick}
              className="hover:scale-1.05 w-30 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
            />
          </>
        )}
      </div>
    </div>
  );
}
