import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/css/Register.module.css";

import appLogo from "../assets/images/movix-logo.png";

import { toast, Toaster } from "react-hot-toast";
import { register } from "../api/authApi";
import UserContext from "../context/UserContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFormSubmit = async evt => {
    evt.preventDefault();
    const data = { username, password, confirmPassword };
    try {
      const response = await register(data);

      if (response.status === 201) {
        const { newUser, token } = response.data;
        setUser({ user: newUser, token });
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
      console.log(error);
    }
  };

  return (
    <div className={styles.register}>
      <Toaster />
      <div className={styles.logo__container}>
        <img style={{ width: "180px" }} src={appLogo} alt="" />
      </div>
      <div className={styles.register__wrapper}>
        <form action="" autoComplete="off" onSubmit={handleFormSubmit}>
          <h2 className={styles.form__heading}>Register</h2>
          <div className={styles.register__inputWrapper}>
            <input
              className={styles.register__input}
              type="text"
              value={username}
              id="email"
              onChange={evt => setUsername(evt.target.value)}
              required
            />
            <label>Username</label>
            <span className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.register__inputWrapper}>
            <input
              className={styles.register__input}
              type={showPassword ? "text" : "password"}
              value={password}
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
          <div className={styles.register__inputWrapper}>
            <input
              className={styles.register__input}
              value={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={evt => setConfirmPassword(evt.target.value)}
              required
            />
            <label>Confirm Password</label>
            <span
              className={styles.icon}
              onClick={toggleConfirmPasswordVisibility}
            >
              <i
                className={
                  showConfirmPassword ? "far fa-eye" : "far fa-eye-slash"
                }
              ></i>
            </span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.checkInput}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button
            className={styles.register__button}
            type="submit"
            onClick={handleFormSubmit}
          >
            Register
          </button>
          <div className={styles.ctaLogin}>
            <p>
              Already have an account ?{" "}
              <Link className={styles.link} to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
