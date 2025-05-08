import { socket } from "@/config/socket";
import { Message } from "@/types/chat";

export const listenToMessages = (callback: (msg: Message) => void) => {
  socket.on("message", callback);
};

export const stopListeningToMessages = () => {
  socket.off("message");
};

export const listenToTyping = (callback: (username: string) => void) => {
  socket.on("typing", callback);
};

export const stopListeningToTyping = () => {
  socket.off("typing");
};

export const listenToInitialConnectedUsers = (callback: (users: string[]) => void) => {
  socket.on("connected_users", callback);
};

export const stopListeningToInitialConnectedUsers = () => {
  socket.off("connected_users");
};

export const listenToUserConnected = (callback: (username: string) => void) => {
  socket.on("user_connected", callback);
};

export const stopListeningToUserConnected = () => {
  socket.off("user_connected");
};

export const listenToUserDisconnected = (callback: (username: string) => void) => {
  socket.on("user_disconnected", callback);
};

export const stopListeningToUserDisconnected = () => {
  socket.off("user_disconnected");
};

export const stopAllListeners = () => {
  stopListeningToMessages();
  stopListeningToTyping();
  stopListeningToInitialConnectedUsers();
  stopListeningToUserConnected();
  stopListeningToUserDisconnected();
};
