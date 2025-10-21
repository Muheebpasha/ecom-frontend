import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaStore, FaBars, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";


const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {cart} = useSelector((state) => state.carts);
  const {user} = useSelector((state) => state.auth);

  return (
    <nav className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0 shadow-md">
      <div className="w-full lg:px-14 sm:px-8 px-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[Poppins]">E-Shop</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <FaBars />
        </button>

        {/* Right: Nav Links */}
        <ul
               className={`flex sm:gap-10 gap-2 sm:flex-row flex-col sm:static absolute sm:bg-transparent bg-custom-gradient sm:w-auto w-full sm:top-0 top-[70px] left-0 sm:h-auto transition-all duration-300 ease-in-out ${
               navbarOpen ? "h-fit pb-4 pt-2" : "h-0 overflow-hidden"
               } sm:overflow-visible`}
               >
               {["Home", "Products", "About", "Contact"].map((item) => {
               const route = item === "Home" ? "/" : `/${item.toLowerCase()}`;
               return (
                    <li
                    key={item}
                    className="font-medium transition-all duration-150 sm:text-white text-gray-200 hover:text-white
                              sm:px-0 px-4 sm:py-0 py-2 sm:text-base text-lg"
                    >
                    <Link
                         to={route}
                         onClick={() => setNavbarOpen(false)} // 👈 CLOSE on click
                         className={`block w-full ${
                         path === route ? "font-semibold text-white" : "text-gray-200"
                         }`}
                    >
                         {item}
                    </Link>
                    </li>
               );
               })}

               {/* Cart Icon */}
               <li className="sm:px-0 px-4 sm:py-0 py-2">
               <Link
                    to="/cart"
                    onClick={() => setNavbarOpen(false)} // 👈 CLOSE on click
                    className={`flex items-center ${
                    path === "/cart" ? "text-white font-semibold" : "text-gray-200"
                    }`}
               >
                    <Badge
                    showZero
                    badgeContent={cart?.length || 0}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                    <FaShoppingCart size={24} />
                    </Badge>
                    <span className="ml-2 sm:hidden">Cart</span>
               </Link>
               </li>

                { (user && user.id) ? (
                  <li className="sm:px-0 px-4 sm:py-0 py-2">
                    <UserMenu />
                  </li>
                ) : (
                <li className="sm:px-0 px-4 sm:py-0 py-2">
                  <Link
                        to="/login"
                        onClick={() => setNavbarOpen(false)} // 👈 CLOSE on click
                        className="flex items-center justify-center space-x-2 px-4 py-[6px] 
                                  bg-gradient-to-r from-purple-600 to-red-500 
                                  text-white font-semibold rounded-md shadow-lg 
                                  hover:from-purple-500 hover:to-red-400 
                                  transition duration-300 ease-in-out transform hover:scale-105">
                        <FaSignInAlt />
                        <span>Login</span>
                  </Link>
                </li>
               )}
               </ul>


      </div>
    </nav>
  );
};

export default Navbar;
