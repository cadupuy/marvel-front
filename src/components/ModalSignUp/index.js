import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const Login = ({ setUser, apiUrl, setIsModal }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setIsModal(false);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handleUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/user/signup`, {
        email: email,
        password: password,
        username: username,
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
              type="text"
              onChange={handleUsername}
              value={username}
              placeholder="Nom d'utilisateur"
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

          <p>Already have an account? Sign In</p>

          <FontAwesomeIcon onClick={handleClose} icon="times" />
        </div>
      </section>
    </>
  );
};

export default Login;
