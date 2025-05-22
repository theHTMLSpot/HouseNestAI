"use client";

import { useState } from "react";
import { Title, Input } from "@/components/components";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		queryType: "",
		email: "",
		message: "",
		acceptPolicy: false,
	});

	const [formErrors, setFormErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
		acceptPolicy: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, type, value } = e.target;
		const checked =
			"checked" in e.target ? (e.target as HTMLInputElement).checked : false;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const errors = {
			firstName: "",
			lastName: "",
			email: "",
			message: "",
			acceptPolicy: "",
		};

		if (!formData.firstName) errors.firstName = "First name is required";
		if (!formData.lastName) errors.lastName = "Last name is required";
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
			errors.email = "Please enter a valid email";
		if (!formData.message) errors.message = "Message is required";
		if (!formData.acceptPolicy)
			errors.acceptPolicy = "You must accept the privacy policy";

		setFormErrors(errors);

		if (Object.values(errors).every((error) => error === "")) {
			alert("Form submitted successfully!");

			// Reset form after successful submission
			setFormData({
				firstName: "",
				lastName: "",
				queryType: "",
				email: "",
				message: "",
				acceptPolicy: false,
			});
		}
	};

	return (
		<div className="min-h-[calc(100vh-5rem)] min-w-screen bg-[#11171a] p-8 text-gray-100">
			<div className="flex w-screen flex-col items-center justify-center">
				<Title
					text="Contact Us"
					level={1}
					className="mb-6 text-4xl font-bold text-[#aabfc6]"
				/>

				<form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
					<div className="flex space-x-4">
						<div className="flex-1">
							<Input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleChange}
								className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-4 text-[#aabfc6]"
								required
							/>
							{formErrors.firstName && (
								<span className="text-sm text-red-500">
									{formErrors.firstName}
								</span>
							)}
						</div>

						<div className="flex-1">
							<Input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleChange}
								className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-4 text-[#aabfc6]"
								required
							/>
							{formErrors.lastName && (
								<span className="text-sm text-red-500">
									{formErrors.lastName}
								</span>
							)}
						</div>
					</div>

					<div>
						<select
							name="queryType"
							value={formData.queryType}
							onChange={handleChange}
							className="w-full appearance-none rounded-md border border-[#444d56] bg-[#222b30] p-5 pr-12 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
						>
							<option value="">Select Query Type</option>
							<option value="General Inquiry">General Inquiry</option>
							<option value="Technical Support">Technical Support</option>
							<option value="Feedback">Feedback</option>
						</select>
					</div>

					<div className="flex-1">
						<Input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-4 text-[#aabfc6]"
							required
						/>
						{formErrors.email && (
							<span className="text-sm text-red-500">{formErrors.email}</span>
						)}
					</div>

					<div>
						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							className="h-32 w-full rounded-md border border-[#444d56] bg-[#222b30] p-4 text-[#aabfc6]"
							required
						/>
						{formErrors.message && (
							<span className="text-sm text-red-500">{formErrors.message}</span>
						)}
					</div>

					{/* Privacy Policy Checkbox */}
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="acceptPolicy"
							checked={formData.acceptPolicy}
							onChange={handleChange}
							className="accent-[#4d7298]"
							required
						/>
						<label htmlFor="acceptPolicy" className="text-sm text-[#aabfc6]">
							I accept the{" "}
							<a href="/privacy" className="underline hover:text-[#4d7298]">
								Privacy Policy
							</a>
						</label>
					</div>
					{formErrors.acceptPolicy && (
						<span className="text-sm text-red-500">
							{formErrors.acceptPolicy}
						</span>
					)}

					<button
						type="submit"
						className="w-full rounded-md bg-[#aabfc6] py-3 text-[#11171a] transition hover:bg-[#8eafbb]"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
