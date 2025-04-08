"use client";

import ProfilePage from "@/pages/profilePage";

export default function Profile() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#11171a]">
      <div className="w-full max-w-md rounded-lg bg-[#1b252b] p-8 shadow-lg">
        <ProfilePage />
      </div>
    </div>
  );
}
