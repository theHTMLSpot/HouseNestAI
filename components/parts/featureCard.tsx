"use client";

import { Card } from "../ui/components";

export default function FeatureCard({
  title,
  description,
  imageUrl,
  onClick,
  className,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Card
      title={title}
      description={description}
      imageUrl={imageUrl}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-md ${className}`}
    />
  );
}