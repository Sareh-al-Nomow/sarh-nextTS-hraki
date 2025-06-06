import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import ListProducts from "@/components/homePage/ListProducts";
import ProductsList from "@/components/homePage/ProductsList";

export default function Home() {
  return (
    <>
      <Carousel />
      <CategoriesList />
      <ListProducts />
      <ProductsList />
    </>
  );
}
