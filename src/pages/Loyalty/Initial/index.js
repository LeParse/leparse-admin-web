import { useNavigate } from "react-router-dom";

import { useLoyalty } from "../../../contexts/loyalty";

import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import ListedUser from "../../../components/ListedUser";
import AnimatedPage from "../../../components/AnimatedPage";
import NoContent from "../../../components/NoContent";
// import ListedStore from "../../../components/ListedStore";

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

const Loyalty = () => {
  const { users } = useLoyalty();

  const navigate = useNavigate();

  function seeMoreUsers() {
    navigate("/app/loyalty/users");
  }

  function seeMoreStores() {}

  return (
    <AnimatedPage>
      <Container>
        <Title>
          <p>Loyalty</p>
        </Title>

        <Block
          style={{
            gridArea: "users",
            width: 500,
          }}
        >
          <p className="blockTitle">Usuários</p>

          <Spacer />

          <div className="usersList">
            {users?.map((user) => (
              <ListedUser
                key={user._id}
                name={user.name}
                stores={user.unities}
                id={user._id}
              />
            ))}
            {users.length === 0 && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <NoContent
                  style={{
                    p: {
                      fontSize: "1.25rem",
                    },
                    svg: {
                      width: "1.5rem",
                      height: "1.5rem",
                    },
                  }}
                />
              </div>
            )}
          </div>

          <div className="seeMore" onClick={seeMoreUsers}>
            <p>Ver todos</p>

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
    </AnimatedPage>
  );
};

export default Loyalty;
