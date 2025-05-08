import { useEffect, useState } from "react";
import { listenToTyping, stopListeningToTyping } from "@/lib/socket";

export function useTypingUsers(currentUser: string) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const handleTyping = (username: string) => {
      if (username === currentUser) return;

      setTypingUsers((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );

      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== username));
      }, 3000);
    };

    listenToTyping(handleTyping);
    return () => stopListeningToTyping();
  }, [currentUser]);

  return typingUsers;
}
