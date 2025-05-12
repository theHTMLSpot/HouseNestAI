"use client";

import { useState } from "react";

import CompareForm from "./compareForm";

export default function ComparePage() {
	const [currentStep, setcurrentStep] = useState(1);

	return (
		<div className="flex w-[100vw] items-center justify-center rounded-lg bg-[#11171a] p-8 shadow-lg">
			{currentStep === 1 && <CompareForm setCurrentStep={setcurrentStep} />}
		</div>
	);
}
