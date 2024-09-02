import { MessagesSquare } from "lucide-react";
import { FC } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
 
interface CartRecentProps {
  size: number;
  icon?: boolean;
  content?: any;
  time?: string;
  id: string;
}

const CartRecent: FC<CartRecentProps> = ({ size, content, time, icon, id }) => {
  const navigate = useNavigate();
  const convertToDaysAgo = (dateStr: string) => {
    const date = parseISO(dateStr);
    const result = formatDistanceToNowStrict(date, { addSuffix: true });
    return result;
  };
  return (
    <div
      onClick={() => navigate(`/chat/${id}`)}
      style={{ height: `${size}rem` }}
      className={`flex flex-col justify-between rounded-xl shadow-sm p-4 bg-white bg-opacity-90 cursor-pointer hover:bg-white/90 hover:shadow-lg`}
    >
      <div className={icon ? "" : "hidden"}>
        <MessagesSquare className="w-4 text-black/70" />
      </div>
      <h2 className="font-semibold text-sm text-black/90">
        {content?.titletMsg?.text.substring(0,60)}
      </h2>
      <p className="text-gray-400">{time ? convertToDaysAgo(time) : ""}</p>
    </div>
  );
};

export default CartRecent;