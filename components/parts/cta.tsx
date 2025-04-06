import { Title, Button } from "@/components/ui/components";

import { useRouter } from "next/navigation";

export default function Cta() {

    const router = useRouter();

    const onGetStartedClick = () => {
        router.push("/signup");
    };
    const onLearnMoreClick = () => {
        router.push("/features");
    }

  return (
    <div className="bg-gray-800 py-16 px-6 w-screen text-center text-white">
      <Title
        text="Ready to Find Your Perfect Home?"
        level={1}
        className="text-4xl mb-4"
      />
      <Title
        text="With House Nest, compare listings, view details, and find the best fit for you."
        level={4}
        className="text-xl mb-6"
      />
      
      {/* CTA Buttons */}
      <div className="flex justify-center gap-6">
         <Button
            label="Get Started"
            className="hover:scale-1.05 w-60 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg z-10"
            onClick={onGetStartedClick}
          />
          <Button
            label="Learn More"
            className="hover:scale-1.0 font-bold w-60 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg z-10"
            onClick={onLearnMoreClick}
          />
      </div>
    </div>
  );
}
