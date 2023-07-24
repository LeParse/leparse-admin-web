import { ReactComponent as SadFaceIcon } from "../../assets/svg/sad-face-icon.svg";

import { Container } from "./styles";

const NoContent = (props) => {
  return (
    <Container {...props}>
      <p style={props?.style?.p}>Parece que não tem nada por aqui...</p>
      <SadFaceIcon style={props?.style?.svg} />
    </Container>
  );
};

export default NoContent;
