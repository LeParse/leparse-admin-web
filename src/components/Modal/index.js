import { easeInOut, AnimatePresence } from "framer-motion";

import { Overlay, Content } from "./styles";

const Modal = (props) => {
  function getDirection(direction, isOnEdge = false) {
    switch (direction) {
      case "right":
        if (isOnEdge) {
          return {
            x: "-5vw",
          };
        } else {
          return {
            x: 0,
          };
        }
      case "left":
        if (isOnEdge) {
          return {
            x: "5vw",
          };
        } else {
          return {
            x: 0,
          };
        }
      case "top":
        if (isOnEdge) {
          return {
            y: "5vh",
          };
        } else {
          return {
            y: 0,
          };
        }
      case "bottom":
        if (isOnEdge) {
          return {
            y: "-5vh",
          };
        } else {
          return {
            y: 0,
          };
        }
      default:
        if (isOnEdge) {
          return {
            scale: 0.85,
          };
        } else {
          return {
            scale: 1,
          };
        }
    }
  }

  function clickOnOverlay() {
    props?.shouldCloseOnOverlayClick && props?.setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {props?.isOpen && (
        <Overlay
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.15,
              delay: 0.4,
            },
          }}
          onClick={clickOnOverlay}
          style={props?.overlayStyle}
        >
          <Content
            initial={{ opacity: 0, ...getDirection(props?.to, true) }}
            animate={{
              opacity: 1,

              ...getDirection(props?.to, false),

              transition: {
                delay: 0.2,
                duration: 0.25,
                ease: easeInOut,
              },
            }}
            exit={{
              opacity: 0,
              ...getDirection(props?.to, true),
            }}
            transition={{
              duration: 0.25,
              ease: easeInOut,
            }}
            onClick={(e) => e.stopPropagation()}
            style={props?.contentStyle}
          >
            {props?.children}
          </Content>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
