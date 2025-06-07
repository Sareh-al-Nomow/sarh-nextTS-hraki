import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import Products from "@/components/homePage/products/Products";
import ProductsLists from "@/components/homePage/products/ProductsLists";

export default function Home() {
  return (
    <>
      <Carousel />
      <CategoriesList />
      <ProductsLists />
      <Products />
    </>
  );
}
