import { Link } from "react-router-dom";
import logo from "../../assets/ai.png";
import { LogOut, MessagesSquare, Text } from "lucide-react";
import HistoryEmpty from "../historyEmpty/HistoryEmpty";
import { logout } from "../../hooks/useAuth";
import { useUserContext } from "../../context/userContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ConversationType } from "../../types/types";

 

const SideBar = () => {
   const { user} =useUserContext();
 
  return ( 
    
    <div className="group lg:w-10">
 <img src={logo}   className="hidden lg:block fixed   w-14 top-2 cursor-pointer" />
 
<Text className="absolute w-14 top-5 cursor-pointer block lg:hidden" />


      <div
        className={`-translate-x-full z-50  fixed top-0 left-0 px-1 group-hover:translate-x-0 h-full  lg:w-64 bg-white bg-opacity-85 shadow-lg backdrop-blur-xl overflow-hidden rounded-e-3xl scale-y-[99%] border-[1px] border-gray-700/15 transition-all duration-200`}
      >
        <img
          src={logo}
          alt=""
          className="  w-14 cursor-pointer  object-cover  "
        />
        <Link to={"/"}>
          <button className=" flex  items-center gap-1 my-4 text-lg text-start hover:bg-slate-400/30 w-full rounded-md px-1">
             <IoMdAddCircleOutline /> 
            Start a new chat
          </button>
        </Link>
        <div className="  h-full px-2 space-y-2">
          <h2 className="font-semibold">Recents</h2>
          <ul className="space-y-1">
            {user?.conversations?.length != 0 ? (
             user?.conversations?.slice(0,10).map((item:ConversationType,index:number) => (
              <li key={index}>
              <Link to={`/chat/${item._id}`}>
                <span className=" flex items-center gap-1 h-5 p-3 overflow-hidden font-extralight hover:bg-slate-400/30 rounded-md px-1 ">
                  <span className="translate-y-[3px]">
                  
                  </span><MessagesSquare className="w-4 text-black/70" />
                 {item?.titleMsg?.content?
                  item.titleMsg.content.substring(0,24):"new conversation"

                 }
                </span>
              </Link>
            </li>
        
             ))
            ) : (
              <HistoryEmpty size={60} />
            )}
            {
              (user?.conversations?.length || 0)> 10 && (
                <li>
                  <Link to={`/history`}>
                    <span className="flex items-center gap-1 h-5 p-3 overflow-hidden font-extralight hover:bg-slate-400/30 rounded-md px-1 ">
                      See all conversations
                    </span>
                  </Link>
                </li>
              )

            }
          </ul>
        </div>
        <div className="absolute bottom-4 left-4">
          <button onClick={() => { logout() }}>
            <LogOut />
          </button>
        </div>
      </div> 
      
    </div>
 
  
  );
};
export default SideBar;
