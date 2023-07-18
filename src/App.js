import GlobalProvider from "./contexts/global";
import Router from "./Router";

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
