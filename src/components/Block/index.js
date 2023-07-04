import { Container } from "./styles";

const Block = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Block;
