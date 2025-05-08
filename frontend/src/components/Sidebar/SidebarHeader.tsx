"use client";

import { SidebarHeaderProps } from "@/types/sidebar";
  
export default function SidebarHeader({ username, email }: SidebarHeaderProps) {
    return (
        <div className="w-full bg-gray-50 border-b p-6">
        <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
        <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
    );
}
  