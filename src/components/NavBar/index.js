import { useState, useRef } from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import logout from "../../assets/images/logout.png";

import realTimeIcon from "../../assets/images/real-time.png";
import realTimeActiveIcon from "../../assets/images/real-time-active.png";
import loyaltyIcon from "../../assets/images/loyalty.png";
import loyaltyActiveIcon from "../../assets/images/loyalty-active.png";

import { Container, PageLink, PageSelector, Footer } from "./styles";

const NavBar = () => {
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
      default:
        break;
    }
  }

  return (
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
            window.location.pathname.replace("/app/", "") === "real-time"
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
            window.location.pathname.replace("/app/", "") === "loyalty"
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
      </div>

      <Footer>
        <Link id="logout" to="/login">
          <img src={logout} alt="Sair" draggable={false} />
          Sair
        </Link>

        <p id="version">LeParse Admin - v1.0.0</p>
      </Footer>
    </Container>
  );
};

export default NavBar;
