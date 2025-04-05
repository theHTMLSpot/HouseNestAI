"use client";

import FeatureCard from "./featureCard";

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-15 p-4 sm:grid-cols-3 sm:gap-10 md:gap-7">
      <FeatureCard
        title="Easy Use"
        description="Find your listing in seconds, not hours"
      />
      <FeatureCard
        title="Compare Your Way"
        description="We make it easy to compare listings in your own way"
      />
      <FeatureCard
        title="AI Powered"
        description="Get the best listing for you with our AI powered system"
      />
    </div>
  );
}
