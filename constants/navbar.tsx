"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/components";

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false); // State for dropdown menu

	useEffect(() => {
		setIsOpen(false); // Close dropdown menu on route change
	}, [pathname]);

	const onLoginClick = () => {
		router.push("/login");
	};

	const onSignupClick = () => {
		router.push("/signup");
	};

	const signedIn = true; //! Replace with actual authentication logic

	return (
		<div className="relative flex w-full items-center justify-between border-b-2 border-b-[#4d7298] bg-[#2c3438] p-4 text-[#aabfc6]">
			<div className="relative text-2xl font-bold">House Nest AI</div>

			{/* Mobile Hamburger Button */}
			<div className="relative flex items-center space-x-4 lg:hidden">
				<button
					className="text-2xl"
					onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
				>
					{isOpen ? "✖" : "☰"} {/* Change icon on toggle */}
				</button>

				{/* Dropdown Menu */}
				<div
					className={`absolute top-10 right-5 z-50 mt-2 min-w-40 space-y-4 bg-[#2c3438] p-4 transition-all duration-75 ease-in-out ${isOpen ? "flex flex-col" : "hidden"}`}
				>
					<Link
						href="/"
						className={`hover:text-[#4d7298] ${pathname === "/" ? "font-semibold hover:font-bold" : ""}`}
					>
						Home
					</Link>
					<Link
						href="/features"
						className={`hover:text-[#4d7298] ${pathname === "/features" ? "font-semibold hover:font-bold" : ""}`}
					>
						Features
					</Link>
					<Link
						href="/about"
						className={`hover:text-[#4d7298] ${pathname === "/about" ? "font-semibold hover:font-bold" : ""}`}
					>
						About
					</Link>
					<Link
						href="/contact"
						className={`hover:text-[#4d7298] ${pathname === "/contact" ? "font-semibold hover:font-bold" : ""}`}
					>
						Contact
					</Link>
					{signedIn ? (
						<>
							<Link
								href="/compare"
								className={`hover:text-[#4d7298] ${pathname === "/compare" ? "font-semibold hover:font-bold" : ""}`}
							>
								Compare
							</Link>
							<Link
								href="/profile"
								className={`hover:text-[#4d7298] ${pathname === "/profile" ? "font-semibold hover:font-bold" : ""}`}
							>
								Profile
							</Link>
						</>
					) : (
						<>
							<Button
								label="Login"
								onClick={onLoginClick}
								className="hover:scale-1.05 w-30 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
							/>
							<Button
								label="Sign Up"
								onClick={onSignupClick}
								className="hover:scale-1.05 w-30 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
							/>
						</>
					)}
				</div>
			</div>

			{/* Links for larger screens */}
			<div className="hidden items-center justify-center space-x-4 lg:flex">
				<Link
					href="/"
					className={`hover:text-[#4d7298] ${pathname === "/" ? "font-semibold hover:font-bold" : ""}`}
				>
					Home
				</Link>
				<Link
					href="/features"
					className={`hover:text-[#4d7298] ${pathname === "/features" ? "font-semibold hover:font-bold" : ""}`}
				>
					Features
				</Link>
				<Link
					href="/about"
					className={`hover:text-[#4d7298] ${pathname === "/about" ? "font-semibold hover:font-bold" : ""}`}
				>
					About
				</Link>
				<Link
					href="/contact"
					className={`hover:text-[#4d7298] ${pathname === "/contact" ? "font-semibold hover:font-bold" : ""}`}
				>
					Contact
				</Link>
				{signedIn ? (
					<>
						<Link href="/compare" className="hover:text-[#4d7298]">
							Compare
						</Link>
						<Link href="/profile" className="hover:text-[#4d7298]">
							Profile
						</Link>
					</>
				) : (
					<>
						<Button
							label="Login"
							onClick={onLoginClick}
							className="hover:scale-1.05 w-30 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
						/>
						<Button
							label="Sign Up"
							onClick={onSignupClick}
							className="hover:scale-1.05 w-30 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
						/>
					</>
				)}
			</div>
		</div>
	);
}
