"use client";

import { useState } from "react";

export default function Slider({
	min,
	max,
	value = 0,
	step = 0.1,
	onChange_,
	tooltip,
	id,
	name,
}: {
	min: number;
	max: number;
	value?: number;
	step?: number;
	onChange_?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tooltip?: string;
	id?: string;
	name?: string;
}) {
	const [showingTooltip, setShowingTooltip] = useState(false);

	const getThumbColor = (value: number) => {
		if (value < 3.5) return "thumb-green";
		if (value < 7.5) return "thumb-orange";
		return "thumb-red";
	};

	const thumbClass = getThumbColor(value);

	return (
		<div className="relative flex h-15 w-full flex-col items-center justify-center">
			{showingTooltip && tooltip && (
				<div className="absolute top-0 left-0 z-50 text-xs text-red-400">
					{tooltip}
				</div>
			)}
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => {
					if (onChange_) onChange_(e);
				}}
				onMouseEnter={() => setShowingTooltip(true)}
				onMouseLeave={() => setShowingTooltip(false)}
				className={`slider w-full ${thumbClass}`}
				name={name}
			/>
		</div>
	);
}
