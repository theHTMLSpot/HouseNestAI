"use client";
import LandingPage from "@/pages/landingPage";

export default function Home() {
  const obj = {
    comp1: "Small modern kitchen with island",
    comp2: "Large rustic kitchen",
    ideal: "Modern kitchen with lots of space",
  };

  const encoded = encodeURIComponent(JSON.stringify(obj));
  console.log(`/api/compare_text/${encoded}`);
  return <LandingPage />;
}
