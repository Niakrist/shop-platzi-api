import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import { ROUTES } from "../../utils/routes";
import ProductItem from "../ProductItem/ProductItem";
import Profile from "../Profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductItem />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
