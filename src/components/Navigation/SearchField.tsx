import { CiSearch } from "react-icons/ci";

export default function SearchField() {
  return (
    <div className="w-full relative max-w-md">
      <input
        type="text"
        placeholder="ابحث عن المنتجات..."
        className="w-full p-3 text-xl shadow rounded-full focus:shadow-black/60 transition-all duration-200"
      />
      <CiSearch className=" absolute top-4 right-5 text-2xl" />
    </div>
  );
}
