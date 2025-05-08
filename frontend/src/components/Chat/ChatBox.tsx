"use client";

import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { ChatBoxProps } from "@/types/chat";
import { isColorDark } from "@/lib/utils/color";
import { useChatScroll } from "@/hooks";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ChatBox({ messages, currentUser }: ChatBoxProps) {
  const { containerRef, endRef, showScrollButton, scrollToBottom } = useChatScroll(messages);
  
  let lastDate: string | null = null;
  let lastSender: string | null = null;
  let lastTimestamp: number | null = null;

  return (
    <div className="flex-1 overflow-hidden relative">
      <div
        ref={containerRef}
        className="h-full px-6 py-4 space-y-4 overflow-y-auto"
      >
        {messages.map((msg, index) => {
          const isMe = msg.username === currentUser.username;

          const msgDate = new Date(msg.timestamp);
          const dateLabel = format(msgDate, "d MMMM yyyy", { locale: fr });
          
          const showDateSeparator = dateLabel !== lastDate;
          if (showDateSeparator) lastDate = dateLabel;

          const showHeader =
            !lastSender || lastSender !== msg.username ||
            (lastTimestamp && msgDate.getTime() - lastTimestamp > 60000);
          lastSender = msg.username;
          lastTimestamp = msgDate.getTime();

          const time = format(msgDate, "HH:mm");
          const bgColor = msg.color || currentUser.color;
          const textColor = isColorDark(bgColor) ? "text-white" : "text-gray-900";

          return (
            <div key={index} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
              {showDateSeparator && (
                <div className="text-center text-xs text-gray-400 py-2 w-full">
                  {dateLabel}
                </div>
              )}

              {showHeader && (
                <div className="mb-1 text-xs text-gray-600 flex items-center gap-2">
                  {!isMe && <span className="font-semibold">{msg.username}</span>}
                  <span className="text-gray-500 font-normal">{time}</span>
                </div>
              )}

              <div
                className={cn(
                  "max-w-xs px-4 py-2 rounded-xl",
                  "break-words whitespace-pre-wrap",
                  isMe ? "ml-auto" : "mr-auto"
                )}
                style={{
                  backgroundColor: bgColor,
                }}
              >
                <p className={cn("text-sm", textColor)}>{msg.content}</p>
              </div>
            </div>
          );
        })}

        <div ref={endRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute right-6 bottom-6 bg-white shadow-md rounded-full p-2 border hover:bg-gray-100 transition"
          title="Voir les derniers messages"
        >
          <ArrowDown className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
