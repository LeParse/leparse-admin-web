const Spacer = ({ vertical }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.25)",
        width: vertical ? "1px" : "100%",
        height: vertical ? "100%" : "1px",
        borderRadius: 24,
        marginTop: vertical ? 0 : "1.5rem",
        marginBottom: vertical ? 0 : "1.5rem",
        marginLeft: vertical ? "1.5rem" : 0,
        marginRight: vertical ? "1.5rem" : 0,
      }}
    />
  );
};

export default Spacer;
