import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

import Login from "./pages/Login";

//#region Real Time

import RealTime from "./pages/RealTime/Initial";

//#endregion

//#region Loyalty

import Loyalty from "./pages/Loyalty/Initial";

//#endregion

//#region Settings

import Settings from "./pages/Settings/Initial";

//#endregion

const Layout = () => {
  if (
    window.location.pathname === "/app" ||
    window.location.pathname === "/app/"
  ) {
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
          <Route path="real-time">
            <Route index element={<RealTime />} />
          </Route>
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
