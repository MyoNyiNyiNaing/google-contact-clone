import { Popover, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";
import { removeAllFav, removeAllFrequent, setSearchTerm } from "../redux/services/contactSlice";

const Header = ({ togglerClick, toggle }) => {
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate()

  const user = JSON.parse(Cookies.get("user"))
  const token = Cookies.get("token")

  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    inputRef.current.focus();
  }, [search]);

  const handleSearchClick = () => {
    setSearch((pre) => !pre);
  };

  const logoutHandler = async() => {
    const {data} = await logout(token)
    dispatch(removeUser())
    if(data?.success){
      navigate('/login')
      dispatch(removeAllFrequent())
      dispatch(removeAllFav())
    }

  }
  return (
    <div
      className={` ${
        search ? "flex items-center" : "flex justify-between"
      }  text-[--text-color] px-3 h-[70px] items-center bg-white sticky top-0 z-50  font-poppins md:grid md:grid-cols-4 lg:grid-cols-5`}
    >
      {/* left logo */}
      <div className={`${search ? "hidden" : "block"} flex items-center gap-1`}>
        <Tooltip
          transitionProps={{ transition: "fade", duration: 300 }}
          label="Main menu"
          openDelay={500}
        >
          {/* Desktop menu  */}
          <div
            onClick={togglerClick}
            className=" p-3 hover:bg-[--hover-color] rounded-full cursor-pointer"
          >
            <svg
              className=" w-6"
              focusable="false"
              fill="#5F6368"
              viewBox="0 0 24 24"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>
        </Tooltip>
        <Link to={`/`}>
          <div className=" flex items-center gap-3">
            <img
              className=" w-10"
              src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
              alt=""
            />
            <h1 className=" max-sm:hidden text-xl">Contacts</h1>
          </div>
        </Link>
      </div>

      {/* search input  */}
      <div
        className={`${
          search ? " flex-grow w-full flex items-center mr-5" : "hidden"
        }`}
      >
        <form className=" flex-grow flex items-center gap-3 bg-[--hover-color]  px-3 py-1 rounded-lg focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-xl focus-within:rounded-b-none">
          <Tooltip
            transitionProps={{ transition: "fade", duration: 300 }}
            label="Close search"
            openDelay={500}
          >
            <button
              type="button"
              className=" p-2 rounded-full hover:bg-[--gray-color]"
              onClick={handleSearchClick}
            >
              <IoArrowBackSharp size={25} />
            </button>
          </Tooltip>
          <input
          onChange={(e)=> dispatch(setSearchTerm(e.target.value))}
            autoFocus
            ref={inputRef}
            type="text"
            className=" outline-none bg-transparent w-full"
          />
        </form>
      </div>

      {/* center search bar  */}
      <div className=" max-md:hidden md:col-span-2 lg:col-span-3 mx-10">
        <form>
          <div className="  flex items-center gap-3 bg-[--hover-color]  px-3 py-1 rounded-lg focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-xl focus-within:rounded-b-none">
            <Tooltip
              transitionProps={{ transition: "fade", duration: 300 }}
              label="search"
              openDelay={500}
            >
              <button className=" p-2 rounded-full hover:bg-[--gray-color]">
                <svg
                  focusable="false"
                  fill="#5F6368"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                  <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
              </button>
            </Tooltip>
            <input
            onChange={(e)=> dispatch(setSearchTerm(e.target.value))}
              type="text"
              className=" outline-none bg-transparent"
              placeholder="Search"
            />
          </div>
        </form>
      </div>

      {/* right menu  */}
      <div className=" flex items-center justify-end lg:gap-2">
        <Tooltip
          transitionProps={{ transition: "fade", duration: 300 }}
          label="Search"
          openDelay={500}
          className=""
        >
          <button
            type="button"
            onClick={handleSearchClick}
            className={`${
              search && "hidden"
            }  md:hidden p-2 rounded-full hover:bg-[--hover-color]`}
          >
            <svg
              focusable="false"
              fill="#5F6368"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
              <path d="M0,0h24v24H0V0z" fill="none"></path>
            </svg>
          </button>
        </Tooltip>

        <Tooltip
          transitionProps={{ transition: "fade", duration: 300 }}
          label="Help menu"
          openDelay={500}
        >
          <button className=" p-3 focus:bg-[--gray-color] rounded-full">
            <svg
              fill="#5F6368"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="NSy2Hd cdByRd RTiFqe null"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
            </svg>
          </button>
        </Tooltip>

        <Tooltip
          transitionProps={{ transition: "fade", duration: 300 }}
          label="Settings menu"
          openDelay={500}
          className=""
        >
          <button className=" md:mr-5 p-3 focus:bg-[--gray-color] rounded-full">
            <svg
              fill="#5F6368"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="NSy2Hd cdByRd RTiFqe null"
            >
              <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>
              <circle cx="12" cy="12" r="3.5"></circle>
            </svg>
          </button>
        </Tooltip>

        <Tooltip
          transitionProps={{ transition: "fade", duration: 300 }}
          label="Google apps"
          openDelay={500}
          className=" "
        >
          <button className=" mr-2 max-md:hidden  p-2 hover:bg-[--hover-color] rounded-full">
            <svg
              fill="#5F6368"
              width="25"
              height="25"
              className="gb_h"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
            </svg>
          </button>
        </Tooltip>
        <Popover trapFocus position="bottom" shadow="lg">
          <Popover.Target>
            <div className=" cursor-pointer w-[40px] h-[40px] rounded-full hover:bg-[--hover-color] flex items-center justify-center">
              <div className=" bg-[#78909C] w-[80%] h-[80%] rounded-full flex items-center justify-center text-white">
                {user?.name.split("")[0].toLowerCase()}
              </div>
            </div>
          </Popover.Target>
          <Popover.Dropdown className=" bg-[#f5fafc] p-2 rounded-[30px]">
            <div className=" font-roboto">
              <div className=" bg-white p-5 rounded-[25px] rounded-b-sm mb-[2px]">
                <div className=" flex items-center gap-5">
                  <div className=" w-16 h-16 text-[30px] rounded-full bg-[#78909C] text-white flex items-center justify-center">
                  {user?.name.split("")[0].toLowerCase()}
                  </div>
                  <div>
                    <p className=" text-sm font-[500]">{user?.name}</p>
                    <p className=" text-[12px] text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className=" ml-20">
                  <button onClick={()=> navigate('/profile')} className=" outline-none px-4 py-2 border border-gray-700 hover:bg-gray-200 rounded-lg text-sm font-[500]">
                    Manage your Google Account
                  </button>
                </div>
              </div>

              <div className=" bg-white px-5 py-3 rounded-[25px] rounded-t-sm">
                <button className=" ml-5 text-sm font-[500] flex items-center gap-10">
                  <span className="material-symbols-outlined text-[#20213F]">person_add</span>Add
                  another account
                </button>
              </div>

              <div className=" px-5 py-3 border-b border-gray-200">
                <button onClick={logoutHandler} className=" ml-5 text-sm font-[500] flex items-center gap-10">
                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" className=" NMm5M"><path fill="#20213F" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>Sign out
                </button>
              </div>

              <div className=" text-[12px] text-center py-3">Privacy policy . Term of service</div>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
