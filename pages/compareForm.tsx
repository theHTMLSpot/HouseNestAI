"use client";

import React, { useEffect, useState, useRef } from "react";
import { Title, Input } from "@/components/ui/components";
import { propertyFeatures as propertyFeaturesSuggestions } from "@/utils/propertyFeatues";
import { Card, Button } from "@/components/ui/components";
import { Listing } from "@/types/UserProps";

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

	// Track mouseX globallyß
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMouseX(event.clientX);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const initialMouseXRef = useRef<number | null>(null);

	// Handle scaling logic
	useEffect(() => {
		let animationFrameId: number;

		const update = () => {
			if (scaling && initialMouseXRef.current !== null) {
				const deltaX = mouseX - initialMouseXRef.current;

				setWLeft((prev) => {
					const newWidth = prev + deltaX * 0.1; // tweak sensitivity
					if (newWidth > 35 && newWidth < 75)
						return Math.min(100, Math.max(0, newWidth));
					return prev;
				});
				initialMouseXRef.current = mouseX;
			}
			animationFrameId = requestAnimationFrame(update);
		};

		if (scaling) {
			animationFrameId = requestAnimationFrame(update);
		}

		return () => cancelAnimationFrame(animationFrameId);
	}, [scaling, mouseX]);

	// Start scaling
	const handleMouseDown = () => {
		setScaling(true);
		initialMouseXRef.current = mouseX;
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
		imageUrl: "/images/villa.jpg",
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
					<Title
						text="Your Ideal Home"
						level={1}
						className="mb-6 text-4xl font-bold text-[#aabfc6]"
					/>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Property Type (Dropdown) */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="Proerty Type"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Property Type
								</label>
								<Input
									name="weight"
									type="text"
									value={weights.propertyTypeWeight}
									placeholder="Weight"
									onChange={(e) => {
										HandleWeights(e);
									}}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<select
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
							{formErrors.propertyType && (
								<span className="text-sm text-red-500">
									{formErrors.propertyType}
								</span>
							)}
						</div>

						{/* Price */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="price"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Price
								</label>
								<Input
									name="weight"
									type="text"
									value={
										Number.isNaN(weights.priceWeight)
											? ""
											: weights.priceWeight.toString()
									}
									placeholder="Weight"
									onChange={HandleWeights}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>

							<Input
								placeholder="120000"
								name="price"
								type="text"
								value={
									!Number.isNaN(formData.price) ? formData.price.toString() : ""
								}
								onChange={handleChange}
								error={formErrors.price}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Location */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="location"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Weight
								</label>
								<Input
									name="weight"
									type="text"
									value={
										Number.isNaN(weights.locationWeight)
											? ""
											: weights.locationWeight.toString()
									}
									placeholder="Weight"
									onChange={HandleWeights}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<Input
								placeholder="1400 Broadway St New York, NY"
								name="location"
								type="text"
								value={formData.location}
								onChange={handleChange}
								error={formErrors.location}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Bedrooms */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="location"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Bedrooms
								</label>
								<Input
									name="weight"
									type="text"
									value={
										Number.isNaN(weights.bedroomsWeight)
											? ""
											: weights.bedroomsWeight.toString()
									}
									placeholder="Weight"
									onChange={HandleWeights}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<Input
								placeholder="3"
								name="bedrooms"
								type="number"
								value={formData.bedrooms.toString()}
								onChange={handleChange}
								error={formErrors.bedrooms}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Bathrooms */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="weight"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Bathrooms
								</label>
								<Input
									name="weight"
									type="text"
									value={weights.bathroomsWeight.toString()}
									placeholder="Weight"
									onChange={(e) => {
										HandleWeights(e);
									}}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>

							<Input
								placeholder="2"
								name="bathrooms"
								type="number"
								value={formData.bathrooms.toString()}
								onChange={handleChange}
								error={formErrors.bathrooms}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Square Footage */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="weight"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Square Footage
								</label>
								<Input
									name="weight"
									type="text"
									value={weights.squareFootageWeight.toString()}
									placeholder="Weight"
									onChange={(e) => {
										HandleWeights(e);
									}}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<Input
								placeholder="1200"
								name="squareFootage"
								type="number"
								value={formData.squareFootage.toString()}
								onChange={handleChange}
								error={formErrors.squareFootage}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Year Built */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="Proerty Type"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Year Built
								</label>
								<Input
									name="weight"
									type="text"
									value={weights.yearBuiltWeight.toString()}
									placeholder="Weight"
									onChange={(e) => {
										HandleWeights(e);
									}}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<Input
								placeholder="1999"
								name="yearBuilt"
								type="number"
								value={formData.yearBuilt.toString()}
								onChange={handleChange}
								error={formErrors.yearBuilt}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Property Features */}
						<div>
							<div className="flex h-20 w-[100%] items-center-safe justify-between">
								<label
									htmlFor="weight"
									className="w-20 text-xl font-medium text-gray-600"
								>
									Property features
								</label>
								<Input
									name="weight"
									type="text"
									value={weights.propertyFeaturesWeight.toString()}
									placeholder="Weight"
									onChange={(e) => {
										HandleWeights(e);
									}}
									className="h-[100%] flex-1 rounded-lg border border-[#444d56] p-2 text-sm"
								/>
							</div>
							<label htmlFor="propertyFeatures">Property Features</label>
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

							{/* Suggestions Dropdown */}
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
						</div>

						{/* Selected Features */}
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

						{/* Description */}
						<div>
							<label htmlFor="description">Description</label>
							<textarea
								placeholder="optional"
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="w-full rounded-lg border p-4 text-[#aabfc6]"
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center">
							<button
								type="submit"
								className="mt-4 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-blue-700"
								onClick={(e) => {
									handleSubmit(e);
								}}
							>
								Submit Listing
							</button>
						</div>
					</form>
				</div>

				<div
					className="w-[2px] cursor-ew-resize bg-gray-50"
					style={{ height: "100%" }}
					onMouseDown={() => {
						handleMouseDown();
					}}
					onMouseUp={() => {
						handleMouseUp();
					}}
				/>
				{/* right side */}
				{hasLink ? (
					<Card
						title={listing.title ? listing.title : "No title available."}
						description={listing.description || ""}
						imageUrl={listing.imageUrl || ""}
						className="w-1/2 overflow-hidden rounded-lg bg-[#222b30] shadow-lg"
						style={{ width: `calc(${1 - wLeft / 100} * 100vw)` }}
					>
						{/* Card Content */}
						<div className="p-6">
							{/* Title */}
							<h3 className="text-2xl font-bold text-[#aabfc6]">
								{listing.title}
							</h3>

							{/* Description */}
							<p className="mt-2 text-sm text-[#aabfc6]">
								{listing.description || "No description available."}
							</p>

							{/* Property Details */}
							<div className="mt-4 space-y-2 text-sm text-[#aabfc6]">
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

								{/* Property Features */}
								<div>
									<strong>Property Features:</strong>
									<ul className="mt-2 space-y-1">
										{listing.propertyFeatures.length > 0 ? (
											listing.propertyFeatures.map((feature, index) => (
												<li key={index} className="text-[#aabfc6]">
													{feature}
												</li>
											))
										) : (
											<p>No features listed.</p>
										)}
									</ul>
								</div>
							</div>
						</div>
					</Card>
				) : (
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
