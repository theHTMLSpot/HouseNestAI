"use client";

import FeatureCards from "@/components/parts/featureCards";
import { Button, Title } from "@/components/ui/components";


export default function LandingPage() {
    return (
        <div className="overflow-x-clip min-w-screen max-w-screen flex flex-col items-center justify-center">
            {/* hero section */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#77a6b6] to-[#4d7298] w-full">
                <Title text="Compare Listings how you want when you want" level={1} className="text-4xl text-[#172226] font-bold mb-4" />
                <Title text="Find the best listing for you with House Nest AI" level={2} className="text-2xl text-[#43575c] mb-4" />

                <div className="grid grid-cols-2 sm:grid-cols.1 items-center justify-center gap-20">
                    <Button
                        label="Get Started"
                        className="border border-gray-300 rounded-lg p-2 mb-4 w-60 sm:w-40"
                    />
                    <Button
                        label="Learn More"
                        className="bg-[#4d7298] text-white rounded-lg p-2 w-60 sm:w-40"
                    />
                </div>

            </div>
        {/* features */}
        <FeatureCards />
        </div>
    );
}
