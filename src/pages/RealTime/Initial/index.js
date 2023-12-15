import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimationControls } from "framer-motion";

import Block from "../../../components/Block";
import ListedUser from "../../../components/ListedUser";
// import ListedStore from "../../../components/ListedStore";

import { AnimatedPage, Spacer } from "@leparse/ui";

import { SlArrowRight } from "react-icons/sl";

import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPie,
  Area,
} from "victory";

import colors from "../../../global/colors";
import { Container, Title } from "./styles";

const RealTime = () => {
  const controls = useAnimationControls();
  const navigate = useNavigate();

  function seeMoreUsers() {
    controls
      .start({
        opacity: 0,
        x: "-2.5vw",
      })
      .then(() => {
        navigate("/app/real-time/users");
      });
  }

  function seeMoreStores() {}

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
    });
  }, []);

  return (
    <AnimatedPage animate={controls}>
      <Container>
        <Title>
          <p>Real Time</p>
        </Title>

        <Block
          style={{
            gridArea: "users",
          }}
        >
          <p className="blockTitle">Usuários</p>

          <Spacer />

          <div className="usersList">
            <ListedUser
              name="Igor Augusto Gomes de Melo"
              stores={["Aricanduva", "Campo Belo", "Bela Vista"]}
              id={"213ldsa"}
            />
            <ListedUser
              name="Igor Augusto Gomes de Melo"
              stores={["Aricanduva", "Campo Belo", "Bela Vista"]}
              id={"2193813jsndjk"}
            />
          </div>

          <div className="seeMore" onClick={seeMoreUsers}>
            <p>Ver todos</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>

        <Block
          style={{
            gridArea: "vouchers",
          }}
        >
          <p className="blockTitle">Usuários</p>

          <Spacer />

          <div className="seeMore" onClick={seeMoreUsers}>
            <p>Ver todos</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>

        <Block
          style={{
            gridArea: "tuitions",
          }}
        >
          <p className="blockTitle">Mensalidades</p>

          <Spacer />

          <div className="tuitions">
            <p>Você possui 2 mensalidades pendentes!</p>
            <p>Pague e evite o congelamento</p>
          </div>

          <div className="seeMore">
            <p>Ver detalhes</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(0.5rem)",
            }}
          >
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: 32,
                fontWeight: 300,
                color: colors.black,
                textShadow: "0 0 42px black",
              }}
            >
              Em breve...
            </p>
          </div>
        </Block>
      </Container>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(7.1px)",
          zIndex: 999,
        }}
      >
        <p
          style={{
            fontFamily: "Raleway",
            fontSize: "4rem",
            fontWeight: 300,
            color: colors.white,
            background: colors.black,
            padding: "3rem",
            borderRadius: "3rem",
            boxShadow: "0 0 2rem -0.5rem rgba(0,0,0,0.5)",
          }}
        >
          Em breve...
        </p>
      </div>
    </AnimatedPage>
  );
};

export default RealTime;
