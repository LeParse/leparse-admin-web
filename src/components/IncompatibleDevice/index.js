import { AnimatedPage } from "@leparse/ui";

import { IoPhoneLandscape } from "react-icons/io5";

import adminLogo from "../../assets/images/admin-logo.png";

import { Container } from "./styles";

const IncompatibleDevice = () => {
  return (
    <AnimatedPage initial={{ opacity: 1, x: 0 }}>
      <Container>
        <IoPhoneLandscape className="image" size={72} />
        <h1 className="main_text">
          Este dispositivo ainda não tem suporte ao LeParse Admin.
        </h1>
        <img src={adminLogo} alt="Logo" draggable={false} />
      </Container>
    </AnimatedPage>
  );
};

export default IncompatibleDevice;
