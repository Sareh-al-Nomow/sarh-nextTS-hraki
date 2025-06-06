import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import ListProducts from "@/components/homePage/ListProducts";
import ProductsList from "@/components/homePage/ProductsList";
import { demoProducts } from "@/utils/products";

export default function Home() {
  return (
    <>
      <Carousel />
      <CategoriesList />
      <ListProducts products={demoProducts} />
      <ProductsList />
    </>
  );
}
