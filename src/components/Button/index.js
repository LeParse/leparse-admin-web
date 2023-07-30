import { useState, useRef } from "react";
import ReactLoading from "react-loading";

import { Container } from "./styles";

const Button = (props) => {
  const [isPromissing, setIsPromissing] = useState(false);
  let button = useRef();

  async function onClick(e) {
    e.preventDefault();

    button.current?.classList.toggle("clicked");
    setIsPromissing(true);

    props?.onClick && (await props.onClick(e));

    setTimeout(() => {
      button.current?.classList.toggle("clicked");
      setIsPromissing(false);
    }, 500);
  }

  return (
    <Container
      {...props}
      ref={button}
      onClick={onClick}
      disabled={isPromissing}
      style={{
        ...props.style,
      }}
    >
      {isPromissing ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            width={"3rem"}
            height={"3rem"}
            type={"bubbles"}
            color={"#fff"}
          />
        </div>
      ) : (
        props.children
      )}
    </Container>
  );
};

export default Button;
