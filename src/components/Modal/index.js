import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Login = ({ setUser, apiUrl, setIsModal }) => {
  let history = useHistory();
  const location = useLocation();
  const fromFavs = location.state?.fromFavs ? true : false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const response = await axios.post(`http://localhost:3001/user/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        const token = response.data.token;
        setUser(token);
        setIsModal(false);

        // history.push(fromPublish ? "/favorites" : "/");
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
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={error !== "" ? "input-error" : "input-modal"}
              type="text"
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
            <input type="submit" value="Se connecter" />
          </form>
          <div>
            <Link className="signup-text" to="/signup">
              Pas encore de compte ? Inscris-toi !
            </Link>
          </div>
          <div>
            <p className="error-message">{error}</p>
          </div>
        </div>
        <p onClick={handleClose}> XXXX</p>
      </section>
    </>
  );
};

export default Login;
