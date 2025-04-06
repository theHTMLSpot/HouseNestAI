"use client";

import { Title } from "@/components/ui/components";
import FeatureCards from "@/components/parts/featureCards";
import Cta from "@/components/parts/cta";

export default function FeaturesPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#11171a] p-4 text-gray-100 lg:flex-row">
        <div className="flex flex-col items-center justify-center p-6 text-center max-w-[45vw] lg:max-w-[30vw]">
          <Title
            text="Our Features"
            level={1}
            className="mb-4 text-4xl font-bold text-[#aabfc6]"
          />
          <p className="text-lg text-[#7f8e92]">
            At House Nest AI, we offer a suite of cutting-edge features designed
            to make your real estate experience effortless. With our intelligent
            AI tools and user-friendly interface, you can search, compare, and
            discover the best properties that match your needs. Here are some of
            the features that set us apart:
          </p>
        </div>

        {/* Image Section */}
        <div className="relative min-w-[40vw] h-[500px] lg:min-w-[50vw] lg:h-auto lg:max-w-[50vw] lg:bg-cover lg:bg-center bg-cover bg-center bg-no-repeat rounded-lg sm:w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/features.jpg')" }}></div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-20 bg-[#11171a] text-gray-100">
        <div className="container mx-auto text-center">
          <Title
            text="Our Unique Features"
            level={2}
            className="text-3xl font-bold text-[#aabfc6] mb-10"
          />
          <FeatureCards />
        </div>
      </div>

      {/* CTA Section */}
      <Cta />
    </>
  );
}
