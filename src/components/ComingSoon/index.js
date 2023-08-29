import colors from "../../global/colors";

const ComingSoon = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(0.5rem)",
      }}
    >
      <p
        style={{
          fontFamily: "Raleway",
          fontSize: 32,
          fontWeight: 300,
          color: colors.black,
          textShadow: "0 0 42px black",
        }}
      >
        Em breve...
      </p>
    </div>
  );
};

export default ComingSoon;
