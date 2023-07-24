import { m } from "framer-motion";

const AnimatedPage = (props) => {
  return (
    <m.div
      {...props}
      initial={{
        x: "2.5vw",
        opacity: 0,
        ...props.initial,
      }}
      animate={{
        x: 0,
        opacity: 1,
        ...props.animate,
      }}
      exit={{
        x: "2.5vw",
        opacity: 0,
        ...props.exit,
      }}
      transition={{
        type: "spring",
        mass: 0.25,
        ...props.transition,
      }}
    >
      {props.children}
    </m.div>
  );
};

export default AnimatedPage;
