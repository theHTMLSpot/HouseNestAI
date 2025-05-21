import { Listing } from "@/types/UserProps";

export const capitalizeUtil = (s: string): string =>
	s.charAt(0).toUpperCase() + s.slice(1);

export function validateFieldUtil(
	name: string,
	value: string | number | Array<string | number>,
): string {
	if (
		["price", "bedrooms", "bathrooms", "squareFootage", "yearBuilt"].includes(
			name,
		) ||
		name.includes("Weight")
	) {
		const numValue =
			typeof value === "string" ? parseFloat(value) : (value as number);
		if (isNaN(numValue) || (numValue <= 0 && !name.includes("Weight"))) {
			return `${capitalizeUtil(name)} must be a valid positive number.`;
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
		return `${capitalizeUtil(name)} is required.`;
	}

	return "";
}

export function validateFormUtil(data: {
	[key: string]: string | number | Array<string | number>;
}) {
	const errors: { [key: string]: string } = {};
	Object.entries(data).forEach(([key, value]) => {
		const error = validateFieldUtil(key, value);
		if (error) errors[key] = error;
	});
	return errors;
}

export const handleChangeUtil = (
	e: React.ChangeEvent<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>,
	setFormData: React.Dispatch<React.SetStateAction<Listing>>,
	setFormErrors: React.Dispatch<
		React.SetStateAction<{
			propertyType: string;
			price: string;
			location: string;
			bedrooms: string;
			bathrooms: string;
			squareFootage: string;
			yearBuilt: string;
			propertyFeatures: string;
			description: string;
		}>
	>,
	setDirty: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	setDirty(true);
	const { name, value } = e.target;

	setFormData((prev) => ({
		...prev,
		[name]: value,
	}));

	const errorMsg = validateFieldUtil(name, value);
	if (errorMsg === "") return;

	setFormErrors((prev) => ({
		...prev,
		[name]: errorMsg,
	}));
};

export const handleSubmitUtil = (
	e: React.FormEvent,
	formData: Listing,
	weights: Record<string, string>,
	weightErrors: Record<string, string>,
	setWeightErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setFormData: React.Dispatch<React.SetStateAction<Listing>>,
	setWeights: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
	setDirty: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	e.preventDefault();

	const formErrors_ = validateFormUtil(
		formData as unknown as {
			[key: string]: string | number;
		},
	);
	const weightErrors_ = validateFormUtil(weights);

	setFormErrors((prev) => ({
		...prev,
		...formErrors_,
	}));

	setWeightErrors((prev) => ({
		...prev,
		...weightErrors_,
	}));

	const hasErrors =
		Object.values(formErrors_).some((err) => err !== "") ||
		Object.values(weightErrors_).some((err) => err !== "");

	if (hasErrors) {
		const firstError =
			Object.values(formErrors_).find((err) => err !== "") ||
			Object.values(weightErrors_).find((err) => err !== "");
		alert(firstError);
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

	setWeights({});
	setCurrentStep(2);
	setDirty(false);
};

export const handleMouseDownUtil = (
	setScaling: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	setScaling(true);
};

export const handleMouseUpUtil = (
	setScaling: React.Dispatch<React.SetStateAction<boolean>>,
	initialMouseXRef: React.MutableRefObject<number | null>,
) => {
	setScaling(false);
	initialMouseXRef.current = null;
};

export const onInputFinishedUtil = (
	propertyUrl: string,
	setPropertyUrl: React.Dispatch<React.SetStateAction<string>>,
	setPropertyUrlError: React.Dispatch<React.SetStateAction<string>>,
	setHasLink: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	try {
		new URL(propertyUrl);
		setPropertyUrlError("");
		setHasLink(true);
	} catch {
		setPropertyUrlError("Please enter a valid URL");
		setHasLink(false);
	}
};

export const handlePropertyUrlInputUtil = (
	e: React.ChangeEvent<HTMLInputElement>,
	setDirty: React.Dispatch<React.SetStateAction<boolean>>,
	setPropertyUrl: React.Dispatch<React.SetStateAction<string>>,
	setPropertyUrlError: React.Dispatch<React.SetStateAction<string>>,
	propertyUrl: string,
	setHasLink: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	setDirty(true);
	const value = e.target.value;
	console.log("handlePropertyUrlInputUtil called with:", value);

	if (value.includes("\n")) {
		onInputFinishedUtil(
			propertyUrl,
			setPropertyUrl,
			setPropertyUrlError,
			setHasLink,
		);
	}

	try {
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
	}
};

export const handlePropertyFeaturesChangeUtil = (
	e: React.ChangeEvent<HTMLTextAreaElement>,
	setNewFeature: React.Dispatch<React.SetStateAction<string>>,
	setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
	setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setIsSpaceInvalid: React.Dispatch<React.SetStateAction<boolean>>,
	propertyFeaturesSuggestions: string[],
) => {
	const { value } = e.target;
	setNewFeature(value);

	// Filter suggestions based on the input
	if (value.trim().length > 0) {
		const filteredSuggestions = propertyFeaturesSuggestions.filter((feature) =>
			feature.toLowerCase().includes(value.toLowerCase()),
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

export const handleSuggestionClickUtil = (
	suggestion: string,
	formData: Listing,
	setFormData: React.Dispatch<React.SetStateAction<Listing>>,
	setNewFeature: React.Dispatch<React.SetStateAction<string>>,
	setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
	setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	if (
		formData.propertyFeatures &&
		!formData.propertyFeatures.includes(suggestion)
	) {
		setFormData((prev) => ({
			...prev,
			propertyFeatures: [...prev.propertyFeatures, suggestion],
		}));
	}
	setNewFeature(""); // Clear the input
	setSuggestions([]);
	setIsDropdownVisible(false);
};

export const handleRemoveFeatureUtil = (
	feature: string,
	setFormData: React.Dispatch<React.SetStateAction<Listing>>,
) => {
	setFormData((prev) => ({
		...prev,
		propertyFeatures: prev.propertyFeatures.filter((item) => item !== feature),
	}));
};

export const handleWeightsUtil = (
	e: React.ChangeEvent<HTMLInputElement>,
	setDirty: React.Dispatch<React.SetStateAction<boolean>>,
	setWeights: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setWeightErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
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
