import { IoFilter } from "react-icons/io5";

import colors from "../../global/colors";
import { Container } from "./styles";

const FilterButton = (props) => {
  return (
    <Container
      whileHover={{
        scale: 1.1,
        y: "-0.25rem",
        color: colors.orange,
      }}
      transition={{
        duration: 0.1,
      }}
      {...props}
    >
      <IoFilter size={props.size ? props.size : 32} />
    </Container>
  );
};

export default FilterButton;
