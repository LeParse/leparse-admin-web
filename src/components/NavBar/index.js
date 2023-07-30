import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import { m } from "framer-motion";

import { useGlobal } from "../../contexts/global";

import logo from "../../assets/images/logo.png";
import logoutIcon from "../../assets/images/logout.png";

import realTimeIcon from "../../assets/icons/real-time.png";
import realTimeActiveIcon from "../../assets/icons/real-time-active.png";
import loyaltyIcon from "../../assets/icons/loyalty.png";
import loyaltyActiveIcon from "../../assets/icons/loyalty-active.png";
import settingsIcon from "../../assets/icons/settings.png";
import settingsActiveIcon from "../../assets/icons/settings-active.png";

import { Container, PageLink, PageSelector, Footer } from "./styles";

const NavBar = () => {
  const { logout } = useGlobal();

  const [currentPage, setCurrentPage] = useState(0);

  let pageSelectorRef = useRef();

  function clickPageLink() {
    let page = window.location.pathname.replace("/app/", "");

    switch (page) {
      case "real-time":
        setCurrentPage(0);
        break;
      case "loyalty":
        setCurrentPage(1);
        break;
      case "settings":
        setCurrentPage(2);
        break;
      default:
        break;
    }
  }

  useEffect(clickPageLink, []);

  if (
    window.location.pathname.includes("/login") ||
    window.location.pathname.includes("/create-password")
  ) {
    return null;
  }

  return (
    <m.div
      initial={{
        x: "-8rem",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "-8rem",
      }}
      transition={{
        type: "linear",
      }}
    >
      <Container>
        <img id="logo" src={logo} alt="Logo" draggable={false} />

        <div className="pageLinks">
          <PageSelector
            style={{
              top: `${64 * currentPage + 16 * currentPage}px`,
            }}
            ref={pageSelectorRef}
          />

          <PageLink
            className={
              window.location.pathname
                .replace("/app/", "")
                .includes("real-time")
                ? "active"
                : ""
            }
            onClick={clickPageLink}
          >
            <Link to="/app/real-time">
              <img
                src={currentPage === 0 ? realTimeActiveIcon : realTimeIcon}
                alt="Real Time"
                draggable={false}
              />
              <h1>Real Time</h1>
            </Link>
          </PageLink>

          <PageLink
            className={
              window.location.pathname.replace("/app/", "").includes("loyalty")
                ? "active"
                : ""
            }
            onClick={clickPageLink}
          >
            <Link to="/app/loyalty">
              <img
                src={currentPage === 1 ? loyaltyActiveIcon : loyaltyIcon}
                alt="Loyalty"
                draggable={false}
              />
              <h1>Loyalty</h1>
            </Link>
          </PageLink>

          <PageLink
            className={
              window.location.pathname.replace("/app/", "").includes("settings")
                ? "active"
                : ""
            }
            onClick={clickPageLink}
          >
            <Link to="/app/settings">
              <img
                src={currentPage === 2 ? settingsActiveIcon : settingsIcon}
                alt="Settings"
                draggable={false}
              />
              <h1>Configurações</h1>
            </Link>
          </PageLink>
        </div>

        <Footer>
          <Link id="logout" to="/login" onClick={logout}>
            <img src={logoutIcon} alt="Sair" draggable={false} />
            Sair
          </Link>

          <p id="version">LeParse Admin - v1.0.0</p>
        </Footer>
      </Container>
    </m.div>
  );
};

export default NavBar;
