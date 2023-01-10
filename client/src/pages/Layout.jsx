import HeaderComponent from '../components/Header/Header.component';
import FooterComponent from '../components/Footer/Footer.component';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return(
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  )
}

export default Layout