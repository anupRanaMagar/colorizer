"use client";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";

function Nav({ user }: { user: Session | null }) {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white h-14 w-full    border-b border-gray-200 z-30 md:z-0">
      <div className="max-w-screen-xl flex flex-col md:flex-row flex-wrap items-center justify-between mx-auto p-3 ">
        <a href="/" className="flex items-center space-x-3 text-gray-600">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Auto-Colorizer
          </span>
        </a>
        {open ? (
          <div
            className="absolute right-8 cursor-pointer md:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div
              className="w-10 h-1 bg-black mt-1 rotate-45 transform top-1 relative
            "
            ></div>
            <div className="w-10 h-1 bg-black mt-1 transform -rotate-45 absolute top-1"></div>
          </div>
        ) : (
          <div
            className="absolute right-8 cursor-pointer md:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="w-9 h-1 bg-black mt-1"></div>
            <div className="w-9 h-1 bg-black mt-1"></div>
            <div className="w-9 h-1 bg-black mt-1"></div>
          </div>
        )}

        <div
          className={`items-center justify-between  w-full md:flex md:w-auto z-[100] bg-gray-200/50 ${
            open ? "top-20" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8   md:mt-0 md:border-0  ">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-sm"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-sm "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-sm
                "
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-sm
                "
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {user === null ? (
          <div
            className={`flex flex-col md:flex-row    
          ${open ? "top-20 gap-3" : "hidden md:block"}
          `}
          >
            <a
              href="/login"
              className="text-[#454545] bg-[#e9eced] hover:bg-[#DEE1E3] font-medium rounded-full text-sm px-4 py-2 text-center mr-4 "
            >
              Login
            </a>
            <a
              href="/login"
              className="text-[#454545] bg-[#e9eced]  hover:bg-[#DEE1E3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center "
            >
              Sign up
            </a>
          </div>
        ) : (
          <div
            className={`flex flex-col md:flex-row    
          ${open ? "top-20 gap-3" : "hidden md:block"}
          `}
          >
            <a
              type="button"
              onClick={() => logout()}
              className="text-[#454545] cursor-pointer bg-[#e9eced]  hover:bg-[#DEE1E3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center "
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
