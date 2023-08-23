import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

import { useLoyalty } from "../../../contexts/loyalty";
import { useGlobal } from "../../../contexts/global";

import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import ListedUser from "../../../components/ListedUser";
import ListedVoucher from "../../../components/ListedVoucher";
import AnimatedPage from "../../../components/AnimatedPage";
import NoContent from "../../../components/NoContent";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import StoresList from "../../../components/StoresList";

import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";
import loyaltyLogo from "../../../assets/images/Logo-white-2.png";

import { SlArrowRight } from "react-icons/sl";
import { TiPlus } from "react-icons/ti";

import api from "../../../services/api";

import colors from "../../../global/colors";
import {
  Container,
  CreateVoucherModal,
  EditVoucherModal,
  CreateUserModal,
  Title,
} from "./styles";

const Loyalty = () => {
  const { enterprise } = useGlobal();
  const { users, setUsers, vouchers, setVouchers } = useLoyalty();

  const navigate = useNavigate();

  const [createVoucherModalVisible, setCreateVoucherModalVisible] =
    useState(false);
  const [editVoucherModalVisible, setEditVoucherModalVisible] = useState(false);
  const [voucherValue, setVoucherValue] = useState(0);

  const [actualVoucher, setActualVoucher] = useState({});

  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [unities, setUnities] = useState([]);

  function seeMoreUsers() {
    navigate("/app/loyalty/users");
  }

  function seeMoreStores() {
    navigate("/app/loyalty/vouchers");
  }

  function createVoucherModal() {
    setCreateVoucherModalVisible(true);
  }

  async function createVoucher() {
    try {
      if (!voucherValue) {
        return toast.warn("Insira o valor do voucher!");
      }

      const { data } = await api.post("/loyalty/voucher", {
        value: voucherValue,
      });

      setVouchers((vouchers) => [...vouchers, data?.voucher]);

      setVoucherValue(0);
      setCreateVoucherModalVisible(false);
      toast.success("Voucher criado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar voucher!");
    }
  }

  async function saveVoucher() {
    try {
      if (!voucherValue) {
        return toast.warn("Insira o valor do voucher!");
      }

      const { data } = await api.put("/loyalty/save-voucher", {
        voucher: actualVoucher?.voucher,
        value: voucherValue,
      });

      setVouchers((vouchers) => {
        vouchers[vouchers.findIndex((v) => v._id === data?.voucher?._id)] =
          data?.voucher;

        return [...vouchers];
      });

      setEditVoucherModalVisible(false);
      toast.success("Voucher salvo!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar voucher!");
    }
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

      setUsers([...users, data]);

      toggleCreateUserModal();
      toast.success("Usuário salvo!");
    } catch (error) {
      toast.error("Falha ao salvar usuário!");
    }
  }

  function toggleCreateUserModal() {
    setName("");
    setUsername("");
    setEmail("");
    setUnities([]);
    setCreateUserModalVisible(!createUserModalVisible);
  }

  return (
    <AnimatedPage>
      <Container>
        <Title>
          <img src={loyaltyLogo} alt="Loyalty" />
        </Title>

        <Block
          style={{
            gridArea: "users",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="blockTitleContainer">
            <p className="blockTitle">Usuários</p>
            <TiPlus
              onClick={toggleCreateUserModal}
              size={32}
              color={colors.black}
            />
          </div>

          <Spacer />

          <AnimatePresence>
            <div className="usersList">
              {users?.map((user) => (
                <ListedUser
                  key={user._id}
                  name={user.name}
                  stores={user.unities}
                  id={user._id}
                />
              ))}
              {users.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <NoContent
                    style={{
                      p: {
                        fontSize: "1.25rem",
                      },
                      svg: {
                        width: "1.5rem",
                        height: "1.5rem",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </AnimatePresence>

          <div className="seeMore" onClick={seeMoreUsers}>
            <p>Ver todos</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>

        <Block
          style={{
            gridArea: "vouchers",
            flex: 1,
            width: "100%",
            position: "relative",
            height: "100%",
          }}
        >
          <div className="blockTitleContainer">
            <p className="blockTitle">Vouchers</p>
            <TiPlus
              onClick={createVoucherModal}
              size={32}
              color={colors.black}
            />
          </div>

          <Spacer />

          <AnimatePresence>
            <div className="vouchersList">
              {vouchers
                ?.sort((a, b) =>
                  new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
                )
                ?.map((voucher) => (
                  <ListedVoucher
                    key={voucher._id}
                    code={voucher.voucher}
                    value={voucher.value}
                    updatedAt={voucher.updatedAt}
                    active={voucher?.active}
                    onEditClick={() => {
                      setVoucherValue(String(voucher?.value).replace(".", ","));
                      setActualVoucher(voucher);
                      setEditVoucherModalVisible(true);
                    }}
                  />
                ))}
              {vouchers.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <NoContent
                    style={{
                      p: {
                        fontSize: "1.25rem",
                      },
                      svg: {
                        width: "1.5rem",
                        height: "1.5rem",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </AnimatePresence>

          <div className="seeMore" onClick={seeMoreStores}>
            <p>Ver todos</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>

        <Block
          style={{
            gridArea: "enterprises",
            width: "100%",
            height: "100%",
          }}
        >
          <p className="blockTitle">Empresas</p>

          <Spacer />

          <div className="enterprises">
            <p>Você possui 2 mensalidades pendentes!</p>
            <p>Pague e evite o congelamento</p>
          </div>

          <div className="seeMore">
            <p>Ver detalhes</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>

          {/* <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(0.5rem)",
            }}
          >
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: 32,
                fontWeight: 300,
                color: colors.black,
                textShadow: "0 0 42px black",
              }}
            >
              Em breve...
            </p>
          </div> */}
        </Block>
      </Container>

      <Modal
        to="bottom"
        isOpen={createVoucherModalVisible}
        setIsOpen={setCreateVoucherModalVisible}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "auto",
          height: "auto",
          padding: "2rem",
        }}
      >
        <CreateVoucherModal>
          <div className="modalHeader">
            <p>Criar voucher</p>
            <CloseIcon onClick={() => setCreateVoucherModalVisible(false)} />
          </div>

          <Spacer />

          <div className="modalContent">
            <p>Valor:</p>
            <div className="value">
              <p>R$</p>
              <Input
                currency
                thousandSeparator={"."}
                decimalSeparator={","}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
                withBorder
                value={voucherValue}
                onChange={(e) => setVoucherValue(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={createVoucher}>Criar</Button>
        </CreateVoucherModal>
      </Modal>

      <Modal
        to="bottom"
        isOpen={editVoucherModalVisible}
        setIsOpen={setEditVoucherModalVisible}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "auto",
          height: "auto",
          padding: "2rem",
        }}
      >
        <EditVoucherModal>
          <div className="modalHeader">
            <p>Editar voucher</p>
            <CloseIcon
              onClick={() => {
                setVoucherValue(0);
                setActualVoucher({});
                setEditVoucherModalVisible(false);
              }}
            />
          </div>

          <Spacer />

          <div className="modalContent">
            <div className="value">
              <p>Voucher:</p>
              <p className="voucher">{actualVoucher?.voucher}</p>
            </div>
            <div className="value">
              <p>Valor:</p>
              <div className="field">
                <p>R$</p>
                <Input
                  currency
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  fixedDecimalScale
                  placeholder="0,00"
                  withBorder
                  value={voucherValue}
                  onChange={(e) => setVoucherValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button onClick={saveVoucher}>Salvar</Button>
        </EditVoucherModal>
      </Modal>

      <Modal
        to="bottom"
        isOpen={createUserModalVisible}
        setIsOpen={setCreateUserModalVisible}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "70%",
          maxHeight: "90%",
          padding: "2rem",
          overflow: "hidden",
        }}
      >
        <CreateUserModal>
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
          <Button onClick={createUser}>Criar</Button>
        </CreateUserModal>
      </Modal>
    </AnimatedPage>
  );
};

export default Loyalty;
