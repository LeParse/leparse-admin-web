import IncompatibleDevice from "./components/IncompatibleDevice";
import GlobalProvider from "./contexts/global";
import Router from "./Router";

function App() {
  if (window.innerWidth <= 768) {
    return <IncompatibleDevice />;
  }

  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
