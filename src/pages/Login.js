import React, { useContext, useState } from "react";
import styles from "../assets/css/Login.module.css";
import { Link, useNavigate } from "react-router-dom";

import appLogo from "../assets/images/movix-logo.png";
import { login } from "../api/authApi";
import { toast, Toaster } from "react-hot-toast";
import UserContext from "../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const handleFormSubmit = async evt => {
    evt.preventDefault();

    const data = { username, password };
    try {
      const response = await login(data);
      if (response.status === 200) {
        const { user, token } = response.data;
        setUser({ user, token });
        navigate("/home");
      } else if (
        response.code === "ERR_BAD_REQUEST" &&
        response.response.status === 400
      ) {
        return toast.error(response.response.data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <Toaster />
      <div className={styles.login__section}></div>

      <div className={styles.logo__container}>
        <img style={{ width: "180px" }} src={appLogo} alt="" />
      </div>
      <div className={styles.login__wrapper}>
        <form action="" autoComplete="off" onSubmit={handleFormSubmit}>
          <h2 className={styles.form__heading}>Login</h2>
          <div className={styles.login__inputWrapper}>
            <input
              className={styles.login__input}
              type="text"
              id="username"
              value={username}
              onChange={evt => setUsername(evt.target.value)}
              required
            />
            <label>Username</label>
            <span className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.login__inputWrapper}>
            <input
              className={styles.login__input}
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={evt => setPassword(evt.target.value)}
              required
            />
            <label>Password</label>
            <span className={styles.icon} onClick={togglePasswordVisibility}>
              <i
                className={showPassword ? "far fa-eye" : "far fa-eye-slash"}
              ></i>
            </span>
            <span className={styles.line}></span>
          </div>

          <div className={styles.checkInput}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link className={styles.link} to="#">
              Forgot Password ?
            </Link>
          </div>
          <button
            className={styles.login__button}
            type="submit"
            onClick={handleFormSubmit}
          >
            Login
          </button>
          <div className={styles.ctaRegister}>
            <p>
              Don't have an account ?{" "}
              <Link className={styles.link} to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
