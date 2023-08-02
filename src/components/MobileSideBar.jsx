import { Drawer, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../redux/api/contactApi";
import { useSelector } from "react-redux";

const MobileSideBar = ({ togglerClick, mobileSideToggle }) => {
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery({ token, activePage });
  const { frequent } = useSelector((store) => store.contactSlice);
  const { favorite } = useSelector((store) => store.contactSlice);

  return (
    <div className=" lg:hidden">
      <Drawer
        opened={mobileSideToggle}
        onClose={togglerClick}
        className=" lg:hidden"
        size="275px"
        withCloseButton={false}
        overlayProps={{ opacity: 0.5 }}
        transitionProps={{ transition: "slide-right", duration: 300 }}
      >
        <div className=" flex flex-col gap-8 font-poppins">
          <div>
            <div className=" m-4 flex items-center gap-2 text-xl text-[--text-color]">
              <Link to={`/`}>
                <div className=" flex items-center gap-3">
                  <img
                    className=" w-10"
                    src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
                    alt=""
                  />
                  <h1 className=" text-xl">Contacts</h1>
                </div>
              </Link>
            </div>

            <ul>
              <li>
                <NavLink
                  onClick={togglerClick}
                  to={"/"}
                  className={"side-link"}
                >
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
                <NavLink
                  onClick={togglerClick}
                  to={"/favorite"}
                  className={"side-link"}
                >
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
                <NavLink
                  onClick={togglerClick}
                  to={"/frequent"}
                  className={"side-link"}
                >
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
                <Link onClick={togglerClick} className={"side-link"}>
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
      </Drawer>
    </div>
  );
};

export default MobileSideBar;
