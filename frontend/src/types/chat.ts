import { User } from "./user";

export interface Message {
  content: string;
  fromMe: boolean;
  color?: string;
  username: string;
  timestamp: string;
}

export interface ChatBoxProps {
  messages: Message[];
  currentUser: User;
}

export interface ChatInputProps {
    onSend: (message: string) => void;
    typingUsers: string[];
    initialColor: string;
    onColorChange : (newColor: string) => void;
  }