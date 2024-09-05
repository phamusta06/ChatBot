import React, { createContext,  useContext,  useState } from "react";
import { ConversationType } from "../types/types";

type User = {
  id: string;
  name: string;
  conversations?: ConversationType[];
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);


export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
 
 

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    conversations: [],
  });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

 