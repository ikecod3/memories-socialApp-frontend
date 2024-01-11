/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components";
import { useSelector } from "react-redux";

/**
 * AppLayout component serves as the main layout for the entire application.
 * It checks for the presence of a user token and renders the application content
 * (NavBar and Outlet) if the user is authenticated. If not, it redirects the user
 * to the login page, preserving the original location to allow for a smooth login flow.
 */
const AppLayout = () => {
  // Extract user information from Redux state
  const { user } = useSelector((state) => state.user);
  // Get the current location using React Router's useLocation hook
  const location = useLocation();

  return (
    <>
      {/* Render the entire application layout */}
      {user?.token ? (
        <div className="bg-primary">
          {/* Display the navigation bar */}
          <NavBar />
          {/* Render the nested routes using Outlet */}
          <Outlet />
        </div>
      ) : (
        // Redirect to the login page if the user is not authenticated
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AppLayout;
