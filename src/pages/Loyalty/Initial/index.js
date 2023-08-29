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
import ListedEnterprise from "../../../components/ListedEnterprise";
import AnimatedPage from "../../../components/AnimatedPage";
import NoContent from "../../../components/NoContent";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import StoresList from "../../../components/StoresList";
import EnterprisesList from "../../../components/EnterprisesList";
import LoadingFreeze from "../../../components/LoadingFreeze";

import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";
import loyaltyLogo from "../../../assets/images/Logo-white-2.png";

import { SlArrowRight } from "react-icons/sl";
import { TiPlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

import colors from "../../../global/colors";
import {
  Container,
  CreateVoucherModal,
  EditVoucherModal,
  CreateUserModal,
  CreateEnterpriseModal,
  Title,
} from "./styles";

const Loyalty = () => {
  const { enterprise } = useGlobal();
  const {
    users,
    vouchers,
    enterprises,
    createUser,
    createVoucher,
    editVoucher,
    createLoyaltyEnterprise,
  } = useLoyalty();

  const navigate = useNavigate();

  const [createVoucherModalVisible, setCreateVoucherModalVisible] =
    useState(false);
  const [editVoucherModalVisible, setEditVoucherModalVisible] = useState(false);

  const [voucherValue, setVoucherValue] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [selectedEnterprise, setSelectedEnterprise] = useState("");

  const [actualVoucher, setActualVoucher] = useState({});

  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [createEnterpriseModalVisible, setCreateEnterpriseModalVisible] =
    useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [unities, setUnities] = useState([]);

  const [isFetchingCEP, setIsFetchingCEP] = useState(false);

  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseCNPJ, setEnterpriseCNPJ] = useState("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseZipCode, setEnterpriseZipCode] = useState("");
  const [enterpriseStreet, setEnterpriseStreet] = useState("");
  const [enterpriseNumber, setEnterpriseNumber] = useState();
  const [enterpriseNeighborhood, setEnterpriseNeighborhood] = useState("");

  function seeMoreUsers() {
    navigate("/app/loyalty/users");
  }

  function seeMoreStores() {
    navigate("/app/loyalty/vouchers");
  }

  function seeMoreEnterprises() {
    navigate("/app/loyalty/enterprises");
  }

  function createVoucherModal() {
    setCreateVoucherModalVisible(true);
  }

  function toggleCreateUserModal() {
    setName("");
    setUsername("");
    setEmail("");
    setUnities([]);
    setCreateUserModalVisible(!createUserModalVisible);
  }

  function runCreateUser() {
    createUser(name, username, email, unities)
      .then((users) => {
        toggleCreateUserModal();
        toast.success("Usuário salvo!");
      })
      .catch((err) => {
        switch (err?.response?.status) {
          case 409:
            if (err.response.data.fields.includes("username")) {
              toast.warn("Usuário já existente!");
            }

            if (err.response.data.fields.includes("email")) {
              toast.warn("E-mail já existente!");
            }

            return;
          default:
            return toast.error("Falha ao criar usuário!");
        }
      });
  }

  function runCreateVoucher() {
    createVoucher(voucherValue, voucherAmount, selectedEnterprise)
      .then((vouchers) => {
        toast.success(
          voucherAmount > 1 ? "Vouchers criados!" : "Voucher criado!"
        );
        setVoucherValue(0);
        setVoucherAmount(0);
        setSelectedEnterprise({});
        setCreateVoucherModalVisible(false);
      })
      .catch((err) => {
        toast.error("Falha ao criar voucher!");
      });
  }

  function runEditVoucher() {
    editVoucher(voucherValue, actualVoucher)
      .then((vouchers) => {
        setEditVoucherModalVisible(false);
        toast.success("Voucher salvo!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar voucher!");
      });
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
      .then((enterprises) => {
        setCreateEnterpriseModalVisible(false);
        toast.success("Empresa salva!");
      })
      .catch((err) => {
        toast.error("Falha ao criar empresa!");
      });
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

  function focusInput(id = "") {
    document.querySelector(`#${id}`).focus();
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
                    enterprise_id={voucher.enterprise_id}
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
          <div className="blockTitleContainer">
            <p className="blockTitle">Empresas</p>
            <TiPlus
              onClick={() => setCreateEnterpriseModalVisible(true)}
              size={32}
              color={colors.black}
            />
          </div>

          <Spacer />

          <div className="enterprisesList">
            {enterprises
              ?.sort((a, b) =>
                new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
              )
              ?.map((ent) => (
                <ListedEnterprise key={ent._id} enterprise={ent} />
              ))}

            {enterprises.length === 0 && (
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

          <div className="seeMore" onClick={seeMoreEnterprises}>
            <p>Ver todas</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>
      </Container>

      <Modal
        to="bottom"
        isOpen={createVoucherModalVisible}
        setIsOpen={setCreateVoucherModalVisible}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "36.5%",
          height: "90%",
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
            <div className="inputs">
              <div className="input">
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
              <div className="input">
                <p>Quantidade:</p>
                <div className="value">
                  <Input
                    placeholder="0"
                    withBorder
                    type="number"
                    value={voucherAmount}
                    onChange={(e) => setVoucherAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Spacer />
            <EnterprisesList
              invertAnimation
              enterprises={enterprises}
              selectedEnterprise={selectedEnterprise}
              setSelectedEnterprise={setSelectedEnterprise}
              enterpriseWidth={"47%"}
            />
          </div>
          <Button onClick={runCreateVoucher}>Criar</Button>
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
          <Button onClick={runEditVoucher}>Salvar</Button>
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
          <Button onClick={runCreateUser}>Criar</Button>
        </CreateUserModal>
      </Modal>

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
    </AnimatedPage>
  );
};

export default Loyalty;
