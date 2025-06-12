import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import Collections from "@/components/homePage/products/Collections";
import Products from "@/components/homePage/products/Products";

export default function Home() {
  return (
    <>
      <Carousel />
      <CategoriesList />
      <Collections />
      <Products />
    </>
  );
}
