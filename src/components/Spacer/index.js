const Spacer = ({ vertical }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.25)",
        width: vertical ? "1px" : "100%",
        height: vertical ? "100%" : "1px",
        borderRadius: 24,
        marginTop: vertical ? 0 : "2rem",
        marginBottom: vertical ? 0 : "2rem",
        marginLeft: vertical ? "2rem" : 0,
        marginRight: vertical ? "2rem" : 0,
      }}
    />
  );
};

export default Spacer;
