import Image from "next/image";

export default function TestimonialCard({
	name,
	title,
	image,
	rating,
	date,
	children,
}: {
	name: string;
	title: string;
	image: string;
	rating: number;
	date: string;
	children?: React.ReactNode;
}) {
	const stars = Array.from({ length: 5 }, (_, index) => (
		<span
			key={index}
			className={`text-xl ${index <= rating ? "text-orange-600" : "text-gray-400"}`}
		>
			★
		</span>
	));

	if (!date) date = new Date().toDateString();

	return (
		<div className="h-full w-full max-w-xl rounded-xl border bg-[#11171a] p-6 text-gray-200 shadow-lg">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-1">{stars}</div>
				<Image
					src={image}
					alt={name}
					width={50}
					height={50}
					className="h-12 w-12 rounded-full border object-cover"
				/>
			</div>

			<h1 className="mb-4 text-2xl font-bold">{name}</h1>

			<p className="h-[20%] overflow-clip text-sm leading-relaxed text-gray-300">
				{children}
			</p>

			<div className="mt-6 border-t pt-4 text-sm text-gray-300">
				{name}: {title} · {date}
			</div>
		</div>
	);
}
