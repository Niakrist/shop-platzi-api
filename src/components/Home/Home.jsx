import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import { useEffect } from "react";
import { filterByPrice } from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const { filtered } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length) {
      dispatch(filterByPrice(100));
    }
  }, [dispatch, products]);

  return (
    <>
      <Poster />
      <Products title="Trending" products={products} amount="5" />
      <Categories title="Worth seeing" categories={categories} amount="5" />
      <Banner />
      <Products title="Less than 100$" products={filtered} amount="5" />
    </>
  );
};

export default Home;
