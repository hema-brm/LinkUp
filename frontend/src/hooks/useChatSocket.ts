import { useEffect, useState } from "react";
import { socket } from "@/config/socket";
import { listenToMessages, stopAllListeners } from "@/lib/socket";
import { Message } from "@/types/chat";
import { apiClient } from "@/config/axios";

export function useChatSocket() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/chat/messages").then((res) => {
      setMessages(res.data);
      setLoading(false);
    });

    socket.auth = {
        token: localStorage.getItem("jwt") || "",
    };

    socket.connect();

    listenToMessages((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      stopAllListeners();
      socket.disconnect();
    };
  }, []);

  return { messages, loading };
}
