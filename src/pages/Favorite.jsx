import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import TableRow from "../components/TableRow";
import Lottie from 'lottie-react'
import animationData from '../lotties/animation_nothing_found.json'

const Favorite = () => {
  const navigate = useNavigate();
  const { favorite } = useSelector((store) => store.contactSlice);

 

  if (!favorite.length) {
    return (
      <>
        <div className=" flex items-center justify-center min-h-[calc(100vh-110px)]">
        <div className=" max-w-[400px] ">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* create btn  */}
      <div
        onClick={() => navigate("/create")}
        className=" fixed bottom-8 right-8 lg:hidden p-3 rounded-full cursor-pointer"
        style={{
          boxShadow:
            "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path fill="#34A853" d="M16 16v14h4V20z"></path>
          <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
          <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
          <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
      </div>
      <div className=" p-5 space-y-4 text-[--text-color]">
        {/* top bar  */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center text-sm font-[500]">
          <div className="">Name</div>
          <div className=" text-center max-md:hidden">Email</div>
          <div className=" text-center  max-lg:hidden">Phone number</div>
          <div className=" flex justify-end md:justify-center items-center gap-5">
            <Tooltip
              transitionProps={{ transition: "fade", duration: 300 }}
              label="Print"
              position="bottom"
              openDelay={500}
            >
              <div>
                <span className=" material-symbols-outlined text-lg cursor-pointer">
                  print
                </span>
              </div>
            </Tooltip>
            <Tooltip
              transitionProps={{ transition: "fade", duration: 300 }}
              label="Upload"
              position="bottom"
              openDelay={500}
            >
              <div>
                <span className=" material-symbols-outlined text-lg cursor-pointer">
                  upload
                </span>
              </div>
            </Tooltip>
            <Tooltip
              transitionProps={{ transition: "fade", duration: 300 }}
              label="List settings"
              position="bottom"
              openDelay={500}
            >
              <div>
                <BsThreeDotsVertical className=" text-lg cursor-pointer" />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className=" bg-gray-300 h-[0.5px]"></div>

        <div className=" flex items-center justify-between gap-10 text-[12px] font-[500]">
          <h4 className="uppercase">Contact ({favorite?.length})</h4>
        </div>

        {/* map  */}
        <div className=" contact-table text-sm ">
          {favorite?.map((contact) => (
            <TableRow key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
