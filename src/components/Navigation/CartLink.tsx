import { IoCartOutline } from "react-icons/io5";

export default function CartLink() {
  return (
    <div className=" relative mt-1">
      <IoCartOutline className={`pr-text text-3xl cursor-pointer`} />
      <div className="text-white absolute text-[13px]  -top-1 left-0 pr-bg rounded-full w-4 h-4 flex justify-center items-center">
        0
      </div>
    </div>
  );
}
