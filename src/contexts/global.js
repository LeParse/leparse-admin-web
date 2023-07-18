import { createContext, useContext } from "react";
import { toast } from "react-toastify";

import adminAPI from "../services/admin-api";

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  async function login(username, password) {
    try {
      // const user = await api.post('')
    } catch (error) {
      toast("Erro no login...", { type: "error" });
    }
  }

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;

export function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}
