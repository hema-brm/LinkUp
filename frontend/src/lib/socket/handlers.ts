import { socket } from "@/config/socket";

export const sendMessage = (content: string) => {
  socket.emit("message", content);
};

export const sendTyping = () => {
  socket.emit("typing");
};
