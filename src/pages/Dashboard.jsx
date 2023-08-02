import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileSideBar from "../components/MobileSideBar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const [mobileSideToggle, setMoblieSideToggle] = useState(false);
  const togglerClick = () => {
    setSideBarToggle((show) => !show);
    setMoblieSideToggle((show) => !show);
  };
  return (
    <div className="flex flex-col">
      <Header togglerClick={togglerClick} />
      <div className="flex">
        <Sidebar sideBarToggle={sideBarToggle} togglerClick={togglerClick} />
        <MobileSideBar
          mobileSideToggle={mobileSideToggle}
          togglerClick={togglerClick}
        />
        <div
          className={`m-0 w-full flex flex-col min-h-[calc(100vh-70px)] transition-all duration-300 ${
            sideBarToggle ? "lg:ml-[292px]" : " lg:ml-0"
          }`}
        >
          {<Outlet />}
          <div className=" mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
