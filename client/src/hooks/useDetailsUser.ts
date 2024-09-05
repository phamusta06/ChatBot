import { useState } from 'react';
import axios from 'axios';
import { logout } from './useAuth';
import { useUserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { ApiError } from '../types/types';


export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const{setUser}=useUserContext()
  

  const getuser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user-details`, { withCredentials: true});
      
      if (res?.data?.success) {
       const userdata=res?.data?.user;
      setUser((prevUser) => ({
        ...prevUser, 
        id:userdata._id,name:userdata.username
      }));
      }
      if (res?.data?.logout) {
        logout();
        return null;
      }
    } catch (err: unknown) {
      const ApiError = err as ApiError;
      if (ApiError.response?.data.message) {
        toast.error(ApiError.response.data.message);
    } else {
        toast.error("An unexpected error occurred. Please try again later.");
    }
    } finally {
      setLoading(false);
    }
  };

  return {  loading, getuser };
};
