import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { useGlobal } from "../contexts/global";

import api from "../services/api";

const LoyaltyContext = createContext({});

const LoyaltyProvider = ({ children }) => {
  const { enterprise } = useGlobal();

  let initialLoading = useRef(true);

  const [users, setUsers] = useState([]);
  const [vouchers, setVouchers] = useState([]);

  async function getData() {
    if (JSON.stringify(enterprise) !== JSON.stringify({})) {
      if (initialLoading.current === true) {
        try {
          const { data } = await api.get(
            `/loyalty/?enterprise_id=${enterprise._id}`
          );
          const { users, vouchers } = data;

          setUsers(users);
          setVouchers(vouchers);
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 404:
                return toast.error("Empresa não encontrada!");
              default:
                toast.error("Falha ao se conectar ao servidor!");
            }
          }

          toast.error("Falha ao se conectar ao servidor!");
        }
      }

      initialLoading.current = false;
    }
  }

  useEffect(() => {
    getData();
  }, [enterprise]);

  return (
    <LoyaltyContext.Provider
      value={{
        users,
        setUsers,
        vouchers,
        setVouchers,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export default LoyaltyProvider;

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  return context;
}
