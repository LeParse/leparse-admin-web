import { useState, useEffect, useRef } from "react";
import Wave from "react-wavify";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { m, useAnimationControls } from "framer-motion";

import { useGlobal } from "../../contexts/global";

import Button from "../../components/Button";

import adminLogo from "../../assets/images/admin-logo.png";

import colors from "../../global/colors";

import { Container, Form, AuthInput } from "./styles";

const Login = () => {
  const { login } = useGlobal();
  const navigate = useNavigate();

  const controls = useAnimationControls();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let initialLoading = useRef(true);

  function focusInput(inputType) {
    if (inputType === "username") {
      document.getElementById("usernameIcon").classList.toggle("active");
      if (username === "") {
        document
          .getElementById("usernamePlaceholder")
          .classList.toggle("active");
      }
    }

    if (inputType === "password") {
      document.getElementById("passwordIcon").classList.toggle("active");
      if (password === "") {
        document
          .getElementById("passwordPlaceholder")
          .classList.toggle("active");
      }
    }
  }

  function preLogin() {
    login(username, password)
      .then((user) => {
        toast.success("Sucesso!");
        controls
          .start({
            opacity: 0,
            x: "-25vw",
            transition: {
              type: "spring",
              mass: 0.1,
              delay: 1,
            },
          })
          .then(() => {
            navigate("/app");
          });
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              toast.warn("Usuário/senha incorreto (a/os/as)!");
              break;
            case 500:
              toast.error(
                "Estamos com uma instabilidade em nossos servidores. Por favor, tente novamente mais tarde."
              );
              break;
            default:
              toast.error("Erro desconhecido. Por favor, tente novamente");
              break;
          }
        } else {
          toast.error("Erro desconhecido. Por favor, tente novamente");
        }
      });
  }

  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: true,
        mass: 0.5,
      },
    });

    if (
      window.location.search.includes("noToken=true") &&
      initialLoading.current
    ) {
      toast.warn("Por favor, faça o login.");
      initialLoading.current = false;
    }

    if (
      window.location.search.includes("expiredToken=true") &&
      initialLoading.current
    ) {
      toast.warn("Seu acesso expirou! Por favor faça o login novamente.");
      initialLoading.current = false;
    }

    console.log(document.querySelectorAll("input"));

    if (document.querySelectorAll("input")[0].value !== "") {
      focusInput("username");
    }

    if (document.querySelectorAll("input")[1].value !== "") {
      focusInput("password");
    }
  }, []);

  return (
    <m.div
      initial={{
        scale: 0,
        opacity: 0,
        transition: {
          type: "spring",
          bounce: true,
          mass: 0.5,
        },
      }}
      animate={controls}
    >
      <Container>
        <Form>
          <img src={adminLogo} alt="Logo" draggable={false} />

          <div>
            <AuthInput>
              <FaUser id="usernameIcon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => focusInput("username")}
                onBlur={() => focusInput("username")}
              />
              <p id="usernamePlaceholder">Usuário</p>
            </AuthInput>
            <AuthInput>
              <FaLock id="passwordIcon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => focusInput("password")}
                onBlur={() => focusInput("password")}
              />
              <p id="passwordPlaceholder">Senha</p>
            </AuthInput>
          </div>

          <Button
            style={{
              width: "35%",
              height: "4rem",
              fontSize: "1.5rem",
              marginTop: "2.75rem",
            }}
            type="submit"
            onClick={preLogin}
          >
            Entrar
          </Button>

          <Wave
            fill={colors.primary}
            options={{
              height: 100,
              amplitude: 25,
              speed: 0.1,
              points: 5,
            }}
            style={{
              width: "100%",
              position: "absolute",
              bottom: "-5px",
            }}
          />
        </Form>
      </Container>
    </m.div>
  );
};

export default Login;
