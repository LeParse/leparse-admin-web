import { useCallback, useState, useEffect } from "react";

import InputMask from "react-input-mask";
import { elementToSVG } from "dom-to-svg";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import Block from "../../../components/Block";
import Spacer from "../../../components/Spacer";

import leParseLogo from "../../../assets/images/leparse-logo.png";
import shareIcon from "../../../assets/icons/share-icon.png";
import placeholderLogo from "../../../assets/images/placeholder-logo.png";
import colorIcon from "../../../assets/icons/colors-icon.png";
import trashIcon from "../../../assets/icons/trash-icon.png";

import colors from "../../../global/colors";
import {
  Container,
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
  const [logoPreview, setLogoPreview] = useState();
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

  function getRandomColor(index = 0) {}

  function addStore() {
    setStores([
      ...stores,
      {
        id: Math.random() * 1024,
        name: "",
        color: null,
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

  const EnterpriseCard = () => {
    return (
      <EnterpriseContainer id="enterprise-card">
        <h2>LeParse Enterprise Card</h2>

        <div>
          <p>Paris 6</p>
          <p>Igor Augusto Gomes de Melo</p>
          <p>99.999.999/9999-99</p>
        </div>

        <div>
          <p>Rua João Pimenta, 105</p>
          <p>Apto 33</p>
          <p>04736-040</p>
        </div>

        <img
          onClick={shareEnterpriseCard}
          id="share"
          src={shareIcon}
          alt="Share"
        />
        <p id="id">6445af73f8df0004263b2b2b</p>

        <img src={leParseLogo} alt="LeParse" />
      </EnterpriseContainer>
    );
  };

  function updateStoreNames(_s = stores) {
    let names = _s.map((e) => e.name);

    for (let i = 0; i < _s.length; i++) {
      names[i] = _s[i].name;
    }
    setStoreNames([...names]);
  }

  useEffect(() => {
    updateStoreNames();
  }, []);

  return (
    <Container>
      <Block
        style={{
          height: "87.5vh",
          overflowY: "auto",
          margin: 0,
        }}
      >
        <p className="blockTitle">Empresa</p>
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
            </Drop>

            <p className="blockSubtitle">Dados</p>
            <div className="dataHalfer">
              <div>
                <Data>
                  <p>Nome:</p>
                  <input type="text" placeholder="Nome da empresa" />
                </Data>
                <Data>
                  <p>Representante:</p>
                  <input type="text" placeholder="Nome do representante" />
                </Data>
                <Data>
                  <p>CNPJ:</p>
                  <InputMask
                    placeholder="99.999.999/9999-99"
                    mask="99.999.999/9999-99"
                    alwaysShowMask={false}
                  />
                </Data>
              </div>
              <EnterpriseCard />
            </div>
            <p className="blockSubtitle">Endereço</p>
            <Address>
              <Data>
                <p>Rua:</p>
                <input type="text" placeholder="Nome da rua" />
              </Data>
              <Data
                style={{
                  width: 100,
                }}
              >
                <p>Número:</p>
                <InputMask mask="9999999" maskChar="" placeholder="Número" />
              </Data>
              <Data>
                <p>Complemento:</p>
                <input type="text" placeholder="Complemento" />
              </Data>
              <Data>
                <p>CEP:</p>
                <input type="text" placeholder="CEP" />
              </Data>
              <Data>
                <p>Cidade:</p>
                <input type="text" placeholder="Cidade" />
              </Data>
              <Data
                style={{
                  width: 75,
                }}
              >
                <p>Estado:</p>
                <input type="text" placeholder="Estado" />
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
              <AnimatePresence>
                {stores.map((store, i) => (
                  <motion.div
                    key={store.id ? store.id : `${store.color}-${store.name}`}
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    exit={{
                      scale: 0,
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.5,
                    }}
                    layout
                  >
                    <Store
                      backgroundColor={store.color ? store.color : colors.black}
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
                        onClick={() => getRandomColor(i)}
                      />
                      <img
                        src={trashIcon}
                        alt="Delete store"
                        onClick={() => removeStore(i)}
                      />
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
  );
};

export default Initial;
