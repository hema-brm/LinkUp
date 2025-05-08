export interface SidebarProps {
  username: string;
  email: string;
  connectedUsers: string[];
  disconnectedUsers: string[];
  totalUsers: number;
  onLogout: () => void;
}

export interface SidebarHeaderProps {
  username: string;
  email: string;
}

export interface SidebarToggleProps {
  isOpen: boolean;
}

export interface UserListSectionProps {
  title: string;
  users: string[];
  color: string;
  bg: string;
  text: string;
  total: number;
}