import { FaTicketSimple } from "react-icons/fa6";

import { ReactComponent as EditIcon } from "../../assets/svg/edit-icon.svg";

import colors from "../../global/colors";
import { Container } from "./styles";

const ListedVoucher = ({ code, value, updatedAt, active, onEditClick }) => {
  function currencyFormat(num = 200) {
    return Number(num)
      ?.toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <Container
      layout
      initial={{
        opacity: 0,
        x: "-2.5vw",
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: "-2.5vw",
      }}
      transition={{
        ease: "easeOut",
        duration: 0.4,
        x: { duration: 0.2 },
        layout: {
          duration: 0.2,
        },
      }}
    >
      <FaTicketSimple
        style={{
          flexBasis: "7%",
        }}
        size={24}
      />
      <p
        className="code"
        style={{
          color: active ? colors.green : colors.red,
        }}
      >
        {code}
      </p>
      <p className="value">R$ {currencyFormat(value)}</p>
      <p className="value">
        {new Date(updatedAt).toLocaleDateString()}{" "}
        {new Date(updatedAt).toLocaleTimeString()}
      </p>
      <EditIcon
        size={16}
        color={colors.black}
        onClick={onEditClick}
        style={{
          flexBasis: "7%",
        }}
      />
    </Container>
  );
};

export default ListedVoucher;
