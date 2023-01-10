import { Header } from '../components/layout/Header';
import Footer from '../components/layout/footer';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return(
    <div className="grid grid-cols-1 w-full max-w-screen-2xl mx-auto h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout