"use client";

import SignupPage from "@/pages/signupStep1";
import CardDetailsPage from "@/pages/signupStep2";
import { useState } from "react";

export default function RegisterPage() {
	const [currentStep, setCurrentStep] = useState(1);

	const handleNext = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	};

	return (
		<div className="flex w-[100vw] items-center justify-center rounded-lg bg-[#11171a] p-8 shadow-lg">
			{currentStep === 1 && <SignupPage handleNext={handleNext} />}
			{currentStep === 2 && <CardDetailsPage />}
		</div>
	);
}
