import Link from "next/link";

export default function Footer() {
	return (
		<div className="flex w-full flex-col items-center justify-center bg-[#11171a] p-4 text-[#aabfc6]">
			<div className="text-1xl font-bold">
				Images from{" "}
				<Link
					href="https://www.vecteezy.com"
					target="_blank"
					className="text-blue-600 hover:underline"
				>
					vecteezy.com
				</Link>
			</div>

			<div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 text-center md:grid-cols-2 md:text-left lg:grid-cols-3">
				{/* Brand Title */}
				<div className="text-1xl font-bold">House Nest AI</div>

				{/* Social Links */}
				<div className="flex flex-col items-center space-y-2 md:items-start">
					<Link
						href="https://www.youtube.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						YouTube
					</Link>
					<Link
						href="https://www.x.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						X (Twitter)
					</Link>
					<Link
						href="https://www.linkedin.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						LinkedIn
					</Link>
					<Link
						href="https://www.instagram.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						Instagram
					</Link>
					<Link
						href="https://www.facebook.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						Facebook
					</Link>
					<Link
						href="https://www.tiktok.com"
						target="_blank"
						className="hover:text-[#4d7298]"
					>
						TikTok
					</Link>
				</div>

				{/* Legal Links */}
				<div className="flex flex-col items-center space-y-2 md:items-start">
					<Link href="/privacy" className="hover:text-[#4d7298]">
						Privacy Policy
					</Link>
					<Link href="/terms" className="hover:text-[#4d7298]">
						Terms of Use
					</Link>
					<Link href="/contact" className="hover:text-[#4d7298]">
						Contact
					</Link>
				</div>
			</div>
		</div>
	);
}
