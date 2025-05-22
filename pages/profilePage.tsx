import { Button, Card, Title } from "@/components/components";
import { UserProps } from "@/types/UserProps";
import Link from "next/link";

export default function ProfilePage() {
	const fakeUserData: UserProps = {
		firstName: "John",
		lastName: "Doe",
		email: "email@email.com",
		cryptPassword: "hashedpassword",
		cardNumber: "1234567812345678",
		expirationDate: "12/25",
		cvv: "123",
		JWT: "fakeJWT",
	};

	const handleLogout = () => {
		console.log("User logged out");
		fakeUserData.JWT = undefined;
	};

	const checkLoggedIn = () => {
		return fakeUserData ? true : false;
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-between bg-[#11171a] p-30 text-gray-100 lg:flex-row">
			<Card
				title="Profile"
				titleLevel={1}
				description={
					checkLoggedIn()
						? `Welcome, ${fakeUserData.firstName} ${fakeUserData.lastName}`
						: "Please Login to view your profile"
				}
				descriptionLevel={2}
				className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg"
			>
				<>
					{checkLoggedIn() ? (
						<>
							<div className="m-3 flex w-full items-center justify-between rounded-md border-1 border-gray-300 p-3">
								<Title level={5} text={`Email: ${fakeUserData.email}`} />
								<Button
									label="Edit"
									className="text-gray-600 transition-all duration-75 ease-in-out hover:scale-[0.95] hover:text-gray-500"
									onClick={() => console.log("Edit profile")}
								/>
							</div>
							<div className="m-3 flex w-full items-center justify-between rounded-md border-1 border-gray-300 p-3">
								<p>
									Password:{" "}
									{fakeUserData.cryptPassword
										.split("")
										.map(() => "*")
										.join("")}
								</p>
								<Button
									label="Edit"
									className="text-gray-600 transition-all duration-75 ease-in-out hover:scale-[0.95] hover:text-gray-500"
									onClick={() => console.log("Edit profile")}
								/>
							</div>
							<div className="m-3 flex w-full items-center justify-between rounded-md border-1 border-gray-300 p-3">
								<p>
									Card Number: {"*".repeat(fakeUserData.cardNumber.length - 4)}
									{fakeUserData.cardNumber.slice(-4)}
								</p>

								<Button
									label="Edit"
									className="text-gray-600 transition-all duration-75 ease-in-out hover:scale-[0.95] hover:text-gray-500"
									onClick={() => console.log("Edit profile")}
								/>
							</div>
							<div className="flex items-center justify-center">
								<Button
									label="Logout"
									onClick={handleLogout}
									className="hover:scale-1.05 m-3 w-30 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
								/>
								<Link
									href="compare"
									className="hover:scale-1.05 w-30 rounded-lg border border-gray-300 p-2 text-center transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-gray-300 hover:text-[#0b0f11] hover:shadow-lg"
								>
									Compare
								</Link>
							</div>
						</>
					) : (
						<Link
							href="/login"
							className="hover:scale-1.05 m-3 w-30 rounded-lg bg-[#4d7298] p-2 text-white transition-all duration-300 ease-in-out hover:translate-y-[-0.1rem] hover:bg-[#3b4d6e] hover:shadow-lg"
						>
							Login
						</Link>
					)}
				</>
			</Card>
		</div>
	);
}
