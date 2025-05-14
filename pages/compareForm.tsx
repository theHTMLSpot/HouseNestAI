"use client";

import React, { useEffect, useState, useRef } from "react";
import { Title, Input } from "@/components/ui/components";
import { propertyFeatures as propertyFeaturesSuggestions } from "@/utils/propertyFeatues";
import { Card, Button } from "@/components/ui/components";
import { Listing } from "@/types/UserProps";
import Image from "next/image";
import Slider from "@/components/ui/compare/slider";
export default function CompareForm({
	setCurrentStep,
}: {
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [hasLink, setHasLink] = useState(false);
	const [propertyUrl, setPropertyUrl] = useState("");
	const [propertyUrlError, setPropertyUrlError] = useState("");

	const [wLeft, setWLeft] = useState<number>(50);

	const [scaling, setScaling] = useState<boolean>(false);

	const [mouseX, setMouseX] = useState(0);

	const [isDirty, setDirty] = useState(false);

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isDirty) {
				const confirmationMessage =
					"Your progress has not been saved. Are you sure you want to reload?";
				event.preventDefault(); // This is necessary for browsers that support custom messages.
				event.returnValue = confirmationMessage; // Standard for most browsers.
				return confirmationMessage; // This is for older browsers that still need a return value.
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [isDirty]);

	// Track mouseX globallyß
	const initialMouseXRef = useRef<number | null>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMouseX(event.clientX);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const update = () => {
			if (scaling) {
				// Calculate width percentage based on absolute mouse X position
				const newWidth = (mouseX / window.innerWidth) * 100;

				setWLeft(() => {
					if (newWidth > 35 && newWidth < 75) {
						return newWidth;
					}
					return wLeft; // fallback to current width
				});
			}
			animationFrameId = requestAnimationFrame(update);
		};

		if (scaling) {
			animationFrameId = requestAnimationFrame(update);
		}

		return () => cancelAnimationFrame(animationFrameId);
	}, [scaling, mouseX, wLeft]);

	const handleMouseDown = () => {
		setScaling(true);
	};

	const handleMouseUp = () => {
		setScaling(false);
		initialMouseXRef.current = null;
	};

	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		return () => window.removeEventListener("mouseup", handleMouseUp);
	}, []);

	const onInputFinished = () => {
		try {
			new URL(propertyUrl);
			setPropertyUrlError("");
			setHasLink(true);
		} catch {
			setPropertyUrlError("Please enter a valid URL");
			setHasLink(false);
			return;
		}
	};

	const handlePropertyUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDirty(true);
		const value = e.target.value;
		console.log("handlePropertyUrlInput called with:", value);

		if (value.includes("\n")) onInputFinished();

		try {
			// Basic URL validation
			setPropertyUrl(value);
			setPropertyUrlError("");
			console.log("URL accepted:", value);
		} catch {
			setPropertyUrlError("Please enter a valid URL");
			console.warn("Invalid URL format");
		}
		if (!value.trim()) {
			setPropertyUrlError("Valid URL is required");
			console.warn("Empty input – Valid URL is required");
			return;
		}
	};

	const listing: Listing = {
		title: "Luxury Modern Villa with Pool",
		description:
			"This stunning modern villa features a spacious open-concept living area, a beautiful swimming pool, and breathtaking panoramic views. It offers a fully equipped kitchen, smart home features, and eco-friendly design elements throughout the property.",
		price: 1250000,
		location: "Malta, St. Julians",
		yearBuilt: 1985,
		squareFootage: 400,
		imageUrl: "/images/villa.png",
		propertyType: "Villa",
		bedrooms: 4,
		bathrooms: 3,
		propertyFeatures: ["Swimming Pool", "Smart Home", "Eco-Friendly Design"],
	};

	// Form state for Ideal Home
	const [formData, setFormData] = useState<Listing>({
		propertyType: "",
		price: NaN,
		location: "",
		bedrooms: NaN,
		bathrooms: NaN,
		squareFootage: NaN,
		yearBuilt: NaN,
		propertyFeatures: [],
		description: "",
	});

	const [formErrors, setFormErrors] = useState({
		propertyType: "",
		price: "",
		location: "",
		bedrooms: "",
		bathrooms: "",
		squareFootage: "",
		yearBuilt: "",
		propertyFeatures: "",
		description: "",
	});

	const [weights, setWeights] = useState({
		propertyTypeWeight: "5",
		priceWeight: "5",
		locationWeight: "5",
		bedroomsWeight: "5",
		bathroomsWeight: "5",
		squareFootageWeight: "5",
		yearBuiltWeight: "5",
		propertyFeaturesWeight: "5",
		descriptionWeight: "5",
	});

	const [weightErrors, setWeightErrors] = useState({
		propertyTypeWeight: "",
		priceWeight: "",
		locationWeight: "",
		bedroomsWeight: "",
		bathroomsWeight: "",
		squareFootageWeight: "",
		yearBuiltWeight: "",
		propertyFeaturesWeight: "",
		descriptionWeight: "",
	});

	// Suggestions for property features

	// Handle input change for form fields
	// 🔧 Centralized validation function
	const validateField = (
		name: string,
		value: string | number | Array<string | number>,
	): string => {
		if (
			["price", "bedrooms", "bathrooms", "squareFootage", "yearBuilt"].includes(
				name,
			) ||
			name.includes("Weight")
		) {
			const numValue =
				typeof value === "string" ? parseFloat(value) : Number(value);
			if (isNaN(numValue) || numValue <= 0) {
				return `${capitalize(name)} must be a valid positive number.`;
			}
		}

		if (name === "propertyFeatures") {
			if (!Array.isArray(value) || value.length === 0) {
				return "Please enter at least one property feature.";
			}
		}

		if (
			["propertyType", "location"].includes(name) &&
			(value === "" || value === null)
		) {
			return `${capitalize(name)} is required.`;
		}

		return "";
	};

	const capitalize = (s: string): string =>
		s.charAt(0).toUpperCase() + s.slice(1);

	// ✍️ Handle field change
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setDirty(true);
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		const errorMsg = validateField(name, value);
		setFormErrors((prev) => ({
			...prev,
			[name]: errorMsg,
		}));
	};

	// ✅ Full form validation on submit
	const validateForm = (data: { [key: string]: string | number }) => {
		const errors: { [key: string]: string } = {};
		Object.entries(data).forEach(([key, value]) => {
			const error = validateField(key, value);
			if (error) errors[key] = error;
		});
		return errors;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formErrors_ = validateForm(
			formData as unknown as { [key: string]: string | number },
		);
		const weightErrors_ = validateForm(
			weights as { [key: string]: string | number },
		);

		setWeightErrors((prev) => ({
			...prev,
			...weightErrors_,
		}));

		const hasErrors =
			Object.values(formErrors_).some((err) => err !== "") &&
			Object.values(weightErrors).some((err) => err !== "");

		if (hasErrors) {
			const firstError = Object.values(formErrors_).find((err) => err !== "");
			alert(firstError); // optional: focus the field instead
			return;
		}

		alert("Listing submitted successfully!");

		setFormData({
			propertyType: "",
			price: NaN,
			location: "",
			bedrooms: NaN,
			bathrooms: NaN,
			squareFootage: NaN,
			yearBuilt: NaN,
			propertyFeatures: [],
			description: "",
		});

		setCurrentStep(2);
		setDirty(false);
	};

	// State for the auto-suggest dropdown
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [newFeature, setNewFeature] = useState("");
	const [isSpaceInvalid, setIsSpaceInvalid] = useState(false);

	// Handle change for property features
	const handlePropertyFeaturesChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { value } = e.target;
		setNewFeature(value);

		// Filter suggestions based on the input
		if (value.trim().length > 0) {
			const filteredSuggestions = propertyFeaturesSuggestions.filter(
				(feature) => feature.toLowerCase().includes(value.toLowerCase()),
			);
			setSuggestions(filteredSuggestions);
			setIsDropdownVisible(true);
		} else {
			setSuggestions([]);
			setIsDropdownVisible(false);
		}

		if (value.trim() === " ") {
			setIsSpaceInvalid(true);
		} else {
			setIsSpaceInvalid(false);
		}
	};
	// Handle selection of a suggestion
	const handleSuggestionClick = (suggestion: string) => {
		if (!formData.propertyFeatures.includes(suggestion)) {
			setFormData((prev) => ({
				...prev,
				propertyFeatures: [...prev.propertyFeatures, suggestion],
			}));
		}
		setNewFeature(""); // Clear the input
		setSuggestions([]);
		setIsDropdownVisible(false);
	};

	// Handle removing a feature
	const handleRemoveFeature = (feature: string) => {
		setFormData((prev) => ({
			...prev,
			propertyFeatures: prev.propertyFeatures.filter(
				(item) => item !== feature,
			),
		}));
	};

	const HandleWeights = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDirty(true);
		const { name, value } = e.target;

		// Always update the raw input
		setWeights((prev) => ({
			...prev,
			[name]: value,
		}));

		// Validation on-the-fly (optional)
		const parsed = parseFloat(value);
		if (value !== "" && (isNaN(parsed) || parsed < 0.1 || parsed > 10)) {
			setWeightErrors((prev) => ({
				...prev,
				[name]: "Weight must be between 0.1 and 10",
			}));
		} else {
			setWeightErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	return (
		<>
			<div className="flex h-[90vh] justify-center">
				{/* Left Side: Form Inputs */}
				<div
					className="h-[90vh] overflow-x-scroll bg-[#222b30] p-8"
					style={{ width: `calc(${wLeft / 100} * 100vw)` }}
				>
					<div className="flex items-center justify-between">
						<Image
							src="/images/house.png"
							alt="House"
							width={50}
							height={50}
							className="aspect-auto w-1/2"
						/>
						<Title
							text="Your Ideal Home"
							level={1}
							className="mb-6 text-4xl font-bold text-[#aabfc6]"
						/>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Property Type */}
						<div>
							<Slider
								min={0}
								max={10}
								value={parseFloat(weights.propertyTypeWeight)}
								tooltip="Adjust how important the property type is for you"
								onChange_={HandleWeights}
								name="propertyTypeWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Property Type
								</label>
								<select
									id="propertyType"
									name="propertyType"
									value={formData.propertyType}
									onChange={handleChange}
									className="w-full rounded-lg border bg-[#444d56] p-4 text-[#aabfc6]"
								>
									<option value="" disabled>
										Select Property Type
									</option>
									<option value="House">House</option>
									<option value="Apartment">Apartment</option>
									<option value="Condo">Condo</option>
									<option value="Villa">Villa</option>
									<option value="Townhouse">Townhouse</option>
								</select>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.propertyType && (
									<span className="text-sm text-red-500">
										{formErrors.propertyType}
									</span>
								)}
							</div>
						</div>

						{/* Price */}
						<div className="flex flex-col">
							<Slider
								value={parseFloat(weights.priceWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust how important the price is for you"
								name="priceWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Price
								</label>
								<Input
									placeholder="120000"
									name="price"
									type="text"
									value={
										!Number.isNaN(formData.price)
											? formData.price.toString()
											: ""
									}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56]"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.price && (
									<span className="text-sm text-red-500">
										{formErrors.price}
									</span>
								)}
							</div>
						</div>

						{/* Location */}
						<div>
							<Slider
								value={parseFloat(weights.locationWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust how important the location is for you"
								name="locationWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Location
								</label>
								<Input
									placeholder="1400 Broadway St New York, NY"
									name="location"
									type="text"
									value={formData.location}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56]"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.location && (
									<span className="text-sm text-red-500">
										{formErrors.location}
									</span>
								)}
							</div>
						</div>

						{/* Bedrooms */}
						<div>
							<Slider
								value={parseFloat(weights.bedroomsWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust importance of bedrooms"
								name="bedroomsWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Bedrooms
								</label>
								<Input
									placeholder="3"
									name="bedrooms"
									type="number"
									value={formData.bedrooms.toString()}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56]"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.bedrooms && (
									<span className="text-sm text-red-500">
										{formErrors.bedrooms}
									</span>
								)}
							</div>
						</div>

						{/* Bathrooms */}
						<div>
							<Slider
								value={parseFloat(weights.bathroomsWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust importance of bathrooms"
								name="bathroomsWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Bathrooms
								</label>
								<Input
									placeholder="2"
									name="bathrooms"
									type="number"
									value={formData.bathrooms.toString()}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56] p-4"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.bathrooms && (
									<span className="text-sm text-red-500">
										{formErrors.bathrooms}
									</span>
								)}
							</div>
						</div>

						{/* Square Footage */}
						<div>
							<Slider
								value={parseFloat(weights.squareFootageWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust importance of square footage"
								name="squareFootageWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Square Footage
								</label>
								<Input
									placeholder="1200"
									name="squareFootage"
									type="number"
									value={formData.squareFootage.toString()}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56] p-4"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.squareFootage && (
									<span className="text-sm text-red-500">
										{formErrors.squareFootage}
									</span>
								)}
							</div>
						</div>

						{/* Year Built */}
						<div>
							<Slider
								value={parseFloat(weights.yearBuiltWeight)}
								min={0}
								max={10}
								onChange_={HandleWeights}
								tooltip="Adjust importance of year built"
								name="yearBuiltWeight"
							/>
							<div className="flex h-20 w-full items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Year Built
								</label>
								<Input
									placeholder="1999"
									name="yearBuilt"
									type="number"
									value={formData.yearBuilt.toString()}
									onChange={handleChange}
									className="w-full rounded-lg border border-[#444d56] p-4"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.yearBuilt && (
									<span className="text-sm text-red-500">
										{formErrors.yearBuilt}
									</span>
								)}
							</div>
						</div>

						{/* Property Features */}
						<div>
							<div className="mt-10 mb-2 flex h-20 items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Property Features
								</label>
								<Input
									value={weights.propertyFeaturesWeight}
									onChange={HandleWeights}
									type="text"
									placeholder="Adjust importance of property features"
									className="w-full rounded-lg border border-[#444d56] p-4"
									name="propertyFeaturesWeight"
								/>
							</div>
							<div className="flex h-10 w-[100%] items-center justify-end px-4">
								{formErrors.propertyFeatures && (
									<span className="text-sm text-red-500">
										{formErrors.propertyFeatures}
									</span>
								)}
							</div>
							<textarea
								name="propertyFeatures"
								placeholder="Start searching property features..."
								value={newFeature}
								onChange={handlePropertyFeaturesChange}
								className={`h-32 w-full rounded-lg border p-4 text-[#aabfc6] ${isSpaceInvalid ? "border-red-500" : "border-[#444d56]"}`}
							/>
							{isSpaceInvalid && (
								<span className="text-sm text-red-500">
									Space is not allowed
								</span>
							)}
							{isDropdownVisible && suggestions.length > 0 && (
								<div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-[#444d56] bg-[#222b30]">
									{suggestions.map((suggestion, index) => (
										<div
											key={index}
											className="cursor-pointer p-2 text-[#aabfc6] hover:bg-[#444d56]"
											onClick={() => handleSuggestionClick(suggestion)}
										>
											{suggestion}
										</div>
									))}
								</div>
							)}
							<div className="mt-4 flex flex-wrap gap-2">
								{formData.propertyFeatures.map((feature, index) => (
									<div
										key={index}
										className="flex items-center space-x-2 rounded-full bg-[#444d56] px-4 py-2"
									>
										<span className="text-[#aabfc6]">{feature}</span>
										<button
											type="button"
											className="text-red-500"
											onClick={() => handleRemoveFeature(feature)}
										>
											✖
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Description */}
						<div>
							<div className="mt-10 mb-2 flex h-20 items-center justify-between rounded-md border border-gray-400 bg-[#1c242c] px-4">
								<label className="text-md w-full font-medium text-gray-400">
									Description
								</label>
							</div>
							<textarea
								placeholder="optional"
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="h-32 w-full rounded-lg border border-[#444d56] p-4 text-[#aabfc6]"
							/>
						</div>

						{/* Submit */}
						<div className="flex justify-center">
							<button
								type="submit"
								className="mt-4 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-blue-700"
							>
								Submit Listing
							</button>
						</div>
					</form>
				</div>

				{/* Draggable Divider */}
				<div
					className="w-[2px] cursor-ew-resize bg-gray-50"
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
				/>

				{/* Right Side: Listing Card */}
				{hasLink && (
					<Card
						title={listing.title || "No title available."}
						description={listing.description || ""}
						imageUrl={listing.imageUrl || ""}
						className="h-full overflow-x-scroll rounded-lg bg-[#222b30] shadow-lg"
						style={{ width: `calc(${1 - wLeft / 100} * 100vw)` }}
					>
						<div className="p-6 text-[#aabfc6]">
							<h3 className="text-2xl font-bold">{listing.title}</h3>
							<p className="mt-2 text-sm">
								{listing.description || "No description available."}
							</p>
							<div className="mt-4 space-y-2 text-sm">
								<p>
									<strong>Space:</strong> {listing.squareFootage} sq ft
								</p>
								<p>
									<strong>Location:</strong> {listing.location}
								</p>
								<p>
									<strong>Price:</strong> ${listing.price.toLocaleString()}
								</p>
								<p>
									<strong>Year Built:</strong> {listing.yearBuilt}
								</p>
								<p>
									<strong>Bedrooms:</strong> {listing.bedrooms}
								</p>
								<p>
									<strong>Bathrooms:</strong> {listing.bathrooms}
								</p>
								<div>
									<strong>Property Features:</strong>
									<ul className="mt-2 space-y-1">
										{listing.propertyFeatures?.length > 0 ? (
											listing.propertyFeatures.map((feature, i) => (
												<li key={i}>{feature}</li>
											))
										) : (
											<p>No features listed.</p>
										)}
									</ul>
								</div>
							</div>
						</div>
					</Card>
				)}
				{!hasLink && (
					<div
						className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-[#222b30] shadow-lg"
						style={{ width: `calc(${1 - wLeft / 100} * 100vw)` }}
					>
						<label className="mb-5 text-[#aabfc6]">Enter a URL</label>
						<Input
							className="mt-2 rounded border border-[#444d56] bg-[#222b30] p-2 text-white"
							placeholder="Enter a URL"
							type="text"
							name="url"
							value={propertyUrl}
							onChange={(e) => handlePropertyUrlInput(e)}
						/>

						{propertyUrlError && (
							<p className="mt-1 text-sm text-red-500">{propertyUrlError}</p>
						)}

						<Button
							label="Submit"
							onClick={() => onInputFinished()}
							className="m-5 rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-blue-700"
						/>
					</div>
				)}
			</div>
		</>
	);
}
