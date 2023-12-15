import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";

import { useDebounce } from "../../../utils/debounce.utils";

import { useLoyalty } from "../../../contexts/loyalty";

import Block from "../../../components/Block";
import NoContent from "../../../components/NoContent";
import EnterprisesList from "../../../components/EnterprisesList";

import {
  AnimatedPage,
  Spacer,
  Input,
  Button,
  Modal,
  SearchBar,
} from "@leparse/ui";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import colors from "../../../global/colors";
import {
  GlobalStyle,
  Container,
  Header,
  CreateModal,
  EditModal,
} from "./styles";

const Vouchers = () => {
  const navigate = useNavigate();

  const { enterprises, vouchers, createVoucher, editVoucher, deleteVoucher } =
    useLoyalty();

  const [createVoucherModalVisible, setCreateVoucherModalVisible] =
    useState(false);
  const [editVoucherModalVisible, setEditVoucherModalVisible] = useState(false);
  const [removeVoucherModalVisible, setRemoveVoucherModalVisible] =
    useState(false);

  const [voucherValue, setVoucherValue] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [selectedEnterprise, setSelectedEnterprise] = useState("");
  const [actualVoucher, setActualVoucher] = useState({});

  const [searchText, setSearchText] = useDebounce("");

  function goBack() {
    navigate(-1);
  }

  function editButton(voucher) {
    setVoucherValue(String(voucher?.value).replace(".", ","));
    setActualVoucher(voucher);
    setEditVoucherModalVisible(true);
  }

  function removeButton(voucher) {
    setActualVoucher(voucher);
    setRemoveVoucherModalVisible(true);
  }

  function runCreateVoucher() {
    createVoucher(voucherValue, voucherAmount, selectedEnterprise)
      .then((vouchers) => {
        setVoucherValue(0);
        setCreateVoucherModalVisible(false);
        toast.success("Voucher criado!");
      })
      .catch((err) => {
        toast.error("Falha ao criar voucher!");
      });
  }

  function runEditVoucher() {
    editVoucher(voucherValue, actualVoucher)
      .then(() => {
        setEditVoucherModalVisible(false);
        toast.success("Voucher salvo!");
      })
      .catch((err) => {
        toast.error("Erro ao salvar voucher!");
      });
  }

  function runDeleteVoucher() {
    deleteVoucher(actualVoucher)
      .then(() => {
        setRemoveVoucherModalVisible(false);
        toast.success("Voucher deletado!");
      })
      .catch((err) => {
        toast.error("Erro ao deletar voucher!");
      });
  }

  function runMassiveCreateVoucher() {
    // massiveCreateVoucher(massiveCreationAmount, massiveCreationValue)
    //   .then(() => {
    //     setVerifyMassiveCreationModal(false);
    //     toast.success("Vouchers criados com sucesso!");
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
  }

  function currencyFormat(num = 200) {
    return Number(num)
      ?.toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  const Row = ({ voucher }) => {
    return (
      <m.tbody
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
            <p
              style={{
                color: voucher.active ? colors.green : colors.red,
              }}
            >
              {voucher.voucher}
            </p>
          </td>
          <td>
            <p>
              {
                enterprises.find((ent) => ent._id === voucher.enterprise_id)
                  ?.name
              }
            </p>
          </td>
          <td>
            <p>{currencyFormat(voucher.value)}</p>
          </td>
          <td>
            <p className="datetime">
              {new Date(voucher.updatedAt).toLocaleDateString()}{" "}
              {new Date(voucher.updatedAt).toLocaleTimeString()}
            </p>
          </td>
          <td>
            <p className="datetime">
              {new Date(voucher.createdAt).toLocaleDateString()}{" "}
              {new Date(voucher.createdAt).toLocaleTimeString()}
            </p>
          </td>
          <td className="actions">
            <EditIcon onClick={() => editButton(voucher)} />
            <TrashIcon onClick={() => removeButton(voucher)} />
          </td>
        </tr>
      </m.tbody>
    );
  };

  const VouchersTable = useMemo(
    () => (
      <table>
        <thead>
          <th>Voucher</th>
          <th>Empresa</th>
          <th>Valor</th>
          <th>Data de modificação</th>
          <th>Data de criação</th>
          <th></th>
        </thead>

        <AnimatePresence mode="wait">
          {vouchers
            ?.sort((a, b) =>
              new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
            )
            ?.map((v) => {
              return (
                (v.voucher
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(searchText?.replace(" ", "").toLocaleLowerCase()) ||
                  enterprises
                    .find((ent) => ent._id === v.enterprise_id)
                    ?.name.toLowerCase()
                    .replace(" ", "")
                    .includes(
                      searchText?.replace(" ", "").toLocaleLowerCase()
                    )) && <Row key={v._id} voucher={v} />
              );
            })}

          {vouchers?.filter(
            (v) =>
              v.voucher
                .toLowerCase()
                .replace(" ", "")
                .includes(searchText?.replace(" ", "").toLocaleLowerCase()) ||
              enterprises
                .find((ent) => ent._id === v.enterprise_id)
                ?.name.toLowerCase()
                .replace(" ", "")
                .includes(searchText?.replace(" ", "").toLocaleLowerCase())
          ).length < 1 && (
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
              }}
              style={{
                width: "calc(100% - 4rem)",
                height: "calc(100% - 13rem)",
                position: "absolute",
              }}
            >
              <NoContent
                style={{
                  position: "absolute",
                  left: "8rem",
                  top: 0,
                  width: "unset",
                  padding: "1rem",

                  p: {
                    fontSize: "1.5rem",
                  },

                  svg: {
                    width: "2.1rem",
                    height: "2.1rem",
                  },
                }}
              />
            </m.div>
          )}
        </AnimatePresence>
      </table>
    ),
    [vouchers, searchText]
  );

  return (
    <AnimatedPage>
      <GlobalStyle />

      <Container>
        <Block
          style={{
            height: "100%",
            overflow: "hidden",
            position: "relative",
            paddingBottom: "2.5rem",
          }}
        >
          <Header>
            <BackIcon
              throwIfNamespace={false}
              onClick={goBack}
              className="back_button"
            />
            <h1>Vouchers</h1>
            <SearchBar
              style={{
                position: "absolute",
                right: "6rem",
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <TiPlus
              onClick={() => setCreateVoucherModalVisible(true)}
              size={32}
              color={colors.black}
              className="create_voucher_button"
            />
          </Header>
          <Spacer />
          <div className="content">
            <div className="leftContent">{VouchersTable}</div>
            <Spacer vertical />
            <div className="rightContent">
              <p className="title">Opções</p>

              <p className="cooming_soon">Em breve...</p>

              {/* <div className="options">
                <div className="option">
                  <p>Quantidade:</p>
                  <Input
                    min={0}
                    placeholder={"0"}
                    type="number"
                    withBorder
                    value={massiveCreationAmount}
                    onChange={(e) => setMassiveCreationAmount(e.target.value)}
                  />
                </div>
                <div className="option">
                  <p>
                    Valor: <b>R$</b>
                  </p>
                  <Input
                    className="value"
                    currency
                    placeholder="0,00"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    decimalScale={2}
                    fixedDecimalScale
                    withBorder
                    value={massiveCreationValue}
                    onChange={(e) => setMassiveCreationValue(e.target.value)}
                  />
                </div>

                <Button
                  id="create"
                  onClick={() => {
                    if (
                      massiveCreationAmount > 0 &&
                      Number(
                        massiveCreationValue.replace(".", "").replace(",", ".")
                      ) > 0
                    ) {
                      setVerifyMassiveCreationModal(true);
                    } else {
                      toast.warn("Preencha os campos!");
                    }
                  }}
                >
                  Criar
                </Button>
              </div> */}

              {/* <p className="title">Remoção em massa</p>

              <div className="options">
                <div className="option">
                  <p>Quantidade:</p>
                  <Input min={0} type="number" withBorder />
                </div>
                <div className="option">
                  <p>
                    Valor: <b>R$</b>
                  </p>
                  <Input
                    className="value"
                    currency
                    placeholder="0,00"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    decimalScale={2}
                    fixedDecimalScale
                    withBorder
                  />
                </div>
                <Button id="remove">Remover</Button>
              </div> */}
            </div>
          </div>
        </Block>
      </Container>

      <Modal
        to="bottom"
        isOpen={createVoucherModalVisible}
        setIsOpen={setCreateVoucherModalVisible}
        shouldCloseOnOverlayClick
        overlayStyle={{
          left: "-9rem",
        }}
        contentStyle={{
          width: "36.5%",
          height: "90%",
          padding: "2rem",
        }}
      >
        <CreateModal>
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
        </CreateModal>
      </Modal>

      <Modal
        to="bottom"
        isOpen={editVoucherModalVisible}
        setIsOpen={setEditVoucherModalVisible}
        shouldCloseOnOverlayClick
        overlayStyle={{
          left: "-9rem",
        }}
        contentStyle={{
          width: "auto",
          height: "auto",
          padding: "2rem",
        }}
      >
        <EditModal>
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
                <p
                  style={{
                    opacity: 0.5,
                    fontWeight: 700,
                  }}
                >
                  R$
                </p>
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
        </EditModal>
      </Modal>

      <Modal
        isOpen={removeVoucherModalVisible}
        setIsOpen={setRemoveVoucherModalVisible}
        shouldCloseOnOverlayClick
        to="bottom"
        overlayStyle={{
          left: "-9rem",
        }}
        contentStyle={{
          width: "24rem",
          height: "auto",
          padding: "2rem",
        }}
      >
        <div className="modalHeader">
          <p
            style={{
              fontSize: "1.5rem",
              whiteSpace: "normal",
              lineHeight: "1.5rem",
              fontWeight: 500,
            }}
          >
            Tem certeza que deseja deletar este voucher?
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
          <p
            style={{
              width: "100%",
              margin: "2rem 0",
              fontFamily: "Raleway",
              fontWeight: 700,
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            {actualVoucher?.voucher}
          </p>
          <Button
            onClick={runDeleteVoucher}
            style={{ backgroundColor: colors.red, width: "100%" }}
          >
            Remover
          </Button>
          <Button
            onClick={() => setRemoveVoucherModalVisible(false)}
            style={{ backgroundColor: colors.grey, width: "100%" }}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </AnimatedPage>
  );
};

export default Vouchers;
