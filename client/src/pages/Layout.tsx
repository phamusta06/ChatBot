import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef } from "react";
import { useGetConversations } from "../hooks/useConversations";
import logo from "../assets/ai.png";
import { useGetUser } from "../hooks/useDetailsUser";

export const Layout = () => {
  const load = useRef(true);
  const { getConversations } = useGetConversations();
  const { getuser, loading } = useGetUser();
  useEffect(() => {
    if (load.current) {
      getConversations();
      getuser();
      load.current = false;
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
      <div className="relative flex justify-center items-center h-64 w-64">
        <div className="absolute animate-spin rounded-full h-64 w-64 border-t-4 border-b-4 border-blue-300 opacity-30"></div>        
        <div className="relative flex items-center justify-center h-48 w-48 rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 shadow-lg">
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 filter blur-lg"></div>
          <div className="relative z-10 p-4 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-md border border-blue-300">
            <img src={logo} className="w-24 h-24" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ChatBot</title>
      </Helmet>
      <SideBar />
      <Outlet />
    </>
  );
};
