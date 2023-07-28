import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoyalty } from "../../../contexts/loyalty";

import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import ListedUser from "../../../components/ListedUser";
import ListedVoucher from "../../../components/ListedVoucher";
import AnimatedPage from "../../../components/AnimatedPage";
import NoContent from "../../../components/NoContent";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import { SlArrowRight } from "react-icons/sl";
import { TiPlus } from "react-icons/ti";

import api from "../../../services/api";

import colors from "../../../global/colors";
import { Container, CreateModal, Title } from "./styles";

const Loyalty = () => {
  const { users, vouchers, setVouchers } = useLoyalty();

  const navigate = useNavigate();

  const [createVoucherModalVisible, setCreateVoucherModalVisible] =
    useState(false);
  const [voucherValue, setVoucherValue] = useState(0);

  function seeMoreUsers() {
    navigate("/app/loyalty/users");
  }

  function seeMoreStores() {}

  function createVoucherModal() {
    setCreateVoucherModalVisible(true);
  }

  async function createVoucher() {
    try {
      if (!voucherValue) {
        return toast.warn("Insira o valor do voucher!");
      }

      const { data } = await api.post("/loyalty/create-voucher", {
        value: voucherValue,
      });

      setVouchers((vouchers) => [...vouchers, data?.voucher]);

      toast.success("Voucher criado!");
      setCreateVoucherModalVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar voucher!");
    }
  }

  return (
    <AnimatedPage>
      <Container>
        <Title>
          <p>Loyalty</p>
        </Title>

        <Block
          style={{
            gridArea: "users",
            width: 500,
          }}
        >
          <p className="blockTitle">Usuários</p>

          <Spacer />

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

          <div className="usersList">
            {vouchers?.map((voucher) => (
              <ListedVoucher
                key={voucher._id}
                code={voucher.voucher}
                value={voucher.value}
                createdAt={voucher.createdAt}
                onClick={() => {}}
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

          <div className="seeMore">
            <p>Ver todos</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>
        </Block>

        <Block
          style={{
            gridArea: "tuitions",
          }}
        >
          <p className="blockTitle">Mensalidades</p>

          <Spacer />

          <div className="tuitions">
            <p>Você possui 2 mensalidades pendentes!</p>
            <p>Pague e evite o congelamento</p>
          </div>

          <div className="seeMore">
            <p>Ver detalhes</p>

            <SlArrowRight color={colors.black} size={18} />
          </div>

          <div
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
          </div>
        </Block>
      </Container>

      <Modal
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
    </AnimatedPage>
  );
};

export default Loyalty;
