import { useCallback, useState, useEffect } from "react";

import { elementToSVG } from "dom-to-svg";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { useGlobal } from "../../../contexts/global";

import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";
import AnimatedPage from "../../../components/AnimatedPage";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import leParseLogo from "../../../assets/images/leparse-logo.png";
import shareIcon from "../../../assets/icons/share-icon.png";
import placeholderLogo from "../../../assets/images/placeholder-logo.png";
import colorIcon from "../../../assets/icons/colors-icon.png";

import { ReactComponent as TrashIcon } from "../../../assets/svg/trash-icon.svg";

import api from "../../../services/api";

import colors from "../../../global/colors";
import {
  Container,
  Top,
  Content,
  Half,
  Data,
  Address,
  EnterpriseContainer,
  Drop,
  Store,
  AddStore,
} from "./styles";

const Initial = () => {
  const { enterprise, getEnterprise } = useGlobal();

  const [logoPreview, setLogoPreview] = useState();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stores, setStores] = useState([{}]);
  const [storeNames, setStoreNames] = useState([]);

  const onDrop = useCallback((file) => {
    file = file[0];

    let reader = new FileReader();

    reader.onloadend = (e) => {
      setLogoPreview(reader.result);
      let c = document.querySelector("#logoPreview");
      c.style.backgroundColor = "white";
      document.querySelector("#dropzone").classList.toggle("dropzoneSelected");
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/svg": [".svg"],
    },
    onError: () => {
      toast("Formato de arquivo inválido!", {
        type: "error",
      });
    },
  });

  function shareEnterpriseCard() {
    const svg = elementToSVG(document.querySelector("#enterprise-card"));
    let svgString = new XMLSerializer().serializeToString(svg);

    if (
      !svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
    ) {
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    if (!svgString.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }

    svgString = '<?xml version="1.0" standalone="no"?>\r\n' + svgString;

    let url =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `My LeParse Enterprise Card.svg`);

    document.body.appendChild(link);

    link.click();
    link.parentNode.removeChild(link);
  }

  async function getRandomColor() {
    let { data } = await api.get(
      `/settings/get-random-color?enterprise_id=${id}`
    );

    return data.color;
  }

  async function addStore() {
    let color = await getRandomColor();

    setStores([
      ...stores,
      {
        id: Math.random() * 1024,
        name: "",
        color,
      },
    ]);
    setStoreNames([...storeNames, ""]);
  }

  function removeStore(index) {
    if (stores.length !== 1) {
      let actualStores = stores.filter((_, i) => i !== index);

      setStores(actualStores);
      storeNames.splice(index, 1);
      setStoreNames(storeNames);
    }
  }

  function updateStoreNames(_s = stores) {
    let names = _s.map((e) => e.name);

    for (let i = 0; i < _s.length; i++) {
      names[i] = _s[i].name;
    }
    setStoreNames([...names]);
  }

  async function setRandomColor(index = 0) {
    let color = await getRandomColor();
    let actualStores = stores;

    actualStores[index].color = color;

    setStores([...actualStores]);
  }

  function loadEnterprise() {
    if (JSON.stringify(enterprise) !== JSON.stringify({})) {
      setId(enterprise._id);
      setName(enterprise.name);
      setPrincipalName(enterprise.principal_name);
      setCnpj(enterprise.cnpj);
      setStreet(enterprise.address.street);
      setNumber(enterprise.address.number);
      setComplement(enterprise.address.complement);
      setZipCode(enterprise.address.zip_code);
      setCity(enterprise.address?.city);
      setState(enterprise.address?.state);
      setStores(enterprise.unities);
      setStoreNames(enterprise.unities.map((e) => e.name));
    }
  }

  async function changeInfo(value, setValue) {
    setValue(value);
  }

  async function save() {
    try {
      if (
        name === "" ||
        principalName === "" ||
        cnpj === "" ||
        street === "" ||
        number === "" ||
        complement === "" ||
        zipCode === ""
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      let toVerify = [];

      for (let i = 0; i < storeNames.length; i++) {
        if (storeNames[i] === "") {
          return toast.warn("Preencha todos os nomes das lojas!");
        }

        if (toVerify.includes(storeNames[i])) {
          return toast.warn(
            "Existem lojas repetidas! Por favor escolha um nome diferente."
          );
        } else {
          toVerify.push(storeNames[i]);
        }
      }

      await api.put("/settings/", {
        _id: id,
        name,
        principal_name: principalName,
        cnpj,
        address: {
          street,
          number,
          complement,
          zip_code: zipCode,
        },
        unities: stores.map((store, i) => {
          return {
            ...store,
            name: storeNames[i],
          };
        }),
      });

      await getEnterprise();
      toast.success("Salvo!");
    } catch (error) {
      toast.error("Falha ao salvar!");
    }
  }

  const EnterpriseCard = () => {
    return (
      <EnterpriseContainer id="enterprise-card">
        <h2>LeParse Enterprise Card</h2>

        <div>
          <p>{name}</p>
          <p>{principalName}</p>
          <p>{cnpj}</p>
        </div>

        <div>
          <p>
            {street}, {number}
          </p>
          <p>{complement}</p>
          <p>{zipCode}</p>
        </div>

        {(name === "" ||
          principalName === "" ||
          cnpj === "" ||
          street === "" ||
          number === "" ||
          complement === "" ||
          zipCode === "") && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(4px)",
              zIndex: 99,
              borderRadius: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
            >
              Insira todos os dados...
            </p>
          </div>
        )}

        <img
          onClick={shareEnterpriseCard}
          id="share"
          src={shareIcon}
          alt="Share"
        />
        <p id="id">{id}</p>

        <img src={leParseLogo} alt="LeParse" />
      </EnterpriseContainer>
    );
  };

  useEffect(() => {
    updateStoreNames();
    loadEnterprise();
  }, [enterprise]);

  return (
    <AnimatedPage>
      <Container>
        <Block
          style={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Top>
            <p className="blockTitle">Empresa</p>
            <Button onClick={save}>Salvar</Button>
          </Top>
          <Spacer />
          <Content>
            <Half
              style={{
                gridColumn: "1 / 1",
              }}
            >
              <p className="blockSubtitle">Logo</p>

              <Drop id="dropzone" {...getRootProps()}>
                <input {...getInputProps()} accept=".jpg|.jpeg|.png|.svg" />

                {isDragActive ? (
                  <img
                    src={placeholderLogo}
                    alt="Logo Placeholder"
                    style={{
                      opacity: 0.5,
                    }}
                  />
                ) : (
                  <img src={placeholderLogo} alt="Logo Placeholder" />
                )}

                <div
                  style={{
                    backgroundImage: `url(${logoPreview})`,
                  }}
                  id="logoPreview"
                  src={logoPreview}
                />

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 99,
                    backgroundColor: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Raleway",
                      fontSize: "1rem",
                      fontWeight: "300",
                      color: "white",
                    }}
                  >
                    Em breve...
                  </p>
                </div>
              </Drop>

              <p className="blockSubtitle">Dados</p>
              <div className="dataHalfer">
                <div>
                  <Data>
                    <p>Nome:</p>
                    <Input
                      type="text"
                      placeholder="Nome da empresa"
                      value={name}
                      onChange={(e) => {
                        changeInfo(e.target.value, setName);
                      }}
                    />
                  </Data>
                  <Data>
                    <p>Representante:</p>
                    <Input
                      type="text"
                      placeholder="Nome do representante"
                      value={principalName}
                      onChange={(e) => {
                        changeInfo(e.target.value, setPrincipalName);
                      }}
                    />
                  </Data>
                  <Data>
                    <p>CNPJ:</p>
                    <Input
                      masked
                      placeholder="99.999.999/9999-99"
                      mask="99.999.999/9999-99"
                      alwaysShowMask={false}
                      value={cnpj}
                      onChange={(e) => {
                        changeInfo(e.target.value, setCnpj);
                      }}
                    />
                  </Data>
                </div>
                <EnterpriseCard />
              </div>
              <p className="blockSubtitle">Endereço</p>
              <Address>
                <Data>
                  <p>Rua:</p>
                  <Input
                    type="text"
                    placeholder="Nome da rua"
                    value={street}
                    onChange={(e) => {
                      changeInfo(e.target.value, setStreet);
                    }}
                  />
                </Data>
                <Data
                  style={{
                    width: 100,
                  }}
                >
                  <p>Número:</p>
                  <Input
                    masked
                    mask="9999999"
                    maskChar=""
                    placeholder="Número"
                    value={number}
                    onChange={(e) => {
                      changeInfo(e.target.value, setNumber);
                    }}
                  />
                </Data>
                <Data>
                  <p>Complemento:</p>
                  <Input
                    type="text"
                    placeholder="Complemento"
                    value={complement}
                    onChange={(e) => {
                      changeInfo(e.target.value, setComplement);
                    }}
                  />
                </Data>
                <Data>
                  <p>CEP:</p>
                  <Input
                    type="text"
                    placeholder="CEP"
                    value={zipCode}
                    onChange={(e) => {
                      changeInfo(e.target.value, setZipCode);
                    }}
                  />
                </Data>
                <Data>
                  <p>Cidade:</p>
                  <Input
                    type="text"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => {
                      changeInfo(e.target.value, setCity);
                    }}
                    disabled
                  />
                </Data>
                <Data
                  style={{
                    width: 75,
                  }}
                >
                  <p>Estado:</p>
                  <Input
                    type="text"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => {
                      changeInfo(e.target.value, setState);
                    }}
                    disabled
                  />
                </Data>
              </Address>
            </Half>
            <div
              style={{
                gridColumn: "2 / 2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spacer
                vertical
                style={{
                  height: "87.5%",
                }}
              />
            </div>
            <Half
              style={{
                gridColumn: "3 / 3",
              }}
            >
              <p className="blockSubtitle">Lojas</p>

              <div id="storesGrid">
                <AnimatePresence mode="popLayout">
                  {stores.map((store, i) => (
                    <motion.div
                      key={
                        store._id ? store._id : `${store.color}-${store.name}`
                      }
                      initial={{
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        duration: 0.5,
                      }}
                      layout
                    >
                      <Store
                        backgroundColor={
                          store.color ? store.color : colors.black
                        }
                      >
                        <textarea
                          type="text"
                          placeholder="Nome da loja"
                          value={storeNames[i]}
                          onChange={(e) => {
                            let actualStores = storeNames;
                            actualStores[i] = e.target.value;
                            setStoreNames([...actualStores]);
                          }}
                        />
                        <img
                          src={colorIcon}
                          alt="Change color"
                          onClick={() => setRandomColor(i)}
                        />
                        <TrashIcon onClick={() => removeStore(i)} />
                      </Store>
                    </motion.div>
                  ))}
                  <motion.div
                    transition={{
                      type: "spring",
                      duration: 0.5,
                    }}
                    layout
                  >
                    <AddStore onClick={addStore}>+</AddStore>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Half>
          </Content>
        </Block>
      </Container>
    </AnimatedPage>
  );
};

export default Initial;
