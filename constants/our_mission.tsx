import { useState, useRef } from "react";
import { Button } from "@/components/components";
import { useRouter } from "next/navigation";

export default function OurMission() {
	const router = useRouter();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlay = () => {
		if (!videoRef.current) return;
		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	};

	return (
		<div className="flex w-screen gap-10 p-10">
			<div className="relative flex flex-1 flex-col items-center justify-center">
				<video
					ref={videoRef}
					src="/videos/house.mp4"
					className="w-full max-w-md cursor-pointer rounded-lg object-cover"
					// controls={false} // no native controls
					onClick={togglePlay}
				/>
				{/* Play button overlay */}
				{!isPlaying && (
					<button
						onClick={togglePlay}
						aria-label="Play video"
						className="bg-opacity-60 hover:bg-opacity-80 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-black p-4 text-white focus:outline-none"
					>
						<svg
							className="h-8 w-8"
							fill="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</button>
				)}
			</div>

			<div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
				<h1 className="mb-4 text-4xl font-bold text-[#aabfc6]">Our Mission</h1>
				<p className="mb-6 max-w-md text-lg text-[#7f8e92]">
					We strive to make your house searching journey easier with AI search
					and comparison tools.
				</p>
				<Button
					label="Get Started"
					onClick={() => router.push("/signup")}
					className="mt-2"
				/>
			</div>
		</div>
	);
}
