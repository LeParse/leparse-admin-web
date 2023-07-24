import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";

import NavBar from "./components/NavBar";

import Login from "./pages/Login";

//#region Real Time
import RealTime from "./pages/RealTime/Initial";
//#endregion

//#region Loyalty
import Loyalty from "./pages/Loyalty/Initial";
import LoyaltyUsers from "./pages/Loyalty/Users";
//#endregion

//#region Settings
import Settings from "./pages/Settings/Initial";
//#endregion

//#region Providers
import LoyaltyProvider from "./contexts/loyalty";
//#endregion

//#region Outlets
const LoyaltyOutlet = () => {
  return (
    <LoyaltyProvider>
      <Outlet />
    </LoyaltyProvider>
  );
};
//#endregion

const AnimatedRoutes = () => {
  const location = useLocation();

  if (
    location.pathname === "/app" ||
    location.pathname === "/app/" ||
    location.pathname === "/"
  ) {
    window.location.pathname = "/app/real-time";
  }

  return (
    <LazyMotion features={domMax}>
      <div className="layoutGrid">
        <m.div
          style={{
            gridArea: "menu",
          }}
          initial={{
            x: "0rem",
            opacity: 0,
          }}
          animate={{
            x: "0rem",
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            mass: 0.4,
          }}
        >
          <NavBar />
        </m.div>
        <div
          style={{
            gridArea: "content",
          }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/login" element={<Login />} />
              <Route path="/app/*">
                <Route path="real-time">
                  <Route index element={<RealTime />} />
                </Route>
                <Route path="loyalty" element={<LoyaltyOutlet />}>
                  <Route index element={<Loyalty />} />
                  <Route path="users" element={<LoyaltyUsers />} />
                </Route>
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default Router;
