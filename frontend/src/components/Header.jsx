import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/slices/authSlice";

import "@/components/GlassCards.css";
import "@/components/Testimonials.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 Get auth state from Redux
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!token; // check if user is logged in

  const handleLogout = () => {
    dispatch(clearCredentials());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="fixed top-0 select-none left-0 w-full z-50 glass-card shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          LOGO
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-white font-medium">
          {
            user?.admin ? (
              <>
                <a href="/admin/add-blog" className="hover:text-gray-300">Add Blog</a>
                <a href="/admin/edit-blog/:id" className="hover:text-gray-300">Edit Blog</a>
                <a href="/admin/settings" className="hover:text-gray-300">Settings</a>
              </>
            ) : (
              <>
                <a href="/" className="hover:text-gray-300">Home</a>
                <a href="/services" className="hover:text-gray-300">Services</a>
                <a href="/blogs" className="hover:text-gray-300">Blogs</a>
                <a href="/cart" className="hover:text-gray-300">Cart</a>
                <a href="/about" className="hover:text-gray-300">About Us</a>
                <a href="/contact" className="hover:text-gray-300">Contact Us</a>
              </>
            )
          }

        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src={user?.avatar} alt={user?.name || "user"} />
                  <AvatarFallback>
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2] text-white px-5 py-2 rounded-md cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="cursor-pointer">
              <Menu className="text-white w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white p-6 w-72">
              {/* Logo */}
              <div
                className="text-xl font-bold mb-6 cursor-pointer"
                onClick={() => navigate("/")}
              >
                LOGO
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-4 font-medium">
                <a href="/" className="hover:text-gray-300">Home</a>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-gray-200">Services</span>
                  <div className="ml-3 flex flex-col space-y-2 text-sm">
                    <a href="/service1" className="hover:text-gray-300">Service 1</a>
                    <a href="/service2" className="hover:text-gray-300">Service 2</a>
                    <a href="/service3" className="hover:text-gray-300">Service 3</a>
                  </div>
                </div>
                <a href="/about" className="hover:text-gray-300">About Us</a>
                <a href="/contact" className="hover:text-gray-300">Contact Us</a>
              </nav>

              {/* Divider */}
              <div className="my-6 border-t border-gray-700" />

              {/* Mobile Auth Section */}
              <div>
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <Link to="/profile">
                      <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage src={user?.avatar} alt={user?.name || "user"} />
                        <AvatarFallback>
                          {user?.name ? user.name[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white  px-5 py-2 rounded-md w-full"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2] text-white px-4 py-2 rounded-md w-full"
                  >
                    Login
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
