/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <>
      {user?.token ? (
        <div className="bg-primary">
          <NavBar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AppLayout;
