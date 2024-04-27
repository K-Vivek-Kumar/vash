"use client";

import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="bg-gray-300 text-green-800 p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center mb-4 md:mb-0 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src="/full_logo.png" alt="Logo" className="h-16 w-auto mr-4" />
        </div>

        {/* Links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap justify-center">
            <li
              className="cursor-pointer m-4"
              onClick={() => handleNavigation("/retailer-login")}
            >
              Retailer Login
            </li>
            <li
              className="cursor-pointer m-4"
              onClick={() => handleNavigation("/retailer-signup")}
            >
              Retailer Signup
            </li>
            <li
              className="cursor-pointer m-4"
              onClick={() => handleNavigation("/admin-login")}
            >
              Admin Login
            </li>
            <li
              className="cursor-pointer m-4"
              onClick={() => handleNavigation("/user-login")}
            >
              User Login
            </li>
            <li
              className="cursor-pointer m-4"
              onClick={() => handleNavigation("/user-signup")}
            >
              User Sign Up
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
