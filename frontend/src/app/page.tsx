"use client";

import { 
  useConnectedUsers,
  useCurrentUser,
  useTypingUsers,
  useChatSocket,
  useAllUsers
 } from "@/hooks";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ChatInput from "@/components/Chat/ChatInput";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatBox from "@/components/Chat/ChatBox";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/lib/socket";
import { apiClient } from "@/config/axios";
import { toast } from "sonner";

export default function ChatPage() {
  const router = useRouter();

  const { currentUser, loading: loadingUser } = useCurrentUser();

  const { users: allUsers, loading: loadingAllUsers } = useAllUsers();
  const { connectedUsers } = useConnectedUsers();

  const { messages, loading: loadingMessages } = useChatSocket();
  const typingUsers = useTypingUsers(currentUser?.username ?? "");

  const usersWithoutCurrentUser = connectedUsers.filter(
    (username) => username !== currentUser?.username
  );

  const disconnectedUsers = allUsers
    .map((u) => u.username)
    .filter((username) => username !== currentUser?.username)
    .filter((username) => !connectedUsers.includes(username));

    
  if (loadingMessages || loadingUser || loadingAllUsers || !currentUser) {
    return <><Progress /></>;
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    toast.success("Déconnecté", {
      description: "Vous avez été déconnecté avec succès.",
    });
    router.push("/login");
  };

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  const handleColorChange = async (newColor: string) => {
    try {
      await apiClient.patch("/users/color", { color: newColor });
    } catch (error) {
      console.error('Erreur mise à jour couleur : ', error);
      toast.error("Erreur lors de la mise à jour de la couleur");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <main className="flex-1 flex flex-col">
          <div className="px-6 pt-6 pb-4 border-b border-white/30">
            <h2 className="text-xl font-semibold text-gray-800">Salon de discussion</h2>
          </div>

          <ChatBox
            messages={messages}
            currentUser={currentUser}
          />

          <ChatInput
            onSend={handleSendMessage}
            typingUsers={typingUsers}
            initialColor={currentUser.color || '#ccc'}
            onColorChange={handleColorChange}
          />
        </main>

        <Sidebar
          username={currentUser.username}
          email={currentUser.email}
          connectedUsers={usersWithoutCurrentUser}
          disconnectedUsers={disconnectedUsers}
          onLogout={handleLogout}
          totalUsers={allUsers.length}
        />
      </div>
    </ProtectedRoute>
  );
}
