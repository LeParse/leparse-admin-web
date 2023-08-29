import { AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";

import colors from "../../global/colors";
import { Container } from "./styles";

const LoadingFreeze = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <Container initial={{ x: 0 }} exit={{ x: 0 }}>
          <ReactLoading
            width={"5rem"}
            height={"5rem"}
            type={"bubbles"}
            color={colors.black}
          />
        </Container>
      )}
    </AnimatePresence>
  );
};

export default LoadingFreeze;
