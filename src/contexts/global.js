import { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const [enterprise, setEnterprise] = useState({});

  function login(username = "igoraugusto", password = "marina2207") {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post("/auth/login", {
          username,
          password,
        });

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("$leparse-admin-user", JSON.stringify(data.user));
        localStorage.setItem("$leparse-admin-token", data.token);

        resolve(data.user);
      } catch (error) {
        reject(error);
      }
    });
  }

  function logout() {
    setUser({});
    setToken("");
    localStorage.removeItem("$leparse-admin-user");
    localStorage.removeItem("$leparse-admin-token");
  }

  function verifyToken() {
    if (
      !window.location.pathname.includes("/login") &&
      token === "" &&
      !localStorage.getItem("$leparse-admin-token")
    ) {
      window.location = "/login?noToken=true";
    }
  }

  function fetchLocalStorage() {
    localStorage.getItem("$leparse-admin-user") &&
      setUser(JSON.parse(localStorage.getItem("$leparse-admin-user")));
    localStorage.getItem("$leparse-admin-token") &&
      setToken(localStorage.getItem("$leparse-admin-token"));
  }

  async function getEnterprise() {
    if (JSON.stringify(user) !== JSON.stringify({})) {
      try {
        const { data } = await api.get(
          `/global/get-enterprise?enterprise_id=${user.cod_enterprise}`
        );

        const { enterprise } = data;

        setEnterprise(enterprise);
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              return toast.error("Empresa não encontrada");
            default:
              return toast.error(
                "Erro desconhecido! Tente novamente mais tarde..."
              );
          }
        }

        toast.error("Erro desconhecido! Tente novamente mais tarde...");
      }
    }
  }

  useEffect(verifyToken, []);
  useEffect(fetchLocalStorage, []);

  useEffect(() => {
    getEnterprise();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        login,
        logout,
        user,
        token,
        enterprise,
        getEnterprise,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}
