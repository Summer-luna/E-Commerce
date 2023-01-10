import {useEffect, useState} from "react";
import { data } from "../../data/data";
import { Link } from "react-router-dom";
import {useShoppingCart} from "../../Context/ShoppingCartContext";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {cartItems} = useShoppingCart();

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  const totalItemsInCart = cartItems && cartItems.reduce((sum, cartItem)=>{
    return cartItem.quantity + sum;
  }, 0)

  // dynamic styles
  const menuToggleStyle = menuOpen
    ? "before:w-[100%] before:top-0 before:opacity-0 after:w-full after: bottom-0 after:-rotate-90 rotate-[225deg] delay-100 ease-[cubic-bezier(0.215, 0.61, 0.355, 1)]"
    : "before:w-[120%] before:-top-2.5 before:opacity-100 after:w-10/12 after:-bottom-2.5 after:rotate-0 rotate-0 delay-0 ease-[cubic-bezier(0.55, 0.055, 0.675, 0.19)]";

  const asideBarStyle = menuOpen ? "translate-x-0" : "translate-x-full";

  return (
    <header className="md:pt-10 px-5 pt-0 h-28 w-full md:w-full md:max-w-[1536px] font-bold text-xl fixed top-0 pointer-events-auto transition-all z-30 bg-stone-100">
      <nav className="relative w-full flex justify-between mt-8 tracking-wider">
        <div>
          <Link to="/" className="w-11 h-11 hover:text-stone-500">
            Shop.
          </Link>
        </div>
        <div className="hidden md:flex w-full justify-end gap-3 items-center relative">
          <ol className="p-0 m-0 flex gap-3">
            {data &&
              data.navLinks.map(({ name, url }, index) => {
                return (
                  <li
                    key={index}
                    className="WiderScreenLi py-3 px-3 opacity-0 before:mr-1 text-base animate-fadeDown"
                    style={{animationDelay: `${index + 1}00ms` }}
                  >
                    <Link to={url} className="text-center hover:text-stone-500">
                      {name}
                    </Link>
                  </li>
                );
              })}
            <span className='h-5 w-5 bg-red-500 rounded-full absolute right-0 text-white text-sm text-center'>{totalItemsInCart}</span>
          </ol>
        </div>
        <div className="block md:hidden">
          <div>
            <button
              className="relative z-10 bg-transparent text-inherit"
              onClick={toggleMenu}
            >
              <div className="inline-block relative w-8 h-6">
                <div
                  className={`absolute top-1/2 right-0 w-8 h-[3px] rounded bg-black transition-all 
                before:content-[''] before:block before:bg-black before:h-[3px] before:absolute before:right-0 before:left-auto before:ease-linear before: duration-150 before:transition-all
                after:content-[''] after:block after:bg-black after:h-[3px] after:absolute after:right-0 after:left-auto after:ease-linear after: duration-150 after:transition-all
                ${menuToggleStyle}
                `}
                ></div>
              </div>
            </button>
            <aside
              className={`flex justify-center items-center fixed top-0 right-0 bottom-0 h-screen py-12 px-2.5 bg-stone-200 FluidWidth shadow-aside z-0 transition-transform ${asideBarStyle}`}
            >
              <nav className="w-full flex flex-col text-center text-fluid relative">
                <ol className="w-full">
                  {data &&
                    data.navLinks.map(({ name, url }, index) => {
                      return (
                        <li
                          key={index}
                          className="relative mt-0 mx-auto mb-5 nav_list animate-fadeDown"
                        >
                          <Link to={url} className="pt-1 px-5 pb-5 w-full hover:text-stone-500 cursor-pointer">
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                </ol>
                <span className='h-5 w-5 bg-red-500 rounded-full absolute bottom-9 left-40 text-white text-sm text-center'>{totalItemsInCart}</span>
              </nav>
            </aside>
          </div>
        </div>
      </nav>
    </header>
  );
};

