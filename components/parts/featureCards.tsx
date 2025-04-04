import FeatureCard from "./featureCard";

export default function FeatureCards() {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            <FeatureCard
                title="Easy Use"
                description="Find your listing in seconds, not hours"
                
                onClick={() => alert("Feature 1 clicked")}
                className="bg-white text-black"
            />
            <FeatureCard
                title="Compare Your Way"
                description="We make it easy to compare listings in your own way"
            
                onClick={() => alert("Feature 2 clicked")}
                className="bg-white text-black"
            />
            <FeatureCard
                title="AI Powered"
                description="Get the best listing for you with our AI powered system"
          
                onClick={() => alert("Feature 3 clicked")}
                className="bg-white text-black"
            />
        </div>
    );
}