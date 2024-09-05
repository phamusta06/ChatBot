import logo from "../../assets/ai.png";

type ContentType = {
  contentBuble: string;
  userId: string;
};

export const ChatBuble = (props: ContentType) => {
  const botId = import.meta.env.VITE_BOT;

   

  return (
    <div>
      {props.userId !== botId ? (
        <div className="flex justify-end">
          <div className="flex items-center bg-white shadow-sm rounded-xl p-2 gap-1 flex-row-reverse">
            <p className="text-black text-lg px-3">{props.contentBuble}</p>
          </div>
        </div>
      ) : (props.contentBuble.length !== 0 && (
        <div className="flex justify-start gap-2">
          <img src={logo} className="w-8 rounded-full h-8" alt="Bot Logo" />
          <div className="flex items-center p-2 gap-1">
            <p className="text-black text-lg">{props.contentBuble}</p>
          </div>
        </div>
      ))}
    </div>
  );
};