"use client";

import React, { useEffect, useState, useRef } from "react";
import { Title, Input } from "@/components/ui/components";
import { propertyFeatures as propertyFeaturesSuggestions } from "@/utils/propertyFeatues";
import { Card, Button } from "@/components/ui/components";
import { Listing } from "@/types/UserProps";

export default function ComparePage() {
	const [hasLink, setHasLink] = useState(false);
	const [propertyUrl, setPropertyUrl] = useState("");
	const [propertyUrlError, setPropertyUrlError] = useState("");

	const [wLeft, setWLeft] = useState<number>(50);

	const [scaling, setScaling] = useState<boolean>(false);

	const [mouseX, setMouseX] = useState(0);

	// Track mouseX globally
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
	const [formData, setFormData] = useState<{
		propertyType: string;
		price: string;
		location: string;
		bedrooms: string;
		bathrooms: string;
		squareFootage: string;
		yearBuilt: string;
		propertyFeatures: string[];
		description: string;
	}>({
		propertyType: "",
		price: "",
		location: "",
		bedrooms: "",
		bathrooms: "",
		squareFootage: "",
		yearBuilt: "",
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

	// Suggestions for property features

	// Handle input change for form fields
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
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const errors = {
			propertyType: "",
			price: "",
			location: "",
			bedrooms: "",
			bathrooms: "",
			squareFootage: "",
			yearBuilt: "",
			propertyFeatures: "",
			description: "",
		};

		// Form validation
		if (!formData.propertyType)
			errors.propertyType = "Property type is required";
		if (!formData.price) errors.price = "Price is required";
		if (!formData.location) errors.location = "Location is required";
		if (!formData.bedrooms) errors.bedrooms = "Number of bedrooms is required";
		if (!formData.bathrooms)
			errors.bathrooms = "Number of bathrooms is required";
		if (!formData.squareFootage)
			errors.squareFootage = "Square footage is required";
		if (!formData.yearBuilt) errors.yearBuilt = "Year built is required";
		if (!formData.propertyFeatures.length)
			errors.propertyFeatures = "At least one property feature is required";
		if (!formData.description) errors.description = "Description is required";

		setFormErrors(errors);

		// If no errors, form is ready for submission
		if (Object.values(errors).every((error) => error === "")) {
			alert("Listing submitted successfully!");
			// Here you can send formData to your backend
			// Reset form after successful submission
			setFormData({
				propertyType: "",
				price: "",
				location: "",
				bedrooms: "",
				bathrooms: "",
				squareFootage: "",
				yearBuilt: "",
				propertyFeatures: [],
				description: "",
			});
		}
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

	return (
		<>
			<div className="flex w-full justify-center">
				{/* Left Side: Form Inputs */}
				<div
					className="bg-[#222b30] p-8"
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
							<Input
								placeholder="Price"
								name="price"
								type="text"
								value={formData.price}
								onChange={handleChange}
								error={formErrors.price}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Location */}
						<div>
							<Input
								placeholder="Location"
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
							<Input
								placeholder="Bedrooms"
								name="bedrooms"
								type="number"
								value={formData.bedrooms}
								onChange={handleChange}
								error={formErrors.bedrooms}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Bathrooms */}
						<div>
							<Input
								placeholder="Bathrooms"
								name="bathrooms"
								type="number"
								value={formData.bathrooms}
								onChange={handleChange}
								error={formErrors.bathrooms}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Square Footage */}
						<div>
							<Input
								placeholder="Square Footage"
								name="squareFootage"
								type="number"
								value={formData.squareFootage}
								onChange={handleChange}
								error={formErrors.squareFootage}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Year Built */}
						<div>
							<Input
								placeholder="Year Built"
								name="yearBuilt"
								type="number"
								value={formData.yearBuilt}
								onChange={handleChange}
								error={formErrors.yearBuilt}
								className="w-full rounded-lg border-1 border-[#444d56] p-4"
							/>
						</div>

						{/* Property Features */}
						<div>
							<textarea
								name="propertyFeatures"
								placeholder="Add property features"
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
							<textarea
								placeholder="Description"
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
							>
								Submit Listing
							</button>
						</div>
					</form>
				</div>

				<div
					className="h-screen w-[2px] cursor-ew-resize bg-gray-50"
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
						title={listing.title}
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
