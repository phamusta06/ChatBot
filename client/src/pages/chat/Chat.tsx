import { useEffect, useRef, useState } from "react";
import { ChatBuble } from "../../components/chatbuble/ChatBuble";
import {useNewMessage} from "../../hooks/useConversations";
import { useParams } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext";
interface messageUser {
  message: string;
  userId: string;
}

const urlApi: string = import.meta.env.VITE_API_URL;
const Chat = () => {
  const [respondedAi, setResponseAi] = useState<string>("");
  const [enableArea, setEnableArea] = useState<string>("");
  const startConversation=useRef<boolean>(true)
  const txtArea = useRef<HTMLTextAreaElement>(null);
  const showMessages = useRef<HTMLDivElement>(null);
  const { user } = useUserContext();
  const idConversation = useParams();
  const [messages, setMessages] = useState<messageUser[]>([]);
  const {  handleMessage } = useNewMessage();
 

  const getConversation = async () => {

if (idConversation.id && user?.id) {
      const res = await handleMessage({
        conversationId: idConversation.id,
        userId: user.id,
      });
      const getMessage= res?.messages;
      if (getMessage.length === 1 && startConversation.current) {
        console.log(startConversation.current)
        startConversation.current=false;
        const message:string=getMessage[0].text
        setMessages([{ message, userId: user.id }]);
                streamAi(message)

        
          

 
        
      } else {
        setMessages([]);
        getMessage.map((message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: message?.text, userId: message?.msgByUserId },
          ]);
        });
      }

      console.log(getMessage);
    }
  };
  useEffect(() => {
     getConversation();
  }, [idConversation]);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (showMessages?.current) {
      showMessages?.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages,respondedAi]);
  // stream
   const streamAi = async (text:string) => {
    

    try {
        const response = await fetch(`${urlApi}/api/v1/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: text })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response!.body!.getReader();
        const decoder = new TextDecoder();
        let fullText=''
        const a=true
        while (a) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = JSON.parse(line.slice(6));
                    if (data.text&&!data.done) {
                      
                       setResponseAi((prev) => prev +''+data.text)
                       fullText+=data.text;
                    }
                    if (data.done) {
                        console.log('Stream complete');
                        
                        await handleMessage({
                                conversationId: idConversation.id??'',
                                userId: import.meta.env.BOT_ID,
                          text:fullText
                          });
                          setMessages((prev) => [...prev,{message:fullText,userId:import.meta.env.BOT_ID,}])
                          setResponseAi("")
                        return;
                    }
                }
            }
        }
    } catch (error:any) {
        toast.error(error.message);
    }
};
  //fin 

 const handleSendMessage=async(text:string) => {
  try{
    setMessages((prev) => [...prev, { message: respondedAi, userId: import.meta.env.BOT_ID }]);
    setResponseAi('')
    if(text.length===0){throw new Error('Please enter a message')}
    txtArea!.current!.value ='';
      setMessages((prev) => [...prev,{message:text,userId:user?.id}])
      await handleMessage({
        conversationId: idConversation.id??'',
        userId: user.id, text
      });  
     
       
        streamAi(text)
      
   
     
    }
  

  catch(error:any){
    toast.error(error)
  }
}
  

return (
  <div ref={showMessages} className=" flex justify-center w-full ">
    <div className="  flex flex-col items-center px-10  mb-24 max-w-[750px] w-full  ">
      <div className=" w-full space-y-3   py-10 pb-6   ">
        {messages?.map((item, index) => (
          <ChatBuble
            key={index}
            content={item.message}
            userId={item.userId}
          />
        ))}{
          respondedAi.length>1&&
          (
            <ChatBuble
           
            content={respondedAi}
            userId={import.meta.env.BOT_ID}
          />)
          
        }
      </div>
      <div className="flex justify-center w-full mt-3 ">
        <div className=" bg-white w-full  fixed bottom-0 rounded-t-3xl max-w-[750px] border-[1px] border-gray-700/15 overflow-hidden p-0">
          {/* Textarea for user input */}
          <textarea
            onChange={(e) => {
              
              setEnableArea(e?.target?.value);
            }}
             onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                e.preventDefault();
                if(!txtArea.current?.value)return
                            
                handleSendMessage(txtArea!.current!.value);
              }
             }}
            ref={txtArea}
            className="  w-full  p-3 resize-none outline-none  max-h-[400px] font-semibold text-lg   "
          ></textarea>
          {/* Send button */}
          <button
          disabled={enableArea.trim().length<1}
            
            onClick={() => handleSendMessage(txtArea!.current!.value)}
           
            className="absolute right-2 top-2 w-8 h-8 rounded-xl disabled:opacity-35 disabled:cursor-not-allowed bg-slate-900 hover:bg-slate-700 text-center "
          >
            <ArrowUp size={17} className="text-white mx-auto" />
          </button> 
          <div className="px-4 text-center">chatbot</div>
        </div>
      </div>
    </div>
  </div>
);
}
export default Chat;