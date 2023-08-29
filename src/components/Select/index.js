import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { easeOut, useAnimationControls, m } from "framer-motion";

import colors from "../../global/colors";
import { Container } from "./styles";

const Select = ({ items, selectedItem, setSelectedItem, compact }) => {
  const [isListToggled, setIsListToggled] = useState(false);

  const listControls = useAnimationControls();

  function toggleList() {
    listControls
      .start({
        height: isListToggled ? (compact ? 0 : "3.25rem") : "auto",
        boxShadow: isListToggled ? 0 : `0 0 1rem 0rem ${colors.primary}40`,
        border: isListToggled ? 0 : `1px solid ${colors.primary}40`,
        transition: {
          ease: easeOut,
          duration: 0.1,
        },
      })
      .then(() => {
        setIsListToggled(!isListToggled);
      });
  }

  function selectItem(value) {
    const item = items.find((i) => i.value === value);

    setSelectedItem(item);
  }

  return (
    <Container
      onClick={toggleList}
      animate={compact ? undefined : listControls}
      compact={compact}
      initial={{
        height: "3.25rem",
      }}
    >
      <div className="selectedItem">
        <p>{selectedItem?.label ? selectedItem?.label : "Selecione"}</p>
        <IoIosArrowDown size={24} />
      </div>
      <m.div
        initial={{
          height: compact ? 0 : undefined,
        }}
        animate={compact ? listControls : undefined}
        className="list"
      >
        {items?.map(
          (item) =>
            item?.value !== selectedItem?.value && (
              <p key={item?.value} onClick={() => selectItem(item?.value)}>
                {item?.label}
              </p>
            )
        )}
      </m.div>
    </Container>
  );
};

export default Select;
