import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

import Login from "./pages/Login";
import RealTime from "./pages/RealTime";
import Loyalty from "./pages/Loyalty";

const Layout = () => {
  if (window.location.pathname === "/app") {
    window.location.pathname = "/app/real-time";
  }

  return (
    <div className="layoutGrid">
      <div
        style={{
          gridArea: "menu",
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          gridArea: "content",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app/*" element={<Layout />}>
          <Route path="real-time" element={<RealTime />} />
          <Route path="loyalty" element={<Loyalty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
