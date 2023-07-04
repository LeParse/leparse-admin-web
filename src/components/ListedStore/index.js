import { useNavigate } from "react-router-dom";

import { Container, Status } from "./styles";

const ListedStore = ({ name, status, id }) => {
  const navigate = useNavigate();

  function gotoStore() {
    navigate(`/store/${id}`);
  }

  return (
    <Container onClick={gotoStore}>
      <Status status={status} />

      <p>{name}</p>
    </Container>
  );
};

export default ListedStore;
