const Spacer = ({ vertical, style, dark }) => {
  return (
    <div
      style={{
        backgroundColor: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)",
        width: vertical ? "2px" : "100%",
        height: vertical ? "100%" : "2px",
        borderRadius: 24,
        marginTop: vertical ? 0 : "1.5rem",
        marginBottom: vertical ? 0 : "1.5rem",
        marginLeft: vertical ? "1.5rem" : 0,
        marginRight: vertical ? "1.5rem" : 0,
        ...style,
      }}
    />
  );
};

export default Spacer;
