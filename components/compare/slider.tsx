"use client";

import { useState, useRef, useEffect } from "react";

export default function Slider({
	min,
	max,
	value,
	step = 0.1,
	onChange_,
	tooltip,
	id,
	name,
}: {
	min: number;
	max: number;
	value: number;
	step?: number;
	onChange_?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tooltip?: string;
	id?: string;
	name?: string;
}) {
	const [internalValue, setInternalValue] = useState(value);
	const [dragging, setDragging] = useState(false);
	const [showingTooltip, setShowingTooltip] = useState(false);
	const trackRef = useRef<HTMLDivElement>(null);
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const clamp = (val: number) => Math.min(max, Math.max(min, val));

	const getThumbColor = (val: number) => {
		if (val < 3.5) return "#4ade80"; // green
		if (val < 7.5) return "#facc15"; // orange
		return "#f87171"; // red
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!trackRef.current) return;
		const rect = trackRef.current.getBoundingClientRect();
		const percent = (e.clientX - rect.left) / rect.width;
		const rawValue = percent * (max - min) + min;
		const stepped = Math.round(rawValue / step) * step;
		const clamped = clamp(stepped);

		setInternalValue(clamped);

		if (hiddenInputRef.current && onChange_) {
			hiddenInputRef.current.value = clamped.toString();
			const event = new Event("change", { bubbles: true });
			hiddenInputRef.current.dispatchEvent(event);
		}
	};

	const handleMouseUp = () => setDragging(false);

	useEffect(() => {
		if (dragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [dragging]);

	const percentFilled = ((internalValue - min) / (max - min)) * 100;

	return (
		<div
			className="relative flex h-15 w-full flex-col items-center justify-center"
			onMouseEnter={() => setShowingTooltip(true)}
			onMouseLeave={() => setShowingTooltip(false)}
		>
			{showingTooltip && tooltip && (
				<div className="absolute top-0 left-0 text-xs text-red-400">
					{tooltip}
				</div>
			)}

			{/* Track */}
			<div
				ref={trackRef}
				onMouseDown={() => setDragging(true)}
				className="relative h-2 w-full cursor-pointer rounded-lg bg-[#444d56]"
				id={id}
			>
				{/* Filled track */}
				<div
					style={{
						width: `${percentFilled}%`,
						backgroundColor: getThumbColor(internalValue),
					}}
					className="absolute top-0 left-0 h-full rounded-lg"
				/>

				{/* Thumb */}
				<div
					style={{
						left: `${percentFilled}%`,
						transform: "translate(-50%, -50%)",
						backgroundColor: getThumbColor(internalValue),
					}}
					className="absolute top-1/2 h-4 w-4 rounded-full shadow-md transition-colors duration-100 ease-in-out"
				/>
			</div>

			{/* Hidden input to hold the real value and trigger real onChange */}
			{typeof name === "string" && (
				<input
					ref={hiddenInputRef}
					type="hidden"
					name={name}
					defaultValue={internalValue}
					onChange={onChange_}
				/>
			)}
		</div>
	);
}
