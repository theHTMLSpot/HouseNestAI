"use client";

import FeatureCard from "./featureCard";

export default function FeatureCards({ className }: { className?: string }) {
	return (
		<div
			className={`grid w-screen grid-cols-1 place-items-center gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ${className}`}
		>
			<FeatureCard
				title="Effortless Search"
				description="Find your ideal listing in seconds – no more endless scrolling."
			/>
			<FeatureCard
				title="Tailored Comparisons"
				description="Compare listings the way that works best for you, with total flexibility."
			/>
			<FeatureCard
				title="AI-Driven Recommendations"
				description="Let our AI-powered system recommend the perfect listing for your needs."
			/>
		</div>
	);
}
