import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { logout } from './useAuth';
import { useUserContext } from "../context/userContext";
import { ApiError, ConversationType, MessageType } from "../types/types";

const urlApi: string = import.meta.env.VITE_API_URL;

//new message
export const useNewMessage = () => {
  
  const [data, setData] = useState<ConversationType | null>(null);
 
  const [loading, setLoading] = useState<boolean>(false);

  const handleMessage = async ({ conversationId, content, sender,recipient }: MessageType) => {
    try {
      setLoading(true);

     
      const res = await axios.post(`${urlApi}/new-message`, {
        conversationId,
        content,
        sender,
        recipient,
      },{withCredentials:true});

   
      setData(res.data);
      return res.data;

    } catch (err: unknown) {
      const ApiError = err as ApiError;
      if (ApiError.response?.data.message) {
        toast.error(ApiError.response.data.message);
    } else {
        toast.error("An unexpected error occurred. Please try again later.");
    }
   }
    finally {
    
      setLoading(false);
    }
  };

  return { handleMessage, loading, data };
};


//get conversations
export const useGetConversations=() => {
  const{setUser}=useUserContext()
  const [loading, setLoading] = useState<boolean>(false);
  const getConversations=async () => { 
     setLoading(true);
    try{
      const res = await axios.get(`${urlApi}/Conversations`,{
        withCredentials: true,
      });
      if(res?.data?.logout)
      {
         logout();
        return null;
       
      }
      const conversations=res?.data?.conversations;
      setUser((prevUser) => ({
        ...prevUser, 
        conversations, 
      }));

     

    }catch (err: unknown) {
      const ApiError = err as ApiError;
      if (ApiError.response?.data.message) {
        toast.error(ApiError.response.data.message);
    } else {
        toast.error("An unexpected error occurred. Please try again later.");
    }}

  }
return {getConversations,loading}
 }
