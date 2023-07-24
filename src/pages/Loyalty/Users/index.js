import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";

import { useGlobal } from "../../../contexts/global";
import { useLoyalty } from "../../../contexts/loyalty";

import AnimatedPage from "../../../components/AnimatedPage";
import Block from "../../../components/Block";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Spacer from "../../../components/Spacer";
import NoContent from "../../../components/NoContent";

import noUserIcon from "../../../assets/icons/no-user-icon.jpg";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import api from "../../../services/api";

import colors from "../../../global/colors";
import { Container, Header, GlobalStyle } from "./styles";

const Users = () => {
  const navigate = useNavigate();
  const { enterprise } = useGlobal();
  const { users, setUsers } = useLoyalty();

  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [selectStoresModal, setSelectStoresModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUnities, setSelectedUnities] = useState([]);

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

  function selectStore(unity) {
    let toValue = selectedUnities;
    if (selectedUnities.includes(unity._id)) {
      toValue.splice(selectedUnities.indexOf(unity._id), 1);
    } else {
      toValue.push(unity._id);
    }

    setSelectedUnities([...toValue]);
  }

  async function edit() {
    if (selectedUser?.name?.trim() === "") {
      return toast.warn("Preencha o nome do usuário!");
    }

    try {
      let { data } = await api.put(`/loyalty/save-user`, {
        user: {
          ...selectedUser,
          cod_unity: selectedUnities,
        },
      });

      data = data?.user;

      let newUsers = users;

      newUsers[users.findIndex((u) => String(u._id) === String(data._id))] =
        data;

      setUsers([...newUsers]);

      setTimeout(() => {
        toggleEditUserModal();
      }, 1000);

      toast.success("Salvo!");
    } catch (error) {
      toast.error("Falha ao salvar usuário!");
    }
  }

  async function remove() {
    try {
      console.log(selectedUser);

      let { data } = await api.delete(
        `/loyalty/delete-user?_id=${selectedUser?._id}`
      );

      data = data?.user;

      let newUsers = users;

      newUsers.splice(
        users.findIndex((u) => String(u._id) === String(data._id)),
        1
      );

      setUsers([...newUsers]);

      setTimeout(() => {
        toggleRemoveUserModal();
      }, 1000);

      toast.success("Salvo!");
    } catch (error) {
      toast.error("Falha ao salvar usuário!");
    }
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

  return (
    <AnimatedPage>
      <GlobalStyle />
      <Container>
        <Block
          style={{
            height: "100%",
          }}
        >
          <Header>
            <BackIcon throwIfNamespace={false} onClick={goBack} />
            <h1>Usuários</h1>
          </Header>
          <Spacer />
          <table>
            <thead>
              <th></th>
              <th>Nome</th>
              <th>Lojas</th>
              <th></th>
            </thead>

            <AnimatePresence>
              {users?.map((user) => (
                <Row key={user._id} user={user} />
              ))}

              {users.length === 0 && (
                <div
                  style={{
                    width: "calc(100% - 4rem)",
                    height: "calc(100% - 13rem)",
                    position: "absolute",
                  }}
                >
                  <NoContent />
                </div>
              )}
            </AnimatePresence>
          </table>
        </Block>
      </Container>

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
        <div className="modalStores">
          {enterprise?.unities?.map((unity, i) => {
            return (
              <div
                key={unity._id}
                className="modalStore"
                onClick={() => selectStore(unity)}
                style={{
                  backgroundColor: unity.color,
                  opacity: selectedUnities.includes(unity._id) ? 1 : 0.5,
                }}
              >
                <p>{unity.name}</p>
              </div>
            );
          })}
        </div>
        <div className="modalFooter">
          <Spacer />
          <Button
            onClick={edit}
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
            onClick={remove}
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
