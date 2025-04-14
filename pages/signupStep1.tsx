"use client";

import { useState } from "react";
import { Input, Card } from "@/components/ui/components";
import Link from "next/link";
import Image from "next/image";

type SignupPageProps = {
  handleNext: () => void;
};

export default function SignupPage({ handleNext }: SignupPageProps) {
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
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
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

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

  //! no api call yet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission (e.g., call an API or update state)
      console.log("Form submitted successfully!");
      handleNext(); // Move to the next step
    }
  };

  return (
    <Card
      title="Sign up"
      titleLevel={2}
      titleClassName="mb-6 text-center text-3xl font-bold text-[#aabfc6]"
      className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg"
    >
      <form className="w-full" onSubmit={handleSubmit}>
        {/* First Name Input */}
        <div className="mb-4">
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="mb-4">
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

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
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-[#7f8e92]">
        Already have an account?{" "}
        <a href="/login" className="text-[#aabfc6] hover:underline">
          Login
        </a>
      </p>

      <div className="flex items-center my-6">
        <div className="h-px flex-1 bg-[#2e3a40]"></div>
        <span className="mx-3 text-[#6c7a80]">or</span>
        <div className="h-px flex-1 bg-[#2e3a40]"></div>
      </div>

      <div className="space-y-3">
        <Link
          href="http://localhost:8000/auth/google"
          className="w-full flex items-center justify-center gap-2 rounded-md border border-[#444d56] bg-[#ffffff] py-3 font-semibold text-[#11171a] transition hover:bg-[#f0f0f0]"
        >
          <Image
            src="/google.svg"
            alt="Google"
            height={20}
            width={20}
            className="h-5 w-5"
          />
          Continue with Google
        </Link>

        <Link
          href="http://localhost:8000/auth/github"
          className="w-full flex items-center justify-center gap-2 rounded-md border border-[#444d56] bg-[#11171a] py-3 font-semibold text-[#aabfc6] transition hover:bg-[#1f2a30]"
        >
          <Image
            src="/github.svg"
            alt="GitHub"
            height={20}
            width={20}
            className="h-5 w-5"
          />
          Continue with GitHub
        </Link>
      </div>
    </Card>
  );
}