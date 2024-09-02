import { Search } from "lucide-react";

export const InputSearch = () => {
  return (
    <>
      <div className=" relative bg-white flex items-center px-3 rounded-2xl  shadow-sm ">
        <input
          placeholder="Search your chat..."
          className="  py-2 w-full rounded-md flex-1 outline-none bg-white"
        />
        <button className=" absolute right-2 w-auto p-1 bg-black  rounded-full  ">
          <Search className="text-white " size={16} />
        </button>
      </div>
    </>
  );
};
