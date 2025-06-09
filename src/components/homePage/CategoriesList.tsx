import Image from "next/image";
import Link from "next/link";

export default function CategoriesList() {
  const categories = [
    {
      id: 3,
      name: "Accessories",
      image: "/image/categories/jewellery.jpg",
    },
    { id: 1, name: "Shoes", image: "/image/categories/book.jpg" },
    {
      id: 3,
      name: "Accessories",
      image: "/image/categories/jewellery.jpg",
    },
    { id: 1, name: "Shoes", image: "/image/categories/book.jpg" },
    { id: 1, name: "Shoes", image: "/image/categories/book.jpg" },
    {
      id: 3,
      name: "Accessories",
      image: "/image/categories/jewellery.jpg",
    },
  ];

  return (
    <section className="px-4 py-6 md:py-10 text-center">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold pr-text mb-7 ">
          Browse Categories
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <Link
              href={"/shopGrid"}
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#219EBC] shadow-md group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm md:text-base pr-text group-hover:text-[#219EBC] transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
