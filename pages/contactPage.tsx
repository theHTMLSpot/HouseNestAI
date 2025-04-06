"use client";

import { useState } from "react";
import { Title, Input } from "@/components/ui/components";

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    queryType: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };

    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email";
    if (!formData.message) errors.message = "Message is required";

    setFormErrors(errors);

    // If no errors, form is ready for submission
    if (Object.values(errors).every((error) => error === "")) {
      alert("Form submitted successfully!");
      // Here you can send formData to your backend
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        queryType: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#11171a] text-gray-100 p-8">
      <div className="max-w-lg mx-auto">
        <Title text="Contact Us" level={1} className="text-4xl font-bold text-[#aabfc6] mb-6" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#222b30] text-[#aabfc6] border border-[#444d56]"
              required
            />
            {formErrors.firstName && <span className="text-red-500 text-sm">{formErrors.firstName}</span>}
          </div>

          <div>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#222b30] text-[#aabfc6] border border-[#444d56]"
              required
            />
            {formErrors.lastName && <span className="text-red-500 text-sm">{formErrors.lastName}</span>}
          </div>

          <div>
            <select
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              className="w-full p-5 pr-12 rounded-md bg-[#222b30] text-[#aabfc6] border border-[#444d56] appearance-none focus:outline-none focus:ring-2 focus:ring-[#aabfc6] transition"
            >
              <option value="">Select Query Type</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
            </select>

            <style jsx>{`
              select {
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath d="M4 6l4 4 4-4z" fill="%23aabfc6"%3E%3C/path%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: right 0.75rem center;
                background-size: 12px;
              }
            `}</style>
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#222b30] text-[#aabfc6] border border-[#444d56]"
              required
            />
            {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#222b30] text-[#aabfc6] border border-[#444d56] h-32"
              required
            />
            {formErrors.message && <span className="text-red-500 text-sm">{formErrors.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#aabfc6] text-[#11171a] rounded-md hover:bg-[#8eafbb] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}