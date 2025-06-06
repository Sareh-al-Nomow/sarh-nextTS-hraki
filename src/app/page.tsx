import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import ProductsList from "@/components/homePage/ProductsList";
import Navbar from "@/components/Navigation/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Carousel />
      <CategoriesList />
      <ProductsList />
    </>
  );
}
