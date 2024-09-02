import React, { createContext,  useContext,  useState } from "react";

export const UserContext = createContext<unknown>(null);


export const useUserContext=() => useContext(UserContext)  

 
 

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [user, setUser] = useState<{
    id: string;
    name: string;
    conversations?: [];
  }>({
    id: "",
    name: "",
    conversations: [],
  });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

 