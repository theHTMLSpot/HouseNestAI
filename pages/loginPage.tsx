"use client";

import { useState } from "react";
import { Title, Input } from "@/components/ui/components";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
	window.addEventListener("beforeunload", (event) => {
		const isDirty = true; // If there are unsaved changes
		if (isDirty) {
			const message =
				"Are you sure you want to leave? Your progress will be lost.";
			event.returnValue = message; // Standard for most browsers
			return message; // For some older browsers
		}
	});

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const validateForm = () => {
		const newErrors = { email: "", password: "" };
		let isValid = true;

		if (!formData.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
			isValid = false;
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
			isValid = false;
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// Handle form submission (e.g., call an API or update state)
			console.log("Form submitted successfully!");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#11171a]">
			<div className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg">
				<Title
					text="Login"
					level={2}
					className="mb-6 text-center text-3xl font-bold text-[#aabfc6]"
				/>

				<form onSubmit={handleSubmit}>
					{/* Email Input */}
					<div className="mb-4">
						<Input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
							required
						/>
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email}</p>
						)}
					</div>

					{/* Password Input */}
					<div className="mb-6">
						<Input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter your password"
							className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
							required
						/>
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password}</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full rounded-md bg-[#aabfc6] py-3 font-semibold text-[#11171a] transition hover:bg-[#8e9aaf]"
					>
						Login
					</button>
				</form>

				<p className="mt-4 text-center text-[#7f8e92]">
					{"Don't"} have an account?{" "}
					<a href="/signup" className="text-[#aabfc6] hover:underline">
						Sign up
					</a>
				</p>
				<div className="my-6 flex items-center justify-center">
					<div className="h-px flex-1 bg-[#2e3a40]"></div>
					<span className="mx-3 text-[#6c7a80]">or</span>
					<div className="h-px flex-1 bg-[#2e3a40]"></div>
				</div>

				<div className="space-y-3">
					<Link
						href="http://localhost:8000/auth/google"
						className="flex w-full items-center justify-center gap-2 rounded-md border border-[#444d56] bg-[#ffffff] py-3 font-semibold text-[#11171a] transition hover:bg-[#f0f0f0]"
					>
						<Image
							src="/google.svg"
							alt="Google"
							height={5}
							width={5}
							className="h-5 w-5"
						/>
						Continue with Google
					</Link>

					<Link
						href="http://localhost:8000/auth/github"
						className="flex w-full items-center justify-center gap-2 rounded-md border border-[#444d56] bg-[#11171a] py-3 font-semibold text-[#aabfc6] transition hover:bg-[#1f2a30]"
					>
						<Image
							src="/github.svg"
							alt="GitHub"
							height={5}
							width={5}
							className="h-5 w-5"
						/>
						Continue with GitHub
					</Link>
				</div>
			</div>
		</div>
	);
}
