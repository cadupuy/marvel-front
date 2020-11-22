import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const Login = ({ setUser, apiUrl, setIsModal, setIsModalSignUp }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    setIsModal(false);
    setIsModalSignUp(true);
  };
  const handleClose = () => {
    setIsModal(false);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        const token = response.data.token;
        setUser(token);
        setIsModal(false);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || error.response.data.error);
    }
  };
  return (
    <>
      <section className="login-form">
        <div className="container">
          <img
            src="https://marvel-jolisdegats.netlify.app/static/media/Marvel-Comics-Logo.575beca3.png"
            alt=""
          />
          <form onSubmit={handleSubmit}>
            <input
              className={error !== "" ? "input-error" : "input-modal"}
              type="email"
              onChange={handleEmail}
              value={email}
              placeholder="Adresse email"
            />
            <input
              className={error !== "" ? "input-error" : "input-modal"}
              type="password"
              onChange={handlePassword}
              value={password}
              placeholder="Mot de passe"
            />
            <input type="submit" value="SE CONNECTER" />
          </form>

          <div>
            <p className="error-message">{error}</p>
          </div>
          <div className="hr"></div>
          <div>
            <div className="signup-text">
              <button onClick={handleSignUp}>S'INSCRIRE</button>
            </div>
          </div>
          <FontAwesomeIcon onClick={handleClose} icon="times" />
        </div>
      </section>
    </>
  );
};

export default Login;
