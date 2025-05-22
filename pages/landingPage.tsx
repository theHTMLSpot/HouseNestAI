"use client";

import Cta from "@/constants/cta";
import FeatureCards from "@/constants/featureCards";
import Testimonials from "@/constants/testimonials";
import { Button, Title } from "@/components/components";
import { useRouter } from "next/navigation";
import OurMission from "@/constants/our_mission";

export default function LandingPage() {
	const router = useRouter();

	const onGetStartedClick = () => {
		router.push("/signup");
	};
	const onLearnMoreClick = () => {
		router.push("/features");
	};

	return (
		<div className="flex w-screen flex-col items-center justify-center overflow-x-clip">
			{/* hero section */}
			<div
				className="relative flex min-h-[85vh] w-full flex-col items-center justify-center bg-gradient-to-b from-[#0b0f11] to-[#ffffff] bg-cover bg-center"
				style={{ backgroundImage: `url("/images/hero.jpg")` }}
			>
				{/* Background overlay */}
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#0b0f11] to-transparent"></div>

				<Title
					text="Compare Listings how you want when you want"
					level={1}
					className="z-10 mb-4 text-center text-4xl font-bold text-[#aabfc6] drop-shadow-lg"
				/>
				<Title
					text="Find the best listing for you with House Nest AI"
					level={5}
					className="z-10 mb-4 text-center text-3xl text-[#7f8e92] drop-shadow-lg"
				/>

				<div className="grid grid-cols-1 items-center justify-center gap-20 sm:grid-cols-2">
					<Button
						label="Get Started"
						className="hover:scale-1.05 z-10 w-60 rounded-lg border border-gray-300 p-2 transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
						onClick={onGetStartedClick}
					/>
					<Button
						label="Learn More"
						className="hover:scale-1.0 z-10 w-60 rounded-lg bg-[#4d7298] p-2 font-bold text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
						onClick={onLearnMoreClick}
					/>
				</div>
			</div>
			{/* features */}
			<Title
				text="Features"
				level={1}
				className="mt-10 text-center text-4xl font-bold text-[#aabfc6]"
			/>
			<FeatureCards className="mt-3 mb-15" />
			{/* Our Mission */}
			<OurMission />
			{/* Testimonials */}
			<Testimonials />
			{/* CTA Section */}
			<Cta />
		</div>
	);
}
