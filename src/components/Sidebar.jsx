import { Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineAutoFixHigh, MdOutlineLabelImportant } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { useGetContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Sidebar = ({ sideBarToggle, togglerClick }) => {
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery({ token, activePage });
  const { frequent } = useSelector((store) => store.contactSlice);
  const { favorite } = useSelector((store) => store.contactSlice);

  return (
    <div
      className={` mt-4 w-[280px] font-poppins min-h-screen lg:flex flex-col gap-8 hidden fixed bg-white text-gray-700 font-[500] text-sm transition duration-300 top-0 lg:top-[65px] ${
        sideBarToggle ? "lg:translate-x-0" : "lg:-translate-x-[100%]"
      }`}
    >
      {/* top menu  */}
      <div>
        <div className=" ml-2 mb-4">
          <button
            onClick={() => navigate("/create")}
            className=" create-btn flex items-center gap-2 w-fit px-4 py-2 rounded-full shadow cursor-pointer"
          >
            <svg width="36" height="36" viewBox="0 0 36 36">
              <path fill="#34A853" d="M16 16v14h4V20z"></path>
              <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
              <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
              <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
              <path fill="none" d="M0 0h36v36H0z"></path>
            </svg>
            <span className=" font-[500]">Create contact</span>
          </button>
        </div>

        <ul>
          <li>
            <NavLink to={"/"} className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-2 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <span className="material-symbols-outlined text-xl">
                    person
                  </span>
                  <span>Contacts</span>
                </div>
                <span className="">{data?.contacts?.total}</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to={"/favorite"} className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-3 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <AiOutlineStar className=" text-xl" />
                  <span>Favorite</span>
                </div>
                <span className="">{favorite.length || ""}</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to={"/frequent"} className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-2 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <span className="material-symbols-outlined text-xl">
                    history
                  </span>
                  <span>Frequent</span>
                </div>
                <span className="">{frequent?.length || ""}</span>
              </div>
            </NavLink>
          </li>

          <li>
            <Link className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-2 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <span className="material-symbols-outlined text-xl">
                    archive
                  </span>
                  <span>Other contacts</span>
                </div>
                <span className="material-symbols-outlined -mr-2 text-[20px]">
                  info
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* bottom menu  */}
      <div>
        <h1 className=" ml-4 text-base mb-3">Fix and manage</h1>
        <ul>
          <li>
            <Link className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-3 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <MdOutlineAutoFixHigh className=" text-xl" />
                  <span>Merge and fix</span>
                </div>
                <span className="">1</span>
              </div>
            </Link>
          </li>

          <li>
            <Link className={"side-link"}>
              <div className=" side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-2 rounded-full rounded-s-none">
                <div className=" flex items-center gap-x-5">
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                  <span>Bin</span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* label  */}
      <div>
        <div className=" mb-3 ml-4 text-base flex justify-between items-center">
          Labels
          <Tooltip
            transitionProps={{ transition: "fade", duration: 300 }}
            label="Create label"
            openDelay={500}
            position="bottom"
          >
            <span>
              <BsPlusLg className=" hover:bg-[--gray-color] rounded-full cursor-pointer text-lg mr-5" />
            </span>
          </Tooltip>
        </div>

        <div>
          <Link className={"side-link"}>
            <div className=" group side-nav hover:bg-[#F1F3F4] flex items-center justify-between text-sm px-6 py-2 rounded-full rounded-s-none">
              <div className=" flex items-center gap-x-5">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path>
                </svg>
                <span>Important People</span>
              </div>
              <div>
                <span className=" opacity-0 group-hover:opacity-100 material-symbols-outlined text-xl">
                  delete
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
