"use client";

import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarToggleProps } from "@/types/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function SidebarToggle({ isOpen }: SidebarToggleProps) {
  return (
    <CollapsibleTrigger className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-1 z-10">
      {isOpen 
      ? <ChevronRight size={18} /> 
      : <ChevronLeft size={18} />
      }
    </CollapsibleTrigger>
  );
}
