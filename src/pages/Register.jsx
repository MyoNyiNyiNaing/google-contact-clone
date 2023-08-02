import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { ClipLoader } from "react-spinners";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const nav = useNavigate();

  const [errors, setErrors] = useState({});

  const formHandler = async (e) => {
    e.preventDefault();
    const user = { name, email, password, password_confirmation };
    // console.log(user);
    const data = await register(user);
    if (data?.error?.data?.errors) {
      // console.log(data?.error?.data?.errors);
      setErrors(data?.error?.data?.errors);
    }
    if (data?.data?.success) {
      nav("/login", {state: {email, password}});
    }
  };

  return (
    <div className="flex items-center justify-center h-screen select-none">
      <div className="flex items-center justify-between px-10 py-5 my-5 md:my-0">
        <div className="hidden md:block w-[50%] h-auto">
          <img
            src="https://img.freepik.com/premium-vector/smiling-man-holding-smart-phone-wearing-casual-clothes-standing-showing-thumbs-up-positive-gesture-ok-sign-gesture-language-concept-illustration_270158-266.jpg?w=740"
            className="object-cover"
          />
        </div>

        <div className="shadow md:shadow-none px-5 py-4 w-[350px] lg:w-[35%] mx-auto">
          <div className="mb-8">
            <h1 className="font-bold text-2xl mb-4">Registration</h1>
            <p className="text-sm leading-tight">
              Get Started with Us: Sign Up and Experience a New Level of
              Convenience!
            </p>
          </div>
          <div>
            <form onSubmit={formHandler} className="flex flex-col gap-5">
              <div>
                <div className="relative">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="username"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="username"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Username
                  </label>
                </div>
                <small className="text-red-500">
                  {errors?.name ? errors.name[0] : ""}
                </small>
              </div>

              <div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Email
                  </label>
                </div>
                <small className="text-red-500">
                  {errors?.email ? errors.email[0] : ""}
                </small>
              </div>

              <div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  {showPassword ? (
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className=" cursor-pointer absolute bottom-[9px] right-5 w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full"
                    >
                      <AiOutlineEyeInvisible />
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className=" cursor-pointer absolute bottom-[9px] right-5 w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full"
                    >
                      <AiOutlineEye />
                    </div>
                  )}
                  <label
                    htmlFor="password"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Password
                  </label>
                </div>
                <small className="text-red-500">
                  {errors?.password ? errors.password[0] : ""}
                </small>
              </div>

              <div>
                <div className="relative">
                  <input
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    id="passwordConfirmation"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  {showConfirmPassword ? (
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className=" cursor-pointer absolute bottom-[9px] right-5 w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full"
                    >
                      <AiOutlineEyeInvisible />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className=" cursor-pointer absolute bottom-[9px] right-5 w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded-full"
                    >
                      <AiOutlineEye />
                    </div>
                  )}
                  <label
                    htmlFor="passwordConfirmation"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Confirm password
                  </label>
                </div>
                {/* <small className="text-red-500">
                  {errors?.password ? errors?.password[0] : ""}
                </small> */}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="auth-btn bg-blue-600 px-5 py-1 w-full text-white rounded-md"
              >
                {isLoading && (
                  <ClipLoader color="#fff" size={15} className=" mr-2" />
                )}
                Sign up
              </button>
              <div className="text-blue-400 flex justify-center text-sm gap-4">
                <p>Already have an account?</p>
                <Link to="/login">
                  <span className="cursor-pointer">Login here</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
// const validation = () => {
//   let errorText = {};
//   let isValid = true;
//   if (name.length < 2) {
//     isValid = false;
//     errorText["name"] = "name must be at least 3 characters";
//   }
//   if (email.length === 0) {
//     isValid = false;
//     errorText["email"] = "email required";
//   } else if (!email.match(/^\S+@\S+$/)) {
//     isValid = false;
//     errorText["email"] = "invalid email";
//   }

//   if (password.length < 8) {
//     isValid = false;
//     errorText["password"] = "password must have at least 8 characters";
//   }
//   if (password_confirmation !== password) {
//     isValid = false;
//     errorText["password_confirmation"] = "password does not match";
//   }
//   setErrors(errorText);
//   // console.log(isError);
//   return isValid;
// };
