"use client";
import { pb } from "@/constanst";
import { RecordModel } from "pocketbase";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: RecordModel | null;
  setUser: (user: RecordModel | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recupera o usuário do authStore do PocketBase
    if (pb.authStore.isValid && pb.authStore.model) {
      setUser(pb.authStore.model as RecordModel);
    }
    setIsLoading(false);

    // Escuta mudanças no authStore
    pb.authStore.onChange((token, model) => {
      setUser(model as RecordModel | null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
