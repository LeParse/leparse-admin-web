import Block from "../../components/Block";
import Spacer from "../../components/Spacer";
import ListedUser from "../../components/ListedUser";
import ListedStore from "../../components/ListedStore";

import { SlArrowRight } from "react-icons/sl";

import colors from "../../global/colors";
import { Container } from "./styles";

const RealTime = () => {
  return (
    <Container>
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

        <div className="seeMore">
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

        <div className="seeMore">
          <p>Ver todas</p>

          <SlArrowRight color={colors.black} size={18} />
        </div>
      </Block>

      <Block
        style={{
          gridArea: "metrics",
        }}
      >
        bloco 3
      </Block>

      <Block
        style={{
          gridArea: "tuitions",
        }}
      >
        bloco 4
      </Block>
    </Container>
  );
};

export default RealTime;
