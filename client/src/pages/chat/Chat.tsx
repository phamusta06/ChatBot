import { useEffect, useRef, useState } from "react";
import { ChatBuble } from "../../components/chatbuble/ChatBuble";
import { useNewMessage } from "../../hooks/useConversations";
import { useParams } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useUserContext } from "../../context/userContext";
import { MessageType } from "../../types/types";

const Chat = () => {
  const [respondedAi, setResponseAi] = useState<string>("");
  const [enableArea, setEnableArea] = useState<string>("");
  const startConversation = useRef<boolean>(true);
  const txtArea = useRef<HTMLTextAreaElement>(null);
  const showMessages = useRef<HTMLDivElement>(null);
  const { user } = useUserContext();
  const { handleMessage } = useNewMessage();
  const idConversation = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);

  const BOT = import.meta.env.VITE_BOT;

  const getConversation = async () => {
    if (idConversation.id && user?.id) {
      const res = await handleMessage({
        conversationId: idConversation.id,
        recipient: BOT,
        sender: user?.id,
      });
      const getMessage: MessageType[] = res?.messages || [];
      if (getMessage.length === 1 && startConversation.current) {
        startConversation.current = false;
        const message: string = getMessage[0].content!;
        setMessages([{ content: message, sender: user.id, recipient: BOT }]);
        streamAi(message);
      } else {
        setMessages([]);
        getMessage.forEach((message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: message?.content, sender: message?.sender },
          ]);
        });
      }
    }
  };

  useEffect(() => {
    getConversation();
  }, [idConversation]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (showMessages?.current) {
      showMessages.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, respondedAi]);

  const streamAi = async (text: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text && !data.done) {
                setResponseAi((prev) => prev + data.text);
                fullText += data.text;
              }
              if (data.done) {
                console.log("Stream complete");

                await handleMessage({
                  conversationId: idConversation.id,
                  sender: BOT,
                  recipient: user.id,
                  content: fullText,
                });
                setMessages((prev) => [
                  ...prev,
                  { content: fullText, sender: BOT, recipient: user.id },
                ]);
                setResponseAi("");
                return;
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      if (text.trim().length === 0) {
        throw new Error("Please enter a message");
      }
      setMessages((prev) => [
        ...prev,
        { content: text, sender: user.id, recipient: BOT },
      ]);
      setResponseAi("");

      if (txtArea.current) {
        txtArea.current.value = "";
      }

      await handleMessage({
        conversationId: idConversation.id ?? "",
        recipient: BOT,
        sender: user.id,
        content: text,
      });

      streamAi(text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={showMessages} className="flex justify-center w-full">
      <div className="flex flex-col items-center px-10 mb-24 max-w-[750px] w-full">
        <div className="w-full space-y-3 py-10 pb-6">
          {messages.map((item: MessageType, index) => (
            <ChatBuble
              key={index}
              contentBuble={item.content || ""}
              userId={item.sender}
            />
          ))}
          {respondedAi.length > 1 && (
            <ChatBuble
              contentBuble={respondedAi}
              userId={import.meta.env.VITE_BOT}
            />
          )}
        </div>
        <div className="flex justify-center w-full mt-3">
          <div className="bg-white w-full fixed bottom-0 rounded-t-3xl max-w-[750px] border-[1px] border-gray-700/15 overflow-hidden p-0">
            {/* Textarea for user input */}
            <textarea
              onChange={(e) => setEnableArea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!txtArea.current?.value) return;
                  handleSendMessage(txtArea.current.value);
                }
              }}
              ref={txtArea}
              className="w-full p-3 resize-none outline-none max-h-[400px] font-semibold text-lg"
            ></textarea>
            {/* Send button */}
            <button
              disabled={enableArea.trim().length < 1}
              onClick={() => {
                if (txtArea.current) {
                  handleSendMessage(txtArea.current.value);
                }
              }}
              className="absolute right-2 top-2 w-8 h-8 rounded-xl disabled:opacity-35 disabled:cursor-not-allowed bg-slate-900 hover:bg-slate-700 text-center"
            >
              <ArrowUp size={17} className="text-white mx-auto" />
            </button>
            <div className="px-4 text-center">chatbot</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;