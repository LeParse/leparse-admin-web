import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "./styles";

const Loyalty = () => {
  const [items, setItems] = useState([{}, {}]);

  function addItem() {
    setItems([...items, {}]);
  }

  function removeItem() {
    items.splice(-1);
    setItems([...items]);
  }

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <AnimatePresence>
        {items.map((i, _i) => {
          return (
            <motion.div
              key={_i}
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "red",
                borderRadius: "1rem",
                margin: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0,
              }}
              transition={{
                scale: { duration: 0.2 },
              }}
              layout
            >
              eae
            </motion.div>
          );
        })}
      </AnimatePresence>

      <button style={{ width: 100, height: 100 }} onClick={addItem}>
        Add
      </button>
      <button style={{ width: 100, height: 100 }} onClick={removeItem}>
        Remove
      </button>
    </Container>
  );
};

export default Loyalty;
