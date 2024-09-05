import { ArrowRight, ArrowUp, ChevronUp, MessagesSquare } from "lucide-react";
import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import CardRecent from "../../components/cardRecent/CartRecent";
import { motion} from "framer-motion";
import HistoryEmpty from "../../components/historyEmpty/HistoryEmpty";
import { ConversationType } from "../../types/types";
import { useNewMessage } from "../../hooks/useConversations";

export const Home = () => {
  const [areaValue, setAreaValue] = useState<string>("");
  const [showConversation, setShowConversation] = useState<boolean>(true);
  const navigate = useNavigate();
  const { handleMessage } = useNewMessage();
  const { user } = useUserContext();
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataMessage = await handleMessage({
      sender: user?.id,
      recipient: import.meta.env.VITE_BOT,
      conversationId: import.meta.env.VITE_CONVIRTAION_ID,
      content: areaValue,
    });
    navigate(`chat/${dataMessage?._id}`);
  };

  return (
    <div className="min-h-[100vh]  w-full">
      <div className="flex flex-col gap-6 pt-20 min-h-screen max-w-[750px] mx-auto w-full py-3 px-1 ">
        <div className="flex justify-center items-center  w-full ">
          <h1 className="text-3xl  text-center font-serif text-gray-800  ">
            Welcome {user?.name}
          </h1>
        </div>
        {/* input message */}
        <form onSubmit={handleSendMessage}>
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
            <>
              {showConversation && (
                <div className="grid grid-cols-3 gap-3 flex-wrap w-full ">
                  {user?.conversations
                    ?.slice(0, 6)
                    .map((item: ConversationType, index: number) => (
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
            </>
          ) : (
            showConversation && <HistoryEmpty size={100} />
          )}
        </div>
      </div>
    </div>
  );
};
