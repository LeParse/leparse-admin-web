import { FaBuilding } from "react-icons/fa";

import { Container } from "./styles";

const ListedEnterprise = ({ enterprise }) => {
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
      <FaBuilding size={24} />
      <p className="name">{enterprise?.name}</p>
      <p className="cnpj">{enterprise?.cnpj}</p>
      <p className="phone">{enterprise?.phone}</p>
    </Container>
  );
};

export default ListedEnterprise;
