"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/components";

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const signedIn = true; // Replace with actual auth logic

	const onLoginClick = () => router.push("/login");
	const onSignupClick = () => router.push("/signup");

	const navLinks = [
		{ label: "Home", path: "/" },
		{ label: "Features", path: "/features" },
		{ label: "About", path: "/about" },
		{ label: "Contact", path: "/contact" },
	];

	const signedInLinks = [
		{ label: "Compare", path: "/compare" },
		{ label: "Profile", path: "/profile" },
	];

	const NavLink = ({ href, label }: { href: string; label: string }) => (
		<Link
			href={href}
			className={`hover:text-[#4d7298] ${pathname === href ? "font-semibold hover:font-bold" : ""}`}
		>
			{label}
		</Link>
	);

	const NavButtons = () => (
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
	);

	return (
		<div className="relative flex w-full items-center justify-between border-b-2 border-b-[#4d7298] bg-[#2c3438] p-4 text-[#aabfc6]">
			<Link href="/" className="text-2xl font-bold cursor-pointerß">House Nest AI</Link>

			{/* Mobile */}
			<div className="relative flex items-center space-x-4 lg:hidden">
				<button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? "✖" : "☰"}
				</button>

				<div
					className={`absolute top-10 right-5 z-50 mt-2 min-w-40 space-y-4 bg-[#2c3438] p-4 transition-all duration-75 ease-in-out ${
						isOpen ? "flex flex-col" : "hidden"
					}`}
				>
					{navLinks.map((link) => (
						<NavLink key={link.path} href={link.path} label={link.label} />
					))}
					{signedIn ? (
						signedInLinks.map((link) => (
							<NavLink key={link.path} href={link.path} label={link.label} />
						))
					) : (
						<NavButtons />
					)}
				</div>
			</div>

			{/* Desktop */}
			<div className="hidden items-center justify-center space-x-4 lg:flex">
				{navLinks.map((link) => (
					<NavLink key={link.path} href={link.path} label={link.label} />
				))}
				{signedIn ? (
					signedInLinks.map((link) => (
						<NavLink key={link.path} href={link.path} label={link.label} />
					))
				) : (
					<NavButtons />
				)}
			</div>
		</div>
	);
}
