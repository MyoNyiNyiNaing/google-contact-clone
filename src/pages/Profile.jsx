import { Button, PasswordInput } from "@mantine/core";
import React, { useState } from "react";
import { ImPencil } from "react-icons/im";
import { useChangePasswordMutation, useGetProfileQuery } from "../redux/api/userApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const token = Cookies.get("token")
  const {data, isLoading} = useGetProfileQuery(token)
  const navigate = useNavigate()

  const [changePassword, {isLoading : isPasswordChangeLoading}] = useChangePasswordMutation()

  const [current_password, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState({})

  console.log(error);

  const changePasswordHandler = async(e) => {
    e.preventDefault()
    const userPassword = {current_password, password, password_confirmation}
    const data = await changePassword({token, userPassword})
    console.log(data);
    if(data?.data?.success){
      navigate('/login')
    }else {
      setError(data?.error?.data?.errors);
    }
  }
  return (
    <div className=" max-md:px-5 py-10 w-full md:w-[75%] mx-auto">
      {/* top section  */}

      <div className=" mb-10">
        <h1 className=" mb-5 text-[25px] font-[500] text-gray-700">
          Your Preferences
        </h1>
        <div className=" flex items-center gap-8 shadow-lg p-5">
          <div className=" w-12 h-12 text-[20px] md:w-20 md:h-20 md:text-[35px] bg-blue-500 text-white rounded-full flex items-center justify-center">
            {data?.user?.name.split("")[0].toLowerCase()}
          </div>
          <div className=" w-[80%]">
            <div className=" text-xl font-[500] text-gray-700 flex items-center justify-between">
              <p>{data?.user?.name}</p>
              <ImPencil className=" text-sm" />
            </div>
            <hr class="md:my-2 2xl:my-2 border-[1.5px] border-gray-500 my-1 border-dotted"></hr>
            <div className=" text-sm font-[500] text-gray-500 flex items-center justify-between">
              <p>{data?.user?.email}</p>
              <ImPencil className=" text-sm" />
            </div>
          </div>
        </div>
      </div>

      <hr class="md:my-2 2xl:my-2 border-[1.5px] border-gray-300 my-1 border-dotted"></hr>

      {/* bottom section  */}

      <div className=" mt-10">
        <h1 className=" text-[25px] font-[500] text-gray-700 mb-10">
          Change your password
        </h1>

        <div>
          <form onSubmit={changePasswordHandler} className=" space-y-5">
            <div className=" sm:flex justify-between items-center gap-20">
              <label
                htmlFor="currentPw"
                className=" w-[200px] text-center text-[18px] text-gray-500"
              >
                Current Password
              </label>
              <div className=" flex-grow">
                <PasswordInput
                error={error?.current_password && error?.current_password[0]}
                value={current_password} onChange={(e)=> setCurrentPassword(e.target.value)} id="currentPw" placeholder="Current Password" size="md" />
              </div>
            </div>

            <div className=" sm:flex justify-between items-center gap-20">
              <label
                htmlFor="newPw"
                className=" w-[200px] text-center text-[18px] text-gray-500"
              >
                New Password
              </label>
              <div className=" flex-grow">
                <PasswordInput
                error={error?.password && error?.password[0]}
                value={password} onChange={(e)=> setPassword(e.target.value)} id="newPw" placeholder="New Password" size="md" />
              </div>
            </div>

            <div className=" sm:flex justify-between items-center gap-20">
              <label
                htmlFor="confirmPw"
                className=" w-[200px] text-center text-[18px] text-gray-500"
              >
                Confirm Password
              </label>
              <div className=" flex-grow">
                <PasswordInput
                error={error?.password && error?.password[1]}
                value={password_confirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)} id="confirmPw" placeholder="Confirm Password" size="md" />
              </div>
            </div>

          <div className=" sm:flex justify-between items-center gap-20">
            <div className=" w-[200px]"></div>
            <div className=" flex-grow">
                <Button type="submit" color="indigo" size="md" className=" bg-blue-500 w-full">
                {isPasswordChangeLoading && (
                  <ClipLoader color="#fff" size={15} className=" mr-2" />
                )}
                  Change Password</Button>
              </div>
          </div>
              
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
