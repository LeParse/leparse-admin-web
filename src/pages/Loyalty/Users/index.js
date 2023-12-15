import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";

import { TiPlus } from "react-icons/ti";

import { useGlobal } from "../../../contexts/global";
import { useLoyalty } from "../../../contexts/loyalty";

import { useDebounce } from "../../../utils/debounce.utils";

import Block from "../../../components/Block";
import NoContent from "../../../components/NoContent";
import StoresList from "../../../components/StoresList";

import {
  AnimatedPage,
  Button,
  Spacer,
  SearchBar,
  Modal,
  Input,
} from "@leparse/ui";

import noUserIcon from "../../../assets/icons/no-user-icon.jpg";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import api from "../../../services/api";

import colors from "../../../global/colors";
import { Container, Header, GlobalStyle, CreateModal } from "./styles";

const Users = () => {
  const navigate = useNavigate();
  const { enterprise } = useGlobal();
  const { users, createUser, editUser, deleteUser } = useLoyalty();

  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [selectStoresModal, setSelectStoresModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUnities, setSelectedUnities] = useState([]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [unities, setUnities] = useState([]);

  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

  const [searchText, setSearchText] = useDebounce("");

  function goBack() {
    navigate(-1);
  }

  function editButton(user) {
    setSelectedUser(user);
    setSelectedUnities([...user?.cod_unity]);
    setSelectStoresModal(true);
  }

  function removeButton(user) {
    setSelectedUser(user);
    setRemoveUserModal(true);
  }

  function runCreateUser() {
    createUser(name, username, email, unities)
      .then(() => {
        toggleCreateUserModal();
        toast.success("Usuário salvo!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar usuário!");
      });
  }

  function runEditUser() {
    editUser(selectedUser, selectedUnities)
      .then(() => {
        toggleEditUserModal();
        toast.success("Usuário salvo!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar usuário!");
      });
  }

  function runDeleteUser() {
    deleteUser(selectedUser?._id)
      .then(() => {
        toggleRemoveUserModal();
        toast.success("Usuário deletado!");
      })
      .catch((err) => {
        toast.error("Falha ao deletar usuário!");
      });
  }

  function toggleCreateUserModal() {
    setName("");
    setUsername("");
    setEmail("");
    setUnities([]);
    setCreateUserModalVisible(!createUserModalVisible);
  }

  function toggleEditUserModal() {
    setSelectedUser({});
    setSelectedUnities([]);
    setSelectStoresModal(!selectStoresModal);
  }

  function toggleRemoveUserModal() {
    setSelectedUser({});
    setRemoveUserModal(!removeUserModal);
  }

  const Row = ({ user }) => {
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
          <td
            style={{
              width: 0,
            }}
          >
            <img src={user.photo ? user.photo : noUserIcon} alt="User" />
          </td>
          <td>
            <p>{user.name}</p>
          </td>
          <td>
            <p>
              {user?.unities?.map((unity, _i) => {
                if (_i !== unity.length - 1) {
                  return `${unity}, `;
                }

                return unity;
              })}

              {user?.unities?.length === 0 && (
                <p
                  style={{
                    opacity: 0.35,
                    fontStyle: "italic",
                  }}
                >
                  Não está em nenhuma loja
                </p>
              )}
            </p>
          </td>
          <td className="actions">
            <EditIcon onClick={() => editButton(user)} />
            <TrashIcon onClick={() => removeButton(user)} />
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
            <th></th>
            <th>Nome</th>
            <th>Lojas</th>
            <th></th>
          </thead>

          <AnimatePresence>
            {users?.map((user) => {
              return (
                user.name
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(
                    searchText?.replace(" ", "").toLocaleLowerCase()
                  ) && <Row key={user._id} user={user} />
              );
            })}

            {users?.filter((u) =>
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
  }, [users, searchText]);

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
            <h1>Usuários</h1>
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
              onClick={toggleCreateUserModal}
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
        isOpen={createUserModalVisible}
        setIsOpen={setCreateUserModalVisible}
        shouldCloseOnOverlayClick
        overlayStyle={{
          left: "-9rem",
        }}
        contentStyle={{
          width: "70%",
          maxHeight: "90%",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <CreateModal>
          <div className="modalHeader">
            <p>Criar usuário</p>
            <CloseIcon onClick={() => setCreateUserModalVisible(false)} />
          </div>

          <Spacer />

          <div className="modalContent">
            <div className="left">
              <p
                style={{
                  gridArea: "name",
                }}
              >
                Nome:
              </p>
              <p style={{ gridArea: "user" }}>Usuário:</p>
              <p style={{ gridArea: "email" }}>E-mail:</p>

              <Input
                style={{ gridArea: "nameInput" }}
                placeholder="Digite o nome"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                style={{ gridArea: "userInput" }}
                placeholder="Digite o usuário"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                style={{ gridArea: "emailInput" }}
                placeholder="Digite o e-mail"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Spacer vertical />
            <div className="right">
              <StoresList
                invertAnimation
                storeWidth={"30%"}
                stores={enterprise?.unities}
                selectedUnities={unities}
                setSelectedUnities={setUnities}
              />
            </div>
          </div>
          <Button onClick={runCreateUser}>Criar</Button>
        </CreateModal>
      </Modal>

      <Modal
        isOpen={selectStoresModal}
        setIsOpen={setSelectStoresModal}
        shouldCloseOnOverlayClick
        to="left"
        overlayStyle={{
          left: "-9rem",
        }}
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
              src={selectedUser?.photo ? selectedUser?.photo : noUserIcon}
              alt="User"
            />
            <Input
              value={selectedUser?.name}
              onChange={(e) => {
                setSelectedUser((u) => {
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
            <CloseIcon onClick={toggleEditUserModal} />
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
            onClick={runEditUser}
            style={{ width: "100%", backgroundColor: colors.orange }}
          >
            Salvar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={removeUserModal}
        setIsOpen={setRemoveUserModal}
        shouldCloseOnOverlayClick
        to="left"
        overlayStyle={{
          left: "-9rem",
        }}
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
            onClick={runDeleteUser}
            style={{ backgroundColor: colors.red, width: "100%" }}
          >
            Remover
          </Button>
          <Button
            onClick={toggleRemoveUserModal}
            style={{ backgroundColor: colors.grey, width: "100%" }}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </AnimatedPage>
  );
};

export default Users;
