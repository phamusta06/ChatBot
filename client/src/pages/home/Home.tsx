import { ArrowRight, ArrowUp, ChevronUp, MessagesSquare } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CardRecent from "../../components/cardRecent/CartRecent";
import { motion, AnimatePresence } from "framer-motion";
import HistoryEmpty from "../../components/historyEmpty/HistoryEmpty";
import {useNewMessage} from "../../hooks/useConversations";

const urlApi: string = import.meta.env.VITE_API_URL;

export const Home = () => {
  const {
      handleMessage,
  } = useNewMessage();

  const [areaValue, setAreaValue] = useState<string>("");
  const navigate = useNavigate();
  const CurrentUserContext = useContext(UserContext);
  const [showConversation, setShowConversation] = useState<boolean>(true);
  const { user, setUser } = CurrentUserContext;
 

  

 

  // const { data: dataConversation, isSuccess: succesConversation } =
  //   useQuery<any>({
  //     queryKey: ["conversations"],
  //     queryFn: async () => {
  //       return await axios.post(
  //         `${urlApi}/conversation`,
  //         {
  //           userId: currentUser?._id,
  //         },
  //         { withCredentials: true }
  //       );
  //     },
  //     refetchOnWindowFocus: false,
  //     enabled: !!successUser,
  //     refetchOnMount: false,
  //     gcTime: 1000 * 60 * 2,
  //   });
  // useEffect(() => {
  //   if (currentUser?._id && successUser) {
  //     setUser({
  //       id: currentUser._id,
  //       name: currentUser?.name,
  //     });
  //   }
  //   if (dataConversation && succesConversation) {
  //     setUser({
  //       ...user,
  //       conversations: dataConversation?.data,
  //     });
  //   }
  // }, [dataConversation, currentUser?._id]);

  // const handleSendMessage = async (e:any) => {
  //   e.preventDefault();
  //   const dataMessage = await handleMessage({
  //     userId: user?.id,
  //     conversationId: "66a91be2383ec19601549e73",
  //     text: areaValue,
  //   });

  //   navigate(`/chat/${dataMessage?._id}`);
  // };


  return (
    <div className="min-h-[100vh]  w-full">   
    <div className="flex flex-col gap-6 pt-20 min-h-screen max-w-[750px] mx-auto w-full py-3 px-1 ">
        <div className="flex justify-center items-center  w-full ">
          <h1 className="text-3xl  text-center font-serif text-gray-800  ">
            Welcome {user?.name}
          </h1>
        </div>
        {/* input message */}
        <form 
        // onSubmit={handleSendMessage}
        >
          <div className="relative bg-white w-full rounded-3xl overflow-hidden p-2 pr-10 shadow-sm">
            {areaValue && (
              <button
                type="submit"
                className="absolute right-2 top-2 w-8 h-8 rounded-2xl bg-slate-900 hover:bg-slate-700 text-center "
              >
                <ArrowUp size={17} className="text-white mx-auto" />
              </button>
            )}
            <textarea
              onChange={(e) => setAreaValue(e.target.value)}
              style={{}}
              placeholder="How can chatbot help you today"
              className="  w-full  p-3 resize-none outline-none overflow-y-hidden max-h-[400px] text-sm text-slate-900 font-medium"
            ></textarea>
            <div className="px-4 text-center font-bold">chatbot</div>
          </div>
        </form>
        <div className="space-y-4">
          {/* recent coversition */}
          <div className="flex justify-between font-semibold ">
            <div className="flex items-center gap-2">
              <div className="flex gap-2  items-center ">
                <MessagesSquare className="w-4 text-cyan-500 " />
                <h3>Your recent chats</h3>{" "}
              </div>

              <button
                onClick={() => setShowConversation(!showConversation)}
                className="flex hover:bg-slate-300/30 items-center px-1 rounded-lg  "
              >
                <ChevronUp
                  size={18}
                  className={` ${
                    showConversation ? "rotate-180" : ""
                  } transition-all duration-300 `}
                />
                {showConversation ? "" : "show"}
              </button>
            </div>
            <div className="group flex gap-2 items-center cursor-pointer   ">
              <NavLink to={"/history"}>
                {" "}
                <h4 className="hover:underline">View all </h4>
              </NavLink>
              <ArrowRight className="w-4 h-4 group-hover:scale-110 group-hover:ml-1 transition-all duration-900 " />
            </div>
          </div>
          {/* show Cards */}
          {user?.conversations?.length != 0 ? (
            <AnimatePresence>
              {showConversation && (
                <div className="grid grid-cols-3 gap-3 flex-wrap w-full ">
                  {user?.conversations?.slice(0,6).map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CardRecent
                        size={9}
                        icon={true}
                        content={item}
                        time={item?.createdAt}
                        id={item._id}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          ) : (
            showConversation && <HistoryEmpty size={100} />
          )}
        </div>
      </div>
    </div>
  );
};
