import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacts from "../pages/Contacts";
import Detail from "../pages/Detail";
import Create from "../pages/Create";
import Update from "../pages/Update";
import Frequent from "../pages/Frequent";
import RouteGuard from "./RouteGuard";
import Favorite from "../pages/Favorite";
import Profile from "../pages/Profile";
import Error from "../pages/Error";

const Path = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            }
          >
            <Route index element={<Contacts />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/frequent" element={<Frequent />} />
            <Route path="create" element={<Create />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="update/:id" element={<Update />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Path;
