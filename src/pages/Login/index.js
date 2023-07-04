import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

import Wave from "react-wavify";
import ReactLoading from "react-loading";

import adminLogo from "../../assets/images/admin-logo.png";

import colors from "../../global/colors";

import { Container, Form, AuthInput, LoginButton } from "./styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogging, setIsLogging] = useState(false);

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

  function login() {
    document.getElementById("loginButton").classList.toggle("clicked");
    setIsLogging(!isLogging);
  }

  return (
    <Container>
      <Form>
        <img src={adminLogo} alt="Logo" draggable={false} />

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

        <LoginButton disabled={isLogging} id="loginButton" onClick={login}>
          {isLogging ? (
            <ReactLoading type={"bubbles"} color={"#fff"} />
          ) : (
            "Entrar"
          )}
        </LoginButton>

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
  );
};

export default Login;
