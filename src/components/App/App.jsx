import { useDispatch } from "react-redux";
import AppRoutes from "../AppRoutes/AppRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import { fetchProducts } from "../../features/products/productsSlice";
import UserForm from "../User/UserForm";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>

      <UserForm />
      <Footer />
    </div>
  );
};

export default App;
