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
        <div className="flex min-h-screen items-center justify-center bg-[#11171a]">
        <div className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg">
            {currentStep === 1 && <SignupPage handleNext={handleNext} />}
            {currentStep === 2 && <CardDetailsPage />}
        </div>
        </div>
    );
}
