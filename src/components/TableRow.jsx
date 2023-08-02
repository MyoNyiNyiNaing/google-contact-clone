import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { getFrequent, toggleFav } from "../redux/services/contactSlice";

const TableRow = ({ contact, deleteContactHandler }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedPopover, setOpenedPopover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favorite } = useSelector((store) => store.contactSlice);

  const isFavItem = favorite?.find((item) => item.id == contact.id);
  return (
    <>
      <DeleteModal id={contact.id} opened={opened} close={close} isFavItem={isFavItem}/>
      <div
        onClick={(e) => {
          navigate(`/detail/${contact?.id}`);
          dispatch(getFrequent(contact));
        }}
        className="row cursor-pointer group h-[60px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center hover:bg-[--hover-color]"
      >
        <div className="flex items-center">
          <div className=" w-[50px]  group-hover:hidden">
            <div className="profile text-base ml-2 w-9 h-9 rounded-full text-white flex items-center justify-center">
              {contact.name.split("")[0].toLowerCase()}
            </div>
          </div>
          <div className=" w-[50px] hidden group-hover:flex items-center">
            <div className=" flex text-gray-400">
              <BsThreeDotsVertical />
              <BsThreeDotsVertical className=" -ml-[10px]" />
            </div>
            <div className=" -ml-3 hover:bg-[#00000010] w-9 h-9 rounded-full flex justify-center items-center">
              <input type="checkbox" className=" w-4 h-4 " name="" id="" />
            </div>
          </div>
          <div className=" ml-2">{contact?.name}</div>
        </div>

        <div className="text-center max-md:hidden">{contact?.email}</div>
        <div className="text-center  max-lg:hidden">{contact?.phone}</div>

        <div className=" text-lg max-md:hidden group-hover:opacity-100 flex md:justify-center items-center gap-5">
          <div>
            {isFavItem ? (
              <AiFillStar
              className=" text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFav(contact));
                }}
              />
            ) : (
              <AiOutlineStar
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFav(contact));
                }}
              />
            )}
          </div>
          <div
            className="update"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/update/${contact?.id}`);
            }}
          >
            <BiPencil />
          </div>
          <div>
            <Popover
              opened={openedPopover}
              onChange={setOpenedPopover}
              shadow="lg"
              transitionProps={{ transition: "fade", duration: 300 }}
            >
              <Popover.Target>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenedPopover(!openedPopover);
                  }}
                >
                  <BsThreeDotsVertical />
                </div>
              </Popover.Target>
              <Popover.Dropdown className=" px-0">
                <div className=" text-gray-500 text-sm">
                  <div className=" flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
                    <span className=" material-symbols-outlined text-xl cursor-pointer">
                      print
                    </span>
                    Print
                  </div>
                  <div className=" flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
                    <span className=" material-symbols-outlined text-xl cursor-pointer">
                      upload
                    </span>
                    Export
                  </div>
                  <div className=" flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
                    <span className="material-symbols-outlined text-xl">
                      archive
                    </span>
                    Hide from contact
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                      setOpenedPopover(!openedPopover);
                    }}
                    className=" flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]"
                  >
                    <span className="material-symbols-outlined text-xl">
                      delete
                    </span>
                    Delete
                  </div>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableRow;
