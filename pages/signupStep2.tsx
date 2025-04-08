"use client";

import { useState } from "react";
import { Card, Input } from "@/components/ui/components";

export default function CardDetailsPage() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { cardNumber: "", expirationDate: "", cvv: "" };
    let isValid = true;

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate)) {
      newErrors.expirationDate = "Please enter a valid expiration date (MM/YY)";
      isValid = false;
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
      isValid = false;
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission (e.g., call an API or update state)
      console.log("Card details submitted successfully!");
    }
  };

  return (
    <Card
      title="Card Details"
      titleLevel={2}
      titleClassName="mb-6 text-center text-3xl font-bold text-[#aabfc6]"
      className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg"
    >
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Card Number Input */}
        <div className="mb-4">
          <Input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Enter your card number"
            className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
            required
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiration Date Input */}
        <div className="mb-4">
          <Input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
            required
          />
          {errors.expirationDate && (
            <p className="text-sm text-red-500">{errors.expirationDate}</p>
          )}
        </div>

        {/* CVV Input */}
        <div className="mb-6">
          <Input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="Enter CVV"
            className="w-full rounded-md border border-[#444d56] bg-[#222b30] p-3 text-[#aabfc6] transition focus:ring-2 focus:ring-[#aabfc6] focus:outline-none"
            required
          />
          {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-[#aabfc6] py-3 font-semibold text-[#11171a] transition hover:bg-[#8e9aaf]"
        >
          Submit Card Details
        </button>
      </form>
    </Card>
  );
}
