"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatInputProps } from "@/types/chat";
import { sendTyping } from "@/lib/socket";

export default function ChatInput({ onSend, onColorChange, typingUsers, initialColor }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div>
      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-500 italic px-4 pb-4">
          {typingUsers.length === 1
            ? `${typingUsers[0]} est en train d’écrire...`
            : "Plusieurs personnes sont en train d’écrire..."}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-white/30 flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            onColorChange(e.target.value);
          }}
          className="w-10 h-10 rounded-full border cursor-pointer"
          title="Choisir une couleur"
        />

        <Input
          type="text"
          placeholder="Écrivez un message…"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sendTyping()
          }}
          className="flex-1"
          
        />

        <Button type="submit" className="px-3">
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
