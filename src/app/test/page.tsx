// "use client";

// import { useState, useRef, useEffect } from "react";
// import { FiCheck } from "react-icons/fi";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// interface DropdownItem {
//   value: string;
//   label: string;
//   image: string;
//   price: string;
// }

// interface SearchableDropdownProps {
//   items: DropdownItem[];
//   placeholder?: string;
//   selectedItem?: DropdownItem | null;
//   onSelect: (item: DropdownItem | null) => void;
// }

// const SearchableDropdown = ({
//   items,
//   selectedItem,
//   onSelect,
//   placeholder = "Search...",
// }: SearchableDropdownProps) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredItems, setFilteredItems] = useState<DropdownItem[] | null>(
//     items
//   );
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredItems(null);
//     } else {
//       const filtered = items.filter((item) =>
//         item.label.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredItems(filtered);
//     }
//   }, [searchTerm, items]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setSearchTerm("");
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (item: DropdownItem) => {
//     onSelect(item);
//     setSearchTerm("");
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full p-3 rounded-xl shadow-lg bg-white/70 backdrop-blur border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         autoFocus
//       />

//       <AnimatePresence>
//         {filteredItems && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-gray-200 max-h-[400px] overflow-y-auto"
//           >
//             {filteredItems.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 No results found.
//               </div>
//             ) : (
//               filteredItems.map((item) => (
//                 <div
//                   key={item.value}
//                   onClick={() => handleSelect(item)}
//                   className={`flex items-center justify-between gap-4 px-4 py-3 cursor-pointer border-b last:border-0 transition-all hover:bg-blue-50 ${
//                     selectedItem?.value === item.value ? "bg-blue-100" : ""
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Image
//                       src={item.image}
//                       alt={item.label}
//                       width={40}
//                       height={40}
//                       className="rounded-md object-cover w-10 h-10"
//                     />
//                     <div>
//                       <p className="font-medium text-gray-800">{item.label}</p>
//                       <p className="text-sm text-gray-500">${item.price}</p>
//                     </div>
//                   </div>
//                   {selectedItem?.value === item.value && (
//                     <FiCheck className="text-blue-500 text-xl" />
//                   )}
//                 </div>
//               ))
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SearchableDropdown;
