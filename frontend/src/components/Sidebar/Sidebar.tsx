"use client";

import {
  Collapsible,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import SidebarToggle from "@/components/Sidebar/SidebarToggle";
import UserListSection from "@/components/Sidebar/UserListSection";
import SidebarHeader from "./SidebarHeader";
import { SidebarProps } from "@/types/sidebar";

export default function Sidebar({
  username,
  email,
  connectedUsers,
  disconnectedUsers,
  onLogout,
  totalUsers
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`transition-all duration-300 ease-in-out bg-white border-l h-screen flex flex-col justify-between ${
        isOpen ? "w-72" : "w-16"
      } relative`}
    >

      <SidebarToggle isOpen={isOpen} />

      {isOpen && 
         <SidebarHeader username={username} email={email} />
      }

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {isOpen ? (
          <>
            <UserListSection
              title="Connectés"
              users={connectedUsers}
              color="bg-green-500"
              bg="bg-emerald-50"
              text="text-gray-800"
              total= { totalUsers }
            />

            <UserListSection
              title="Hors ligne"
              users={disconnectedUsers}
              color="bg-neutral-400"
              bg="bg-neutral-100"
              text="text-gray-500"
              total= { totalUsers }
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-sm text-gray-700 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span>{connectedUsers.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <span>{disconnectedUsers.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex justify-center">
        <Button
          onClick={onLogout}
          className={`transition-all duration-300 bg-black text-white hover:bg-gray-800 ${
            isOpen ? "w-full" : "w-10 h-10 p-0"
          }`}
        >
          <LogOut className={isOpen ? "mr-2 h-4 w-4" : "h-4 w-4"} />
          {isOpen && "Se déconnecter"}
        </Button>
      </div>
    </Collapsible>
  );
}
