/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <>
      {/* entire application layout. if a user token exit. render the app children --outlet. 
    otherwise naviagete the attempting user back to login */}
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
