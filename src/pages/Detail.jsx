import { Popover, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Cookies from "js-cookie";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import Loading from "../components/Loading";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../redux/services/contactSlice";
import {ImPencil} from 'react-icons/im'

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetSingleContactQuery({ id, token });

  const [opened, { open, close }] = useDisclosure(false);
  const [openedPopover, setOpenedPopover] = useState(false);

  // console.log(data);

  const { favorite } = useSelector((store) => store.contactSlice);

  const isFavItem = favorite.find((item) => item.id == data?.contact.id);
  const dispatch = useDispatch()

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

 

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
    {/* update btn  */}

    <div
        onClick={() => navigate(`/update/${id}`)}
        className=" fixed bottom-8 right-8 lg:hidden p-4 bg-blue-600 text-white rounded-full cursor-pointer"
        style={{
          boxShadow:
            "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
        }}
      >
        <ImPencil className=" text-2xl"/>
      </div>
      <DeleteModal id={id} opened={opened} close={close}/>
      <div className=" text-[--text-color] font-poppins max-w-[850px]">
        {/* top section  */}
        <div className="border-b top-20 bg-white w-full">
          <div className="flex flex-col w-full px-8 py-5">
            <div className=" md:hidden flex justify-between mb-5">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Back"
                openDelay={500}
                position="bottom"
              >
                <button
                  className=" self-start text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    class="NSy2Hd cdByRd RTiFqe undefined"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </button>
              </Tooltip>

              <div className=" flex items-center gap-5">
                <Tooltip
                  transitionProps={{ transition: "fade", duration: 300 }}
                  label="Star contact"
                  openDelay={500}
                  position="bottom"
                >
                  <div>
                    <AiOutlineStar className=" text-lg" />
                  </div>
                </Tooltip>
                <Tooltip
                  transitionProps={{ transition: "fade", duration: 300 }}
                  label="More actions"
                  openDelay={500}
                  position="bottom"
                >
                  <div>
                    <BsThreeDotsVertical className=" text-lg" />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Back"
                openDelay={500}
                position="bottom"
              >
                <button
                  className=" max-md:hidden self-start text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    class="NSy2Hd cdByRd RTiFqe undefined"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </button>
              </Tooltip>

              <div className=" text-[70px] text-white w-[150px] h-[150px] flex items-center justify-center bg-orange-500 rounded-full">
                {data?.contact?.name?.split("")[0].toLowerCase()}
              </div>

              <div className="">
                <h1 className=" text-center text-gray-700 text-2xl mb-2">
                  {data?.contact?.name}
                </h1>
                <button className=" mx-auto md:ml-0 hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                  <span className=" text-lg text-blue-700 cursor-pointer">
                    <AiOutlinePlus />
                  </span>
                  Label
                </button>
              </div>
            </div>
            <div className="max-md:hidden md:self-end md:m-0 self-center mt-5 flex items-center gap-5">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Star contact"
                openDelay={500}
                position="bottom"
              >
                <div className=" cursor-pointer">
                {isFavItem ? (
              <AiFillStar
              className=" text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFav(data?.contact));
                }}
              />
            ) : (
              <AiOutlineStar
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFav(data?.contact));
                }}
              />
            )}
                </div>
              </Tooltip>
              
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
                        className=" cursor-pointer"
                      >
                        <BsThreeDotsVertical />
                      </div>
                    </Popover.Target>
                    <Popover.Dropdown className=" px-0">
                      <div className=" text-gray-500 text-sm">
                        <div className=" cursor-pointer flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
                          <span className=" material-symbols-outlined text-xl cursor-pointer">
                            print
                          </span>
                          Print
                        </div>
                        <div className=" cursor-pointer flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
                          <span className=" material-symbols-outlined text-xl cursor-pointer">
                            upload
                          </span>
                          Export
                        </div>
                        <div className=" cursor-pointer flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]">
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
                          className=" cursor-pointer flex items-center gap-3 pl-5 pr-10 py-2 hover:bg-[--hover-color]"
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
              <button
                onClick={() => navigate(`/update/${id}`)}
                form="create-form"
                type="submit"
                className=" text-sm px-7 py-2 bg-blue-700 text-white rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* bottom section  */}
        <div className=" px-5 py-10 grid md:grid-cols-5 gap-5">
          <div className=" col-span-3 font-roboto space-y-1 bg-gray-100 py-4 px-5 rounded-xl">
            <h1 className=" font-[500] text-gray-700 font-poppins">
              Contact details
            </h1>
            <div className=" flex items-center gap-3 ">
              <span class="material-symbols-outlined text-xl">mail</span>
              <span className="text-blue-500 cursor-pointer text-sm">
                {data?.contact?.email || "Add email"}
              </span>
            </div>
            <div className=" flex items-center gap-3 ">
              <span class="material-symbols-outlined text-xl">call</span>
              <span className="text-blue-500 cursor-pointer text-sm">
                {data?.contact?.phone || "Add phone"}
              </span>
            </div>
            <div className=" flex items-center gap-3 ">
              <span class="material-symbols-outlined text-xl">
                contact_mail
              </span>
              <span className="text-blue-500 cursor-pointer text-sm">
                {data?.contact?.address || "Add address"}
              </span>
            </div>
          </div>

          <div className=" col-span-2 h-fit font-roboto space-y-2 bg-gray-100 py-4 px-5 rounded-xl">
            <div className=" flex items-center gap-3 font-[500] text-gray-700 font-poppins">
              History
              <span class="material-symbols-outlined text-base w-6 h-6 flex items-center justify-center rounded-full text-gray-500 font-[500] cursor-pointer hover:bg-gray-200 hover:text-gray-700">
                help
              </span>
            </div>

            <p className=" text-sm">
              Last edited • {formatDate(data?.contact.updated_at)}
            </p>

            <p className=" text-sm">
              Created at • {formatDate(data?.contact.created_at)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
