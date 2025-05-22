"use client";

import { useRef, useEffect, useState } from "react";

import TestimonialCard from "@/components/testimonials/card";
export default function Testimonials() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchTestimonials = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/data/testimonials.json");
				if (!response.ok) throw new Error("Failed to fetch testimonials");
				const data = await response.json();
				setTestimonials(data);
			} catch (err: unknown) {
				if (err instanceof Error)
					setError(`Error fetching testimonials: ${err.message}`);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTestimonials();
	}, []);

	const scrollBy = (distance: number) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: distance, behavior: "smooth" });
		}
	};

	if (isLoading)
		return <div className="text-center text-[#aabfc6]">Loading...</div>;
	if (error) return <div className="text-center text-red-500">{error}</div>;

	return (
		<div className="relative w-full px-6 py-10">
			<h1 className="mb-8 text-center text-4xl font-bold text-[#aabfc6]">
				Testimonials
			</h1>

			{/* Scroll Buttons */}
			<button
				onClick={() => scrollBy(-320)} // scroll left by ~card width + gap
				className="absolute top-1/2 left-2 -translate-y-1/2 rounded bg-gray-700 p-2 text-white hover:bg-gray-600"
				aria-label="Scroll Left"
			>
				&#8592;
			</button>
			<button
				onClick={() => scrollBy(320)} // scroll right by ~card width + gap
				className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-gray-700 p-2 text-white hover:bg-gray-600"
				aria-label="Scroll Right"
			>
				&#8594;
			</button>

			<div
				ref={containerRef}
				style={{
					display: "flex",
					gap: "1.5rem",
					overflowX: "auto",
					paddingBottom: "1rem",
					scrollbarWidth: "thin",
					scrollbarColor: "#374151 #111827",
					scrollBehavior: "smooth",
				}}
			>
				{testimonials.map((testimonial: Testimonial) => (
					<div key={testimonial.id} className="min-w-[300px] shrink-0">
						<TestimonialCard
							name={testimonial.name}
							title={testimonial.title}
							image={testimonial.image}
							rating={testimonial.rating}
							date={testimonial.date}
						>
							{testimonial.text}
						</TestimonialCard>
					</div>
				))}
			</div>
		</div>
	);
}

export interface Testimonial {
	id: number;
	name: string;
	title: string;
	image: string;
	rating: number;
	date: string;
	text: string;
}
