"use client";

import Image from "next/image";
import { Title } from "@/components/ui/components";
import Cta from "@/components/parts/cta";

export default function AboutPage() {
  return (
    <>
    <div className="flex min-h-screen items-center justify-between bg-[#11171a] p-30 text-gray-100 lg:flex-row flex-col">
      <div className="flex max-w-screen sm:max-w-[45vw] flex-col items-center justify-center p-6">
        <Title
          text="Our Mission"
          level={1}
          className="mb-4 text-4xl font-bold text-[#aabfc6]"
        />
        <p className="text-lg text-[#7f8e92]">
          Welcome to House Nest AI, your trusted partner in the world of real
          estate. Our mission is to simplify the home buying and selling process
          through innovative technology and personalized service. With our
          advanced AI algorithms, we provide you with accurate property
          valuations, tailored recommendations, and comprehensive market
          insights. Whether {"you're"} a first-time buyer or a seasoned investor, we
          are here to help you navigate the real estate landscape with confidence.
        </p>
        <Title
          text="Our Vision"
          level={1}
          className="mb-4 text-4xl font-bold text-[#aabfc6]"
        />
        <p className="text-lg text-[#7f8e92]">
          At House Nest AI, we envision a future where technology and real
          estate converge seamlessly. Our goal is to empower individuals and
          families to make informed decisions about their homes, ensuring that
          everyone has access to the tools and resources they need to succeed in
          the real estate market. We believe that by harnessing the power of AI,
          we can create a more transparent, efficient, and user-friendly
          experience for all. Join us on this journey as we redefine the way
          people buy and sell homes.
        </p>
      </div>
      <div className="relative hidden min-w-[40vw] h-[500px] sm:block">
        <Image
          src="/images/about.jpg"
          alt="About House Nest AI"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
    </div>
    <Cta/>
    </>
  );
}
