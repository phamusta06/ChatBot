import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


type Message = {
  conversationId: string;
  text?: string;
  userId: string;
};

 
type ApiResponse = {
  _id: string;
  conversationId: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages?:unknown[]
};

const urlApi: string = import.meta.env.VITE_API_URL;

//new message
export const useNewMessage = () => {
  
  const [data, setData] = useState<ApiResponse | null>(null);
 
  const [loading, setLoading] = useState<boolean>(false);

  const handleMessage = async ({ conversationId, text, userId }: Message) => {
    try {
      setLoading(true);

     
      const res = await axios.post<ApiResponse>(`${urlApi}/new-message`, {
        conversationId,
        text,
        userId,
      });

   
      setData(res.data);
      return res.data;

    } catch (error: any) {
      
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
    
      setLoading(false);
    }
  };

  return { handleMessage, loading, data };
};


//get conversation
