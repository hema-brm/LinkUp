import { useEffect, useRef, useState } from "react";

export function useChatScroll(messages: unknown[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 50;

    if (isNearBottom) scrollToBottom();
    else setShowScrollButton(true);
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setShowScrollButton(!isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return { containerRef, endRef, showScrollButton, scrollToBottom };
}
