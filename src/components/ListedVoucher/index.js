import { Container } from "./styles";
import { FaTicketSimple } from "react-icons/fa6";

import { ReactComponent as EditIcon } from "../../assets/svg/edit-icon.svg";

import colors from "../../global/colors";

const ListedVoucher = ({ code, value, createdAt, onClick }) => {
  function currencyFormat(num = 200) {
    return num
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <Container onClick={onClick}>
      <FaTicketSimple
        style={{
          flexBasis: "7%",
        }}
        size={24}
      />
      <p className="code">{code}</p>
      <p className="value">R$ {currencyFormat(value)}</p>
      <p className="value">
        {new Date(createdAt).toLocaleDateString()}{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </p>
      <EditIcon
        size={16}
        color={colors.black}
        style={{
          flexBasis: "7%",
        }}
      />
    </Container>
  );
};

export default ListedVoucher;
