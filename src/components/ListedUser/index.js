import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";

import colors from "../../global/colors";

import { Container } from "./styles";

const ListedUser = ({ name, stores, id }) => {
  const navigate = useNavigate();

  function gotoUser() {
    navigate(`/user/${id}`);
  }

  return (
    <Container onClick={gotoUser}>
      <FaUser
        size={24}
        style={{
          gridArea: "icon",
          flexBasis: "7%",
        }}
      />
      <p className="name">{name}</p>
      <p className="stores">
        {stores.map((store, _i) => {
          if (_i !== stores.length - 1) {
            return `${store}, `;
          }

          return store;
        })}
      </p>
      <SlArrowRight
        size={18}
        color={colors.black}
        style={{
          gridArea: "details",
          flexBasis: "7%",
        }}
      />
    </Container>
  );
};

export default ListedUser;
