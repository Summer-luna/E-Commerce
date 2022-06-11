import Sliders from "../../components/Slider/Sliders";
import Categories from "../../components/Categories/Categories";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Sliders />
      <Categories />
      <Outlet />
    </>
  );
};

export default Home;

