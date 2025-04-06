"use client";

import { Card } from "../ui/components";

export default function FeatureCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card
      title={title}
      description={description}
      titleLevel={3}
      descriptionLevel={4}
      titleClassName="text-[#aabfc6] font-bold"
      descriptionClassName="text-[#7f8e92]"
      className={`flex flex-col items-center justify-center rounded-lg border p-8 shadow-md ${className} h-auto w-full max-w-xs bg-[#11171a] text-gray-100 transition-transform duration-300 ease-in-out hover:translate-y-[-0.75rem] hover:scale-[1.05] hover:shadow-lg`}
    />
  );
}
