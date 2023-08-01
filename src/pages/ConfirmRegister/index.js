import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import AnimatedPage from "../../components/AnimatedPage";
import Block from "../../components/Block";
import Input from "../../components/Input";
import Button from "../../components/Button";

import api from "../../services/api";

import colors from "../../global/colors";
import { Container } from "./styles";

const ConfirmRegister = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  async function getName() {
    try {
      const { data } = await api.get(
        `/loyalty/get-name-confirm-register?_id=${searchParams.get("_id")}`,
        {
          headers: {
            "confirm-authorization": `Bearer ${searchParams.get("_t")}`,
          },
        }
      );

      setName(data?.name);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function savePassword() {
    try {
      if (password !== passwordC) {
        throw new Error("As senhas não coincidem!");
      }

      await api.post(
        `/loyalty/confirm-register`,
        {
          _id: searchParams.get("_id"),
          password,
        },
        {
          headers: {
            "confirm-authorization": `Bearer ${searchParams.get("_t")}`,
          },
        }
      );

      toast.success("Cadastrado com sucesso!");
      setTimeout(() => {
        window.location.href = "https://loyalty.leparse.tech/login";
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <AnimatedPage>
      <Container>
        <Block className="form">
          <p>Olá, {name}! Digite sua senha</p>

          <div className="inputs">
            <Input
              placeholder="Digite sua senha"
              withBorder
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Confirme sua senha"
              withBorder
              type="password"
              value={passwordC}
              onChange={(e) => setPasswordC(e.target.value)}
            />
          </div>

          <Button
            onClick={savePassword}
            style={{ backgroundColor: colors.green, width: "100%" }}
          >
            Salvar senha
          </Button>
        </Block>
      </Container>
    </AnimatedPage>
  );
};

export default ConfirmRegister;
