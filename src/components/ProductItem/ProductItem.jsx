import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { useEffect } from "react";
import { ROUTES } from "../../utils/routes";
import Product from "../Product/Product";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

const ProductItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { related, products } = useSelector((state) => state.products);

  const { data, error, isLoading, isFetching, isSuccess } = useGetProductQuery({
    id,
  });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data) return;
    dispath(getRelatedProducts(data.category.id));
  }, [dispath, data, products]);

  if (isLoading) return <section className="preloader">Loading... </section>;

  return (
    <>
      <Product {...data} />
      <Products title="Related products" products={related} amount="5" />
    </>
  );
};

export default ProductItem;
