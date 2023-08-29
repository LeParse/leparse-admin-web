import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";

import { TiPlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

import { useGlobal } from "../../../contexts/global";
import { useLoyalty } from "../../../contexts/loyalty";

import { useDebounce } from "../../../utils/debounce.utils";

import AnimatedPage from "../../../components/AnimatedPage";
import Block from "../../../components/Block";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Spacer from "../../../components/Spacer";
import NoContent from "../../../components/NoContent";
import StoresList from "../../../components/StoresList";
import SearchBar from "../../../components/SearchBar";
import LoadingFreeze from "../../../components/LoadingFreeze";

import noUserIcon from "../../../assets/icons/no-user-icon.jpg";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import api from "../../../services/api";

import colors from "../../../global/colors";
import {
  Container,
  Header,
  GlobalStyle,
  CreateModal,
  CreateEnterpriseModal,
} from "./styles";

const Enterprise = () => {
  const navigate = useNavigate();
  const { enterprise } = useGlobal();
  const {
    enterprises,
    setEnterprise,
    createLoyaltyEnterprise,
    editLoyaltyEnterprise,
    deleteLoyaltyEnterprise,
  } = useLoyalty();

  const [removeEnterpriseModal, setRemoveEnterpriseModal] = useState(false);
  const [selectStoresModal, setSelectStoresModal] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState({});
  const [selectedUnities, setSelectedUnities] = useState([]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseCNPJ, setEnterpriseCNPJ] = useState("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseZipCode, setEnterpriseZipCode] = useState("");
  const [enterpriseStreet, setEnterpriseStreet] = useState("");
  const [enterpriseNumber, setEnterpriseNumber] = useState();
  const [enterpriseNeighborhood, setEnterpriseNeighborhood] = useState("");

  const [unities, setUnities] = useState([]);

  const [createEnterpriseModalVisible, setCreateEnterpriseModalVisible] =
    useState(false);
  const [isFetchingCEP, setIsFetchingCEP] = useState(false);

  const [searchText, setSearchText] = useDebounce("");

  function goBack() {
    navigate(-1);
  }

  function focusInput(id = "") {
    document.querySelector(`#${id}`).focus();
  }

  async function searchCEP() {
    try {
      setIsFetchingCEP(true);

      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${enterpriseZipCode}`
      );

      const data = await response.json();

      setEnterpriseStreet(data.street);
      setEnterpriseNumber(null);
      setEnterpriseNeighborhood(data.neighborhood);

      setTimeout(() => {
        setIsFetchingCEP(false);
      }, 500);
    } catch (err) {
      toast.error("Falha ao pesquisar CEP!");
    }
  }

  function editButton(user) {
    setSelectedEnterprise(user);
    setSelectedUnities([...user?.cod_unity]);
    setSelectStoresModal(true);
  }

  function removeButton(user) {
    setSelectedEnterprise(user);
    setRemoveEnterpriseModal(true);
  }

  function runCreateLoyaltyEnterprise() {
    createLoyaltyEnterprise(
      enterpriseName,
      enterpriseCNPJ,
      enterprisePhone,
      enterpriseZipCode,
      enterpriseStreet,
      enterpriseNumber,
      enterpriseNeighborhood
    )
      .then(() => {
        toggleCreateEnterpriseModal();
        toast.success("Usuário salvo!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar usuário!");
      });
  }

  function runEditLoyaltyEnterprise() {
    editLoyaltyEnterprise(selectedEnterprise, selectedUnities)
      .then(() => {
        toggleEditEnterpriseModal();
        toast.success("Usuário salvo!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar usuário!");
      });
  }

  function runDeleteLoyaltyUser() {
    deleteLoyaltyEnterprise(selectedEnterprise?._id)
      .then(() => {
        toggleRemoveEnterpriseModal();
        toast.success("Usuário deletado!");
      })
      .catch((err) => {
        toast.error("Falha ao deletar usuário!");
      });
  }

  function toggleCreateEnterpriseModal() {
    setName("");
    setUsername("");
    setEmail("");
    setUnities([]);
    setCreateEnterpriseModalVisible(!createEnterpriseModalVisible);
  }

  function toggleEditEnterpriseModal() {
    setSelectedEnterprise({});
    setSelectedUnities([]);
    setSelectStoresModal(!selectStoresModal);
  }

  function toggleRemoveEnterpriseModal() {
    setSelectedEnterprise({});
    setRemoveEnterpriseModal(!removeEnterpriseModal);
  }

  async function createUser() {
    if (name?.trim() === "") {
      return toast.warn("Preencha o nome do usuário!");
    }

    if (username?.trim() === "") {
      return toast.warn("Preencha o usuário!");
    }

    if (email?.trim() === "") {
      return toast.warn("Preencha o e-mail usuário!");
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

      setEnterprise([...enterprises, data]);

      toggleCreateEnterpriseModal();
      toast.success("Usuário salvo!");
    } catch (error) {
      toast.error("Falha ao salvar usuário!");
    }
  }

  const Row = ({ enterprise }) => {
    return (
      <m.tbody
        layout
        initial={{
          opacity: 0,
          x: "-2.5vw",
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: "-2.5vw",
        }}
        transition={{
          ease: "easeOut",
          duration: 0.4,
          x: { duration: 0.2 },
          layout: {
            duration: 0.2,
          },
        }}
        style={{
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <tr>
          <td>
            <p>{enterprise.name}</p>
          </td>
          <td>
            <p>{enterprise.cnpj}</p>
          </td>
          <td>
            <p>{enterprise.phone}</p>
          </td>
          <td className="actions">
            <EditIcon onClick={() => editButton(enterprise)} />
            <TrashIcon onClick={() => removeButton(enterprise)} />
          </td>
        </tr>
      </m.tbody>
    );
  };

  const UsersTable = useMemo(() => {
    return (
      <m.div
        style={{
          overflow: "scroll",
          width: "100%",
          height: "92.75%",
          paddingRight: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <table>
          <thead>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th></th>
          </thead>

          <AnimatePresence>
            {enterprises?.map((enterprise) => {
              return (
                enterprise.name
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(
                    searchText?.replace(" ", "").toLocaleLowerCase()
                  ) && <Row key={enterprise._id} enterprise={enterprise} />
              );
            })}

            {enterprises?.filter((u) =>
              u.name
                .toLowerCase()
                .replace(" ", "")
                .includes(searchText?.replace(" ", "").toLocaleLowerCase())
            ).length === 0 && (
              <m.div
                initial={{
                  opacity: 0,
                  x: "2.5vw",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: "2.5vw",
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.4,
                  x: { duration: 0.2 },
                  layout: {
                    duration: 0.2,
                  },
                }}
                style={{
                  width: "calc(100% - 4rem)",
                  height: "calc(100% - 13rem)",
                  position: "absolute",
                }}
                layout
              >
                <NoContent />
              </m.div>
            )}
          </AnimatePresence>
        </table>
      </m.div>
    );
  }, [enterprises, searchText]);

  return (
    <AnimatedPage>
      <GlobalStyle />
      <Container>
        <Block
          style={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Header>
            <BackIcon throwIfNamespace={false} onClick={goBack} />
            <h1>Empresas</h1>
            <SearchBar
              onChange={(e) => {
                console.log(e.target.value);
                setSearchText(e.target.value);
              }}
              style={{
                position: "absolute",
                right: "6rem",
              }}
            />
            <TiPlus
              id="createButton"
              onClick={toggleCreateEnterpriseModal}
              size={32}
              color={colors.black}
            />
          </Header>
          <Spacer />
          {UsersTable}
        </Block>
      </Container>

      <Modal
        to="bottom"
        isOpen={createEnterpriseModalVisible}
        setIsOpen={setCreateEnterpriseModalVisible}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "70%",
          maxHeight: "90%",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <CreateEnterpriseModal>
          <div className="modalHeader">
            <p>Criar empresa</p>
            <CloseIcon onClick={() => setCreateEnterpriseModalVisible(false)} />
          </div>

          <Spacer />

          <div className="modalContent">
            <div className="left">
              <p
                style={{
                  gridArea: "name",
                }}
                onClick={() => focusInput("enterpriseName")}
              >
                Nome:
              </p>
              <p
                style={{ gridArea: "cnpj" }}
                onClick={() => focusInput("enterpriseCNPJ")}
              >
                CNPJ:
              </p>
              <p
                style={{ gridArea: "phone" }}
                onClick={() => focusInput("enterprisePhone")}
              >
                Telefone:
              </p>

              <Input
                style={{ gridArea: "nameInput" }}
                placeholder="Digite o nome"
                id="enterpriseName"
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
              />
              <Input
                style={{ gridArea: "cnpjInput" }}
                placeholder="Digite o CNPJ"
                id="enterpriseCNPJ"
                masked
                mask="99.999.999/9999-99"
                value={enterpriseCNPJ}
                onChange={(e) => setEnterpriseCNPJ(e.target.value)}
              />
              <Input
                style={{ gridArea: "phoneInput" }}
                masked
                mask="+55 (99) 9 9999-9999"
                maskChar="_"
                placeholder="Digite o telefone"
                id="enterprisePhone"
                value={enterprisePhone}
                onChange={(e) => setEnterprisePhone(e.target.value)}
              />
            </div>
            <Spacer vertical />
            <div className="right">
              <div className="header">
                <p>CEP:</p>
                <Input
                  masked
                  mask="99999-999"
                  placeholder="Digite o CEP"
                  value={enterpriseZipCode}
                  onChange={(e) => setEnterpriseZipCode(e.target.value)}
                />
                <Button
                  style={{
                    width: "3rem",
                    height: "3rem",
                    margin: 0,
                    alignSelf: "center",
                  }}
                  onClick={searchCEP}
                >
                  <IoSearch />
                </Button>
              </div>
              <Spacer />
              <div className="addressInputs">
                <div>
                  <p onClick={() => focusInput("enterpriseStreet")}>
                    Logradouro:
                  </p>
                  <Input
                    type="text"
                    id="enterpriseStreet"
                    placeholder="Digite o CEP"
                    value={enterpriseStreet}
                    // onChange={(e) => setEnterpriseStreet(e.target.value)}
                  />
                </div>
                <div>
                  <p onClick={() => focusInput("enterpriseNumber")}>Número:</p>
                  <Input
                    type="text"
                    id="enterpriseNumber"
                    placeholder="Digite o número"
                    masked
                    mask="9999999999"
                    maskChar=""
                    value={enterpriseNumber}
                    onChange={(e) => setEnterpriseNumber(e.target.value)}
                  />
                </div>
                <div>
                  <p onClick={() => focusInput("enterpriseNeighborhood")}>
                    Bairro:
                  </p>
                  <Input
                    type="text"
                    id="enterpriseNeighborhood"
                    placeholder="Digite o CEP"
                    value={enterpriseNeighborhood}
                    // onChange={(e) => setEnterpriseNeighborhood(e.target.value)}
                  />
                </div>

                <LoadingFreeze show={isFetchingCEP} />
              </div>
            </div>
          </div>
          <Button onClick={runCreateLoyaltyEnterprise}>Criar</Button>
        </CreateEnterpriseModal>
      </Modal>

      <Modal
        isOpen={selectStoresModal}
        setIsOpen={setSelectStoresModal}
        shouldCloseOnOverlayClick
        to="left"
        contentStyle={{
          position: "absolute",
          right: "2rem",
          width: "40%",
          height: "calc(100% - 4rem)",
        }}
      >
        <div className="modalHeader">
          <div className="modalUser">
            <img
              src={
                selectedEnterprise?.photo
                  ? selectedEnterprise?.photo
                  : noUserIcon
              }
              alt="User"
            />
            <Input
              value={selectedEnterprise?.name}
              onChange={(e) => {
                setSelectedEnterprise((u) => {
                  return {
                    ...u,
                    name: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="modalClose">
            <p>Selecione as lojas</p>
            <CloseIcon onClick={toggleEditEnterpriseModal} />
          </div>
        </div>
        <Spacer />
        <div
          style={{
            overflowY: "auto",
            height: "75%",
            paddingBottom: "1rem",
          }}
        >
          <StoresList
            invertAnimation
            storeWidth={"47.5%"}
            gap={"1rem"}
            stores={enterprise?.unities}
            selectedUnities={selectedUnities}
            setSelectedUnities={setSelectedUnities}
          />
        </div>
        <div className="modalFooter">
          <Spacer />
          <Button
            onClick={editLoyaltyEnterprise}
            style={{ width: "100%", backgroundColor: colors.orange }}
          >
            Salvar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={removeEnterpriseModal}
        setIsOpen={setRemoveEnterpriseModal}
        shouldCloseOnOverlayClick
        to="left"
        contentStyle={{
          position: "absolute",
          width: "25%",
          height: "calc(50vh - 4rem)",
          right: "2rem",
        }}
      >
        <div className="modalHeader">
          <p
            style={{
              fontSize: "1.5rem",
              whiteSpace: "normal",
              lineHeight: "1.5rem",
            }}
          >
            Tem certeza que deseja deletar este usuário?
          </p>
        </div>
        <Spacer />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button
            onClick={runDeleteLoyaltyUser}
            style={{ backgroundColor: colors.red, width: "100%" }}
          >
            Remover
          </Button>
          <Button
            onClick={toggleRemoveEnterpriseModal}
            style={{ backgroundColor: colors.grey, width: "100%" }}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </AnimatedPage>
  );
};

export default Enterprise;
