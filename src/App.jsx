/* eslint-disable no-unused-vars */
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages/index";
import { useSelector } from "react-redux";
import AppLayout from "./layout/AppLayout";

function Layout() {
  // fecth the user from state
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  // console.log(user);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
const App = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        {/* protected route --------------- */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* ------------------------------- */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
