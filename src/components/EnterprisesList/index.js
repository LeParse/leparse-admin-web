import { Container, Enterprise } from "./styles";

const EnterprisesList = ({
  enterprises,
  selectedEnterprise,
  setSelectedEnterprise,
  enterpriseWidth,
  gap,
  invertAnimation,
  style,
}) => {
  function selectEnterprise(ent = "") {
    setSelectedEnterprise(ent);
  }

  return (
    <Container
      style={{
        gap,
        ...style,
      }}
    >
      {enterprises?.map((ent) => (
        <Enterprise
          key={ent._id}
          onClick={() => selectEnterprise(ent)}
          style={{
            opacity: selectedEnterprise?._id === ent._id ? 1 : 0.5,
            width: enterpriseWidth,
          }}
          invertAnimation={invertAnimation}
        >
          <p>{ent?.name}</p>
        </Enterprise>
      ))}
    </Container>
  );
};

export default EnterprisesList;
