"use client";

import {
	ButtonProps,
	InputProps,
	TitleProps,
	ModalProps,
	CardProps,
	DropdownProps,
} from "@/types/UIprops";
import Image from "next/image"; // Fixed import for next/image

// Button Component
const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
	return (
		<button onClick={onClick} className={className}>
			{label}
		</button>
	);
};

// Input Component
const Input: React.FC<InputProps> = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	className,
	disabled,
	required,
	maxLength,
	minLength,
	pattern,
	autoComplete,
	autoFocus,
	readOnly,
	error, // Destructure error prop
}) => {
	return (
		<div>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`${className} ${error ? "border-red-500" : "border-[#444d56]"} w-full rounded-md p-4`} // Apply red border if error
				disabled={disabled}
				required={required}
				maxLength={maxLength}
				minLength={minLength}
				pattern={pattern}
				autoComplete={autoComplete}
				autoFocus={autoFocus}
				readOnly={readOnly}
			/>
			{/* Show error message */}
			{error && <span className="m-1 text-sm text-red-500">{error}</span>}
		</div>
	);
};
// Title Component

const Title: React.FC<TitleProps> = ({ text, level = 1, className = "" }) => {
	const sizeMap: Record<number, { size: string; weight: string }> = {
		1: { size: "text-[2rem]", weight: "font-bold" },
		2: { size: "text-[1.5rem]", weight: "font-semibold" },
		3: { size: "text-[1.25rem]", weight: "font-medium" },
		4: { size: "text-[1rem]", weight: "font-normal" },
		5: { size: "text-[0.875rem]", weight: "font-normal" },
		6: { size: "text-[0.5rem]", weight: "font-light" },
	};

	const { size, weight } = sizeMap[level] ?? {
		size: "text-base",
		weight: "font-normal",
	};

	const hasTextSize = /text-(\[\d+rem\]|xs|sm|base|lg|xl|[2-9]xl)/.test(
		className,
	);
	const hasFontWeight =
		/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/.test(
			className,
		);

	const finalClassName = [
		!hasTextSize && size,
		!hasFontWeight && weight,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <p className={finalClassName}>{text}</p>;
};

// Card Component
const Card: React.FC<CardProps> = ({
	title,
	description,
	titleLevel = 1,
	descriptionLevel = 5,
	titleClassName,
	descriptionClassName,
	imageUrl,
	onClick,
	style,
	className,
	children,
}) => {
	return (
		<div
			className={`flex flex-col items-center justify-center ${className}`}
			onClick={onClick}
			style={style}
		>
			{imageUrl && (
				<Image src={imageUrl} alt={title} width={150} height={150} />
			)}
			<Title
				text={title}
				level={titleLevel}
				className={`m-2 text-center ${titleClassName}`}
			/>
			<Title
				text={description || ""}
				level={descriptionLevel}
				className={`m-2 text-center ${descriptionClassName}`}
			/>
			{children}
		</div>
	);
};

// Modal Component
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className,
}) => {
	if (!isOpen) return null;

	return (
		<div className={`modal ${className}`}>
			<div className="modal-content">
				{title && <h2>{title}</h2>}
				<button onClick={onClose}>Close</button>
				<div>{children}</div>
			</div>
		</div>
	);
};

// Dropdown Component
const Dropdown: React.FC<DropdownProps> = ({
	options,
	onSelect,
	className,
}) => {
	return (
		<select className={className} onChange={(e) => onSelect(e.target.value)}>
			{options.map((option, index) => (
				<option key={index} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export { Button, Input, Title, Modal, Card, Dropdown };
