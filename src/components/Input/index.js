import InputMask from "react-input-mask";
import CurrencyFormat from "react-currency-format";

import colors from "../../global/colors";
import { GlobalStyle } from "./styles";

const Input = (props) => {
  const withBorderStyle = {
    borderBottom: `1px solid ${colors.primary}`,
  };

  return (
    <>
      <GlobalStyle />
      {props?.masked ? (
        <InputMask {...props} style={props.withBorder ? withBorderStyle : {}} />
      ) : props?.currency ? (
        <CurrencyFormat
          {...props}
          style={props.withBorder ? withBorderStyle : {}}
        />
      ) : (
        <input {...props} style={props.withBorder ? withBorderStyle : {}} />
      )}
    </>
  );
};

export default Input;
