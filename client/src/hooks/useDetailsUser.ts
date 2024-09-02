import { useState } from 'react';
import axios from 'axios';
import { logout } from './useAuth';
import { useUserContext } from '../context/userContext';


export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const{setUser}=useUserContext()
  

  const getuser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user-details`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
      const user=res?.data?.data;
      setUser({...user,id:user._id,name:user.name})
      
       
      }
      if (res?.data?.logout) {
        logout();
        return null;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {  loading, getuser };
};
