import { Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState({});

  const [createContact, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token")

  const validate = (values) => {
    let isValid = true;
    const errors = {};
    if (!values.name) {
      isValid = false;
      errors.name = "Name is a required field";
    }
    // if (!values.email) {
    //   isValid = false;
    //   errors.email = "Email is a required field";
    // } else if (!values.email.match(/^\S+@\S+$/)) {
    //   isValid = false;
    //   errors.email = "Invalid email";
    // }

    if (!values.phone) {
      isValid = false;
      errors.phone = "Phone is a required field";
    } else if (values.phone.length < 8) {
      isValid = false;
      errors.phone = "Phone must be greater than 8";
    }

    // if (!values.address) {
    //   isValid = false;
    //   errors.address = "Address is a required field";
    // }
    setFormError(errors);
    return isValid;
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const userData = { name, phone, email, address };
      if (validate(userData)) {
        const data = await toast.promise(createContact({ userData, token }), {
          loading: "Working...",
          success: "Create Contact Success",
          error: "Somthing Wrong!",
        });
        // console.log(data);
        setTimeout(() => {
          navigate("/");
        }, 900);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    
    <Toaster position="bottom-center" reverseOrder={false} />
    <div className=" font-poppins">
      {/* top section  */}

      <div className="border-b top-20 bg-white md:fixed w-full z-20">
        <div className="flex flex-col w-full  md:w-[70%] p-5">
          <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
            <button
              className=" self-start text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <RxCross2 />
            </button>

            <div
              onClick={() => setToggleModal(!toggleModal)}
              className=" w-[150px] h-[150px] flex items-center justify-center bg-sky-200 rounded-full"
            >
              <MdOutlineAddPhotoAlternate className=" text-3xl" />
            </div>

            <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
              <span className=" text-lg text-blue-700 cursor-pointer">
                <AiOutlinePlus />
              </span>
              Label
            </button>
          </div>
          <button
            form="create-form"
            type="submit"
            className="md:self-end md:m-0 self-center mt-5 text-sm px-7 py-2 bg-blue-700 text-white rounded-md"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>

      {/* add form  */}
      <div className=" md:mt-[250px] flex justify-center md:justify-start text-[--text-color]">
        <form
          id="create-form"
          onSubmit={submitHandler}
        >
          <div className=" m-5 md:m-10 space-y-8">
            <div className=" flex gap-5 group">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Name"
                openDelay={500}
                position="bottom"
              >
                <div className=" mt-[15px]">
                  <span className="material-symbols-outlined">person</span>
                </div>
              </Tooltip>
              <div className=" flex flex-col w-[220px] sm:w-[300px] md:w-[500px] gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoFocus
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Name
                  </label>
                </div>
                {formError?.phone && (
                  <small className=" text-red-500">{formError?.phone}</small>
                )}
              </div>
              <div
                onClick={() => setName("")}
                className=" mt-[10px] opacity-0 group-hover:opacity-100 w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center -ml-3 cursor-pointer"
              >
                <RxCross2 />
              </div>
            </div>
            <div className=" flex gap-5 group">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Phone"
                openDelay={500}
                position="bottom"
              >
                <div className=" mt-[15px]">
                  <span className="material-symbols-outlined">call</span>
                </div>
              </Tooltip>

              <div className=" flex flex-col w-[220px] sm:w-[300px] md:w-[500px] gap-2">
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    id="phone"
                    className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Phone
                  </label>
                </div>
                {formError?.phone && (
                  <small className=" text-red-500">{formError?.phone}</small>
                )}
              </div>

              <div
                onClick={() => setPhone("")}
                className=" mt-[10px] opacity-0 group-hover:opacity-100 w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center -ml-3 cursor-pointer"
              >
                <RxCross2 />
              </div>
            </div>
            <div className=" flex gap-5 group">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Email"
                openDelay={500}
                position="bottom"
              >
                <div className=" mt-[15px]">
                  <span className="material-symbols-outlined">mail</span>
                </div>
              </Tooltip>

              <div className=" flex flex-col gap-2  w-[220px] sm:w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Email
                  </label>
                </div>
                {formError?.email && (
                  <small className=" text-red-500">{formError?.email}</small>
                )}
              </div>
              <div
                onClick={() => setEmail("")}
                className=" mt-[10px] opacity-0 group-hover:opacity-100 w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center -ml-3 cursor-pointer"
              >
                <RxCross2 />
              </div>
            </div>
            <div className=" flex gap-5 group">
              <Tooltip
                transitionProps={{ transition: "fade", duration: 300 }}
                label="Address"
                openDelay={500}
                position="bottom"
              >
                <div className=" mt-[15px]">
                  <span className="material-symbols-outlined">contact_mail</span>
                </div>
              </Tooltip>

              <div className=" flex flex-col gap-2 w-[220px] sm:w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    id="address"
                    className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Address
                  </label>
                </div>
                {formError?.address && (
                  <small className=" text-red-500">{formError?.address}</small>
                )}
              </div>

              <div
                onClick={() => setAddress("")}
                className=" mt-[10px] opacity-0 group-hover:opacity-100 w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center -ml-3 cursor-pointer"
              >
                <RxCross2 />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Create;
