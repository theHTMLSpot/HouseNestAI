"use client";

import { Title } from "@/components/ui/components";
import FeatureCards from "@/components/parts/featureCards";
import Cta from "@/components/parts/cta";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-between bg-[#11171a] p-30 text-gray-100 lg:flex-row flex-col">
        {/* Image Section */}
        <div className="relative hidden min-w-[35vw] h-[500px] sm:block">
          <Image
            src="/images/features.jpg"
            alt="About House Nest AI"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Text Section */}
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
      </div>

      {/* Feature Cards Section */}
      <div className="flex items-center justify-center py-20 bg-[#11171a] text-gray-100">
        <div className="flex flex-col container mx-auto text-center items-center justify-center">
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
