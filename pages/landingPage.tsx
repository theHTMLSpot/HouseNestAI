"use client";

import FeatureCards from "@/components/parts/featureCards";
import { Button, Title } from "@/components/ui/components";

export default function LandingPage() {
  return (
    <div className="flex max-w-screen min-w-screen flex-col items-center justify-center overflow-x-clip">
      {/* hero section */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#11171a] to-[#0b0f11]">
        <Title
          text="Compare Listings how you want when you want"
          level={1}
          className="mb-4 text-center text-4xl font-bold text-[#aabfc6]"
        />
        <Title
          text="Find the best listing for you with House Nest AI"
          level={5}
          className="mb-4 text-center text-3xl text-[#7f8e92]"
        />

        <div className="grid grid-cols-1 items-center justify-center gap-20 sm:grid-cols-2">
          <Button
            label="Get Started"
            className="hover:scale-1.05 w-60 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
          />
          <Button
            label="Learn More"
            className="hover:scale-1.05 w-60 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
          />
        </div>
      </div>
      {/* features */}
      <FeatureCards />
    </div>
  );
}
