import { BadgePlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import CardRecent from "../../components/cardRecent/CartRecent";
import { InputSearch } from "./InputSearch";
import HistoryEmpty from "../../components/historyEmpty/HistoryEmpty";
import { useContext  } from "react";
import { UserContext } from "../../context/userContext";
 
export const History = () => {
  
  const CurrentUserContext = useContext(UserContext);
  const { user } = CurrentUserContext;
 
    

  

  return (
    <div className="relative flex justify-center w-full">
      <div className="flex flex-col gap-6  min-h-screen max-w-[750px] mx-auto w-full  mt-14">
        <button className="absolute top-2 right-2 p-2 bg-slate-900 rounded-xl px-3 text-white hover:bg-slate-700 ">
          <NavLink to="/">
            
            <span className="flex gap-1 items-center">
              <BadgePlus size={20} />
              <span>Start New Chat</span>
            </span>
          </NavLink>
        </button>
  
        <div className="flex flex-col gap-6  min-h-screen max-w-[750px] w-full  ">
          <p className="font-serif text-3xl  text-center">Your chat history</p>
          <InputSearch />
          {user?.conversations ? (
            user?.conversations?.map((conversation: any, index: number) => (
              <CardRecent
                key={index}
                content={conversation}
                size={5}
                time={conversation?.createdAt}
                id={conversation._id}
                
              />
            ))
          ) : (
            <HistoryEmpty size={30} />
          )}
        </div>
      </div>
    </div>
  );
};
