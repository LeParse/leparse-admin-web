import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";
import { TiPlus } from "react-icons/ti";

import { useDebounce } from "../../../utils/debounce.utils";

import { useLoyalty } from "../../../contexts/loyalty";

import AnimatedPage from "../../../components/AnimatedPage";
import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import NoContent from "../../../components/NoContent";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import SearchBar from "../../../components/SearchBar";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import api from "../../../services/api";

import colors from "../../../global/colors";
import {
  GlobalStyle,
  Container,
  Header,
  CreateModal,
  EditModal,
  VerifyMassiveCreationModal,
} from "./styles";

const Vouchers = () => {
  const navigate = useNavigate();

  const { vouchers, setVouchers } = useLoyalty();

  const [createVoucherModalVisible, setCreateVoucherModalVisible] =
    useState(false);
  const [editVoucherModalVisible, setEditVoucherModalVisible] = useState(false);
  const [removeVoucherModalVisible, setRemoveVoucherModalVisible] =
    useState(false);
  const [voucherValue, setVoucherValue] = useState(0);
  const [actualVoucher, setActualVoucher] = useState({});

  const [verifyMassiveCreationModal, setVerifyMassiveCreationModal] =
    useState(false);
  const [massiveCreationAmount, setMassiveCreationAmount] = useState("");
  const [massiveCreationValue, setMassiveCreationValue] = useState("");

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

      const { data } = await api.put("/loyalty/voucher", {
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
      toast.error("Erro ao salvar voucher!");
    }
  }

  async function removeVoucher() {
    try {
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

      setRemoveVoucherModalVisible(false);
      toast.success("Voucher deletado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar voucher!");
    }
  }

  async function massiveCreation() {
    try {
      if (massiveCreationAmount <= 0 || massiveCreationValue <= 0) {
        return toast.error("Valores inválidos!");
      }

      const { data } = await api.post("/loyalty/voucher/massive", {
        amount: massiveCreationAmount,
        value: massiveCreationValue,
      });

      const newVouchers = data?.vouchers;

      setVouchers([...vouchers, ...newVouchers]);
      toast.success("Vouchers criados com sucesso!");
    } catch (err) {
      toast.error(err.message);
    }
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
            <p>{voucher.voucher}</p>
          </td>
          <td>
            <p>{currencyFormat(voucher.value)}</p>
          </td>
          <td>
            <p>
              {new Date(voucher.updatedAt).toLocaleDateString()}{" "}
              {new Date(voucher.updatedAt).toLocaleTimeString()}
            </p>
          </td>
          <td>
            <p>
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
            ?.map((voucher) => {
              return (
                voucher.voucher
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(
                    searchText?.replace(" ", "").toLocaleLowerCase()
                  ) && <Row key={voucher._id} voucher={voucher} />
              );
            })}

          {vouchers?.filter((v) =>
            v.voucher
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
                  left: "1rem",
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
            <BackIcon throwIfNamespace={false} onClick={goBack} />
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
            />
          </Header>
          <Spacer />
          <div className="content">
            <div className="leftContent">{VouchersTable}</div>
            <Spacer vertical />
            <div className="rightContent">
              <p className="title">Criação em massa</p>

              <div className="options">
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
              </div>

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
        contentStyle={{
          width: "auto",
          height: "auto",
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
        </CreateModal>
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
          <Button onClick={saveVoucher}>Salvar</Button>
        </EditModal>
      </Modal>

      <Modal
        isOpen={removeVoucherModalVisible}
        setIsOpen={setRemoveVoucherModalVisible}
        shouldCloseOnOverlayClick
        to="bottom"
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
            onClick={removeVoucher}
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

      <Modal
        to="left"
        isOpen={verifyMassiveCreationModal}
        setIsOpen={setVerifyMassiveCreationModal}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "24rem",
          height: "auto",
          padding: "2rem",
          position: "absolute",
          right: "2rem",
        }}
      >
        <VerifyMassiveCreationModal>
          <p>
            Tem certeza que deseja criar {massiveCreationAmount} voucher
            {massiveCreationAmount > 1 && "s"}, no valor de R${" "}
            {currencyFormat(
              massiveCreationValue.replace(".", "").replace(",", ".")
            )}
            ?
          </p>
          <Spacer />
          <div className="actions">
            <Button
              onClick={massiveCreation}
              style={{
                backgroundColor: colors.green,
              }}
            >
              Criar
            </Button>
            <Button
              onClick={() => setVerifyMassiveCreationModal(false)}
              style={{ backgroundColor: colors.grey }}
            >
              Cancelar
            </Button>
          </div>
        </VerifyMassiveCreationModal>
      </Modal>
    </AnimatedPage>
  );
};

export default Vouchers;
