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
  const [enterprises, setEnterprises] = useState([]);

  async function getData() {
    if (JSON.stringify(enterprise) !== JSON.stringify({})) {
      if (initialLoading.current === true) {
        try {
          const { data } = await api.get(
            `/loyalty/?cod_enterprise=${enterprise._id}`
          );
          const { users, vouchers, enterprises } = data;

          setUsers(users);
          setVouchers(vouchers);
          setEnterprises(enterprises);
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

  function createVoucher(
    voucherValue = 0,
    voucherAmount = 0,
    selectedEnterprise = {}
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          voucherValue === 0 ||
          voucherAmount === 0 ||
          JSON.stringify(selectedEnterprise) === '""' ||
          JSON.stringify(selectedEnterprise) === "{}"
        ) {
          toast.warn("Preencha todos os campos!");
          reject();
        }

        const { data } = await api.post("/loyalty/voucher", {
          value: voucherValue,
          amount: voucherAmount,
          loyalty_enterprise_id: selectedEnterprise._id,
        });

        setVouchers([...vouchers, ...data?.vouchers]);

        resolve([...vouchers, ...data?.vouchers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function editVoucher(voucherValue = 0, actualVoucher = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (JSON.stringify(actualVoucher) === "{}") {
          toast.warn("Selecione um voucher!");
          reject();
        }

        if (voucherValue === 0) {
          toast.warn("Insira o valor do voucher!");
          reject();
        }

        const { data } = await api.put("/loyalty/voucher", {
          voucher: actualVoucher?.voucher,
          value: voucherValue,
        });

        let newVouchers = vouchers;

        newVouchers[
          newVouchers.findIndex((v) => v._id === data?.voucher?._id)
        ] = data?.voucher;

        setVouchers([...newVouchers]);

        resolve([...newVouchers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteVoucher(actualVoucher = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (JSON.stringify(actualVoucher) === "{}") {
          toast.warn("Selecione um voucher!");
          reject();
        }

        let { data } = await api.delete(
          `/loyalty/voucher?_id=${actualVoucher?._id}`
        );

        data = data?.voucher;

        let newVouchers = vouchers;

        newVouchers.splice(
          vouchers.findIndex((u) => String(u._id) === String(data._id)),
          1
        );

        setVouchers([...newVouchers]);

        resolve([...newVouchers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function massiveCreateVoucher(
    massiveCreationAmount = 0,
    massiveCreationValue = 0
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (massiveCreationAmount <= 0 || massiveCreationValue <= 0) {
          toast.warn("Valores inválidos!");
          reject();
        }

        const { data } = await api.post("/loyalty/voucher/massive", {
          amount: massiveCreationAmount,
          value: massiveCreationValue,
        });

        const newVouchers = data?.vouchers;

        setVouchers([...vouchers, ...newVouchers]);
        resolve([...vouchers, ...newVouchers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function createUser(name = "", username = "", email = "", unities = []) {
    return new Promise(async (resolve, reject) => {
      if (name?.trim() === "") {
        toast.warn("Preencha o nome do usuário!");
        reject();
      }

      if (username?.trim() === "") {
        toast.warn("Preencha o usuário!");
        reject();
      }

      if (email?.trim() === "") {
        toast.warn("Preencha o e-mail usuário!");
        reject();
      }

      try {
        let { data } = await api.post(`/loyalty/user`, {
          name,
          username,
          email,
          cod_enterprise: enterprise._id,
          cod_unity: unities,
        });

        data = data?.user;

        setUsers([...users, data]);

        resolve([...users, data]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function editUser(selectedUser = {}, cod_unity = []) {
    return new Promise(async (resolve, reject) => {
      try {
        if (JSON.stringify(selectedUser) === "{}") {
          toast.warn("Selecione um usuário!");
          reject();
        }

        if (selectedUser?.name?.trim() === "") {
          toast.warn("Preencha o nome do usuário!");
          reject();
        }

        let { data } = await api.put(`/loyalty/user`, {
          user: {
            ...selectedUser,
            cod_unity,
          },
        });

        data = data?.user;

        let newUsers = users;

        newUsers[users.findIndex((u) => String(u._id) === String(data._id))] =
          data;

        setUsers([...newUsers]);

        resolve([...newUsers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteUser(_id = "") {
    return new Promise(async (resolve, reject) => {
      try {
        if (_id === "") {
          toast.warn("Selecione um usuário!");
          reject();
        }

        let { data } = await api.delete(`/loyalty/user?_id=${_id}`);

        data = data?.user;

        let newUsers = users;

        newUsers.splice(
          users.findIndex((u) => String(u._id) === String(data._id)),
          1
        );

        setUsers([...newUsers]);

        resolve([...newUsers]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function createLoyaltyEnterprise(
    name = "",
    cnpj = "",
    phone = "",
    zipCode = "",
    street = "",
    number = 0,
    neighborhood = ""
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          name === "" ||
          cnpj === "" ||
          phone === "" ||
          zipCode === "" ||
          street === "" ||
          number === 0 ||
          number === "" ||
          neighborhood === ""
        ) {
          toast.warn("Preencha todos os campos!");
          reject();
        }

        const { data } = await api.post("/loyalty/enterprises", {
          name,
          cod_enterprise: enterprise._id,
          cnpj,
          phone,
          address: {
            street,
            number,
            neighborhood,
            zip_code: zipCode,
          },
        });

        setEnterprises([...enterprises, data.enterprise]);

        resolve([...enterprises, data.enterprise]);
      } catch (error) {
        reject(error);
      }
    });
  }

  function editLoyaltyEnterprise(
    _id,
    name,
    cnpj,
    phone,
    zip_code,
    street,
    number,
    neighborhood
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          !_id ||
          !name ||
          !cnpj ||
          !phone ||
          !zip_code ||
          !street ||
          !number ||
          !neighborhood
        ) {
          toast.warn("Preencha todos os campos!");
          reject();
        }

        let { data } = await api.put("/loyalty/enterprises", {
          _id,
          name,
          cnpj,
          phone,
          address: {
            street,
            number,
            neighborhood,
            zip_code,
          },
        });

        data = data?.enterprise;

        let newEnterprises = enterprises;

        newEnterprises[
          enterprises.findIndex((ent) => String(ent._id) === String(data._id))
        ] = data;

        setEnterprises([...newEnterprises]);

        resolve([...newEnterprises]);
      } catch (error) {
        reject(error);
      }
    });
  }

  useEffect(() => {
    getData();
  }, [enterprise]);

  return (
    <LoyaltyContext.Provider
      value={{
        users,
        vouchers,
        enterprises,
        createUser,
        editUser,
        deleteUser,
        createVoucher,
        editVoucher,
        deleteVoucher,
        massiveCreateVoucher,
        createLoyaltyEnterprise,
        editLoyaltyEnterprise,
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
