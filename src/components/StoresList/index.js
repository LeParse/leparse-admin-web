import { Container, Store } from "./styles";

const StoresList = ({
  stores,
  selectedUnities,
  setSelectedUnities,
  storeWidth,
  gap,
  invertAnimation,
}) => {
  function selectStore(unity) {
    let toValue = selectedUnities;
    if (selectedUnities.includes(unity._id)) {
      toValue.splice(selectedUnities.indexOf(unity._id), 1);
    } else {
      toValue.push(unity._id);
    }

    setSelectedUnities([...toValue]);
  }

  return (
    <Container
      style={{
        gap,
      }}
    >
      {stores?.map((store) => (
        <Store
          key={store._id}
          onClick={() => selectStore(store)}
          style={{
            backgroundColor: store.color,
            opacity: selectedUnities.includes(store._id) ? 1 : 0.5,
            width: storeWidth,
          }}
          invertAnimation={invertAnimation}
        >
          <p>{store?.name}</p>
        </Store>
      ))}
    </Container>
  );
};

export default StoresList;
