import { useEffect, useState } from "react";
import { listenToInitialConnectedUsers, listenToUserConnected, listenToUserDisconnected, stopAllListeners } from "@/lib/socket";

export function useConnectedUsers() {
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  useEffect(() => {
    listenToInitialConnectedUsers(setConnectedUsers);
  
    listenToUserConnected((username) => {
        if (!username) return;
        setConnectedUsers((prev) => (prev.includes(username) ? prev : [...prev, username]));
    });
      
    listenToUserDisconnected((username) => {
        if (!username) return;
        setConnectedUsers((prev) => prev.filter((u) => u !== username));
    });
  
    return () => {
      stopAllListeners();
    };
  }, []);

  return { connectedUsers };
}