import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import ListedUser from "../../../components/ListedUser";
import ListedStore from "../../../components/ListedStore";

import { SlArrowRight } from "react-icons/sl";

import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryPie,
  Area,
} from "victory";

import colors from "../../../global/colors";
import { Container } from "./styles";

const RealTime = () => {
  function seeMoreUsers() {
    let rootContainer = document.getElementById("root-container");
    let usersContainer = document.getElementById("users-container");

    rootContainer.classList.toggle("root-expanded");

    usersContainer.classList.toggle("expanded");
  }

  function seeMoreStores() {}

  return (
    <Container id="root-container">
      <Block
        style={{
          gridArea: "users",
          zIndex: 99,
        }}
        id="users-container"
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
          gridArea: "stores",
        }}
      >
        <p className="blockTitle">Lojas</p>

        <Spacer />

        <div className="storesList">
          <ListedStore name="Aricanduva" status="online" />
          <ListedStore name="Santo Amaro" status="offline" />
          <ListedStore name="Campo Belo" status="pending-payment" />
          <ListedStore name="Bela Vista" status="pending-setup" />
        </div>

        <div className="seeMore" onClick={seeMoreStores}>
          <p>Ver todas</p>

          <SlArrowRight color={colors.black} size={18} />
        </div>
      </Block>

      <Block
        style={{
          gridArea: "metrics",
        }}
      >
        <p className="blockTitle">Métricas</p>

        <Spacer />

        <div
          style={{
            width: "100%",
            height: 224,
          }}
        >
          <VictoryChart
            style={{
              parent: {
                fontSize: 24,
              },
            }}
            theme={VictoryTheme.material}
            width={720}
          >
            <VictoryArea
              style={{
                data: { fill: "#000000bf" },
              }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 6 },
              ]}
              dataComponent={
                <Area
                  events={{
                    onMouseEnter: (e) => {},
                  }}
                />
              }
            />
            <VictoryArea
              style={{ data: { fill: "#c43a31bf" } }}
              data={[
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 1, y: 5 },
                { x: 5, y: 2 },
                { x: 5, y: 1 },
              ]}
            />
          </VictoryChart>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            flexWrap: "wrap",
          }}
        >
          <VictoryPie
            padAngle={2}
            innerRadius={4}
            labelRadius={({ innerRadius }) => innerRadius + 48}
            style={{
              parent: {
                flex: 1 / 3,
              },
              labels: {
                fontSize: 32,
                fill: "white",
                fontFamily: "Raleway",
                fontWeight: "bold",
              },
            }}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 },
            ]}
          />

          <VictoryPie
            padAngle={2}
            innerRadius={4}
            labelRadius={({ innerRadius }) => innerRadius + 48}
            style={{
              parent: {
                flex: 1 / 3,
              },
              labels: {
                fontSize: 32,
                fill: "white",
                fontFamily: "Raleway",
                fontWeight: "bold",
              },
            }}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 },
            ]}
          />

          <VictoryPie
            padAngle={2}
            innerRadius={4}
            labelRadius={({ innerRadius }) => innerRadius + 48}
            style={{
              parent: {
                flex: 1 / 3,
              },
              labels: {
                fontSize: 32,
                fill: "white",
                fontFamily: "Raleway",
                fontWeight: "bold",
              },
            }}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 },
            ]}
          />
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
  );
};

export default RealTime;
