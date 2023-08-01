import { useState } from "react";
import { AnimatePresence, useAnimationControls } from "framer-motion";
import { IoSearch } from "react-icons/io5";

import { Container, Input } from "./styles";

const SearchBar = (props) => {
  const containerControls = useAnimationControls();
  const inputControls = useAnimationControls();

  const [isToggled, setIsToggled] = useState(false);

  function searchClick() {
    inputControls.start({
      opacity: isToggled ? 0 : 1,
    });
    containerControls
      .start({
        width: isToggled ? "2rem" : "auto",
      })
      .then(() => {
        setIsToggled(!isToggled);
      });
  }

  return (
    <AnimatePresence>
      <Container
        initial={{
          width: "2rem",
        }}
        animate={containerControls}
        exit={{
          width: "2rem",
        }}
        isToggled={isToggled}
        {...props}
      >
        {props.inverted && (
          <IoSearch
            id="icon"
            style={{
              backgroundColor: isToggled ? "white" : "transparent",
            }}
            onClick={searchClick}
          />
        )}
        <Input
          id={"searchInput"}
          disabled={!isToggled}
          initial={{
            opacity: 0,
          }}
          animate={inputControls}
          exit={{
            opacity: 0,
          }}
          value={props.value}
          onChange={props.onChange}
        />
        {!props.inverted && (
          <IoSearch
            id="icon"
            style={{
              backgroundColor: isToggled ? "white" : "transparent",
            }}
            onClick={searchClick}
          />
        )}
      </Container>
    </AnimatePresence>
  );
};

export default SearchBar;
