import { AxiosError, AxiosResponse } from "axios";



//Errors
export interface ApiError extends AxiosError {
    response?: AxiosResponse<{
      message: string;
    }>;
  }


//Conversation
  export interface ConversationType {
    _id: string;
    userId: string;
    participants?: string[];
    titleMsg?:MessageType,
    messages: MessageType[];
    createdAt?:string|Date;
    updatedAt?: string|Date;
  }
export interface MessageType {
     _id?: string;
    conversationId?: string;
    content?: string;
    sender: string;
    recipient?: string;
    createdAt?:string|Date;
    updatedAt?: string|Date;
  }