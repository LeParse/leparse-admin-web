import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { toast } from "react-toastify";

import { TiPlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

import { useLoyalty } from "../../../contexts/loyalty";

import { useDebounce } from "../../../utils/debounce.utils";

import Block from "../../../components/Block";
import NoContent from "../../../components/NoContent";
import FilterButton from "../../../components/FilterButton";
import EnterprisesList from "../../../components/EnterprisesList";

import {
  AnimatedPage,
  Button,
  Section,
  Modal,
  Input,
  Spacer,
  SearchBar,
  LoadingFreeze,
  DateTimePicker,
} from "@leparse/ui";

import { ReactComponent as BackIcon } from "../../../assets/svg/back-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-icon.svg";

import colors from "../../../global/colors";
import {
  Container,
  Header,
  GlobalStyle,
  CreateEnterpriseModal,
  EditEnterpriseModal,
  FilterModal,
} from "./styles";

const Enterprise = () => {
  const navigate = useNavigate();
  const {
    enterprises,
    createLoyaltyEnterprise,
    editLoyaltyEnterprise,
    deleteLoyaltyEnterprise,
  } = useLoyalty();

  const [removeEnterpriseModal, setRemoveEnterpriseModal] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState({});

  const [enterpriseId, setEnterpriseId] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseCNPJ, setEnterpriseCNPJ] = useState("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseZipCode, setEnterpriseZipCode] = useState("");
  const [enterpriseStreet, setEnterpriseStreet] = useState("");
  const [enterpriseNumber, setEnterpriseNumber] = useState();
  const [enterpriseNeighborhood, setEnterpriseNeighborhood] = useState("");

  const [createEnterpriseModalVisible, setCreateEnterpriseModalVisible] =
    useState(false);
  const [editEnterpriseModalVisible, setEditEnterpriseModalVisible] =
    useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(true);

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
    } catch (err) {
      toast.error("Falha ao pesquisar CEP!");
    } finally {
      setTimeout(() => {
        setIsFetchingCEP(false);
      }, 500);
    }
  }

  function editButton(enterprise) {
    setEnterpriseId(enterprise?._id);
    setEnterpriseName(enterprise?.name);
    setEnterpriseCNPJ(enterprise?.cnpj);
    setEnterprisePhone(enterprise?.phone);
    setEnterpriseZipCode(enterprise?.address?.zip_code);
    setEnterpriseStreet(enterprise?.address?.street);
    setEnterpriseNumber(enterprise?.address?.number);
    setEnterpriseNeighborhood(enterprise?.address?.neighborhood);

    setEditEnterpriseModalVisible(true);
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
    editLoyaltyEnterprise(
      enterpriseId,
      enterpriseName,
      enterpriseCNPJ,
      enterprisePhone,
      enterpriseZipCode,
      enterpriseStreet,
      enterpriseNumber,
      enterpriseNeighborhood
    )
      .then(() => {
        setEnterpriseId("");
        setEnterpriseName("");
        setEnterpriseCNPJ("");
        setEnterprisePhone("");
        setEnterpriseZipCode("");
        setEnterpriseStreet("");
        setEnterpriseNumber("");
        setEnterpriseNeighborhood("");
        setEditEnterpriseModalVisible(false);

        toast.success("Empresa salva!");
      })
      .catch((err) => {
        toast.error("Falha ao salvar empresa!");
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
    setSelectedEnterprise({});
    setEnterpriseId("");
    setEnterpriseName("");
    setEnterpriseCNPJ("");
    setEnterprisePhone("");
    setEnterpriseZipCode("");
    setEnterpriseStreet("");
    setEnterpriseNumber("");
    setEnterpriseNeighborhood("");
    setEditEnterpriseModalVisible(false);
    setCreateEnterpriseModalVisible(!createEnterpriseModalVisible);
  }

  function toggleRemoveEnterpriseModal() {
    setSelectedEnterprise({});
    setRemoveEnterpriseModal(!removeEnterpriseModal);
  }

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
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

  const EnterprisesTable = useMemo(() => {
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
            <BackIcon
              id="backButton"
              throwIfNamespace={false}
              onClick={goBack}
            />
            <h1>Empresas</h1>
            <SearchBar
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              style={{
                position: "absolute",
                right: "8.5rem",
              }}
            />
            <FilterButton
              style={{
                position: "absolute",
                right: "5.5rem",
              }}
              onClick={toggleFilterModal}
            />
            <TiPlus
              id="createButton"
              onClick={toggleCreateEnterpriseModal}
              size={32}
              color={colors.black}
            />
          </Header>
          <Spacer />
          {EnterprisesTable}
        </Block>
      </Container>

      <Modal
        to="bottom"
        isOpen={createEnterpriseModalVisible}
        setIsOpen={setCreateEnterpriseModalVisible}
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
        to="bottom"
        isOpen={editEnterpriseModalVisible}
        setIsOpen={setEditEnterpriseModalVisible}
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
        <EditEnterpriseModal>
          <div className="modalHeader">
            <p>Editar empresa</p>
            <CloseIcon onClick={() => setEditEnterpriseModalVisible(false)} />
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
                  />
                </div>

                <LoadingFreeze show={isFetchingCEP} />
              </div>
            </div>
          </div>
          <Button onClick={runEditLoyaltyEnterprise}>Salvar</Button>
        </EditEnterpriseModal>
      </Modal>

      <Modal
        isOpen={removeEnterpriseModal}
        setIsOpen={setRemoveEnterpriseModal}
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

      <Modal
        to="bottom"
        isOpen={filterModalVisible}
        setIsOpen={setFilterModalVisible}
        shouldCloseOnOverlayClick
        overlayStyle={{
          left: "-9rem",
        }}
        contentStyle={{
          width: "50%",
          height: "fit-content",
          padding: "2rem",
        }}
      >
        <FilterModal>
          <div className="modalHeader">
            <p>Filtrar</p>
            <CloseIcon onClick={toggleFilterModal} />
          </div>

          <Spacer />

          <div className="modalContent">
            <Section title="Empresa">
              <EnterprisesList
                invertAnimation
                enterprises={enterprises}
                selectedEnterprise={selectedEnterprise}
                setSelectedEnterprise={setSelectedEnterprise}
                enterpriseWidth={"47%"}
              />
            </Section>

            <div className="filter">
              <p className="filter_title">Período</p>

              <DateTimePicker />
            </div>
          </div>
        </FilterModal>
      </Modal>
    </AnimatedPage>
  );
};

export default Enterprise;
