import { Button } from "@/components/components";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function OurMission() {
	const router = useRouter();
	return (
		<div className="flex w-screen p-10">
			<div className="flex flex-1 flex-col items-center justify-center">
				<Image
					src="/images/mission.jpg"
					alt="About House Nest AI"
					width={1000}
					height={1000}
					className="rounded-lg"
				/>
			</div>
			<div className="flex flex-1 flex-col items-center justify-center">
				<h1 className="text-4xl font-bold text-[#aabfc6]">Our Mission</h1>
				<p className="text-lg text-[#7f8e92]">
					{" "}
					We strive to make to make your house searching journey easier with ai
					search and comparison tools{" "}
				</p>
				<Button
					label="Get Started"
					onClick={() => {
						router.push("/signup");
					}}
					className="mt-4"
				/>
			</div>
		</div>
	);
}
