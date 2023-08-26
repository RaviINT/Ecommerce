import React, { useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
function SignUpBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.authSlice.users);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      details.username.length &&
      details.email &&
      details.confirmPassword &&
      details.password
    ) {
      if (details.email.match(validRegex)) {
        if (details.password != details.confirmPassword) {
          return alert("Password and Confirm Password must be the same");
        } else {
          const findExists = users.findIndex(
            (user) => user.email == details.email
          );

          if (findExists == -1) {
            delete details.confirmPassword;
            dispatch(signUp(details));
            dispatch(
              login({ email: details.email, username: details.username })
            );
            navigate("/");
          } else {
            alert("User is already exist with this email address");
          }
        }
      } else {
        alert("Please enter a valid email");
      }
    } else {
      alert("Please add all values");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Sign Up</div>
      <div>
        <div className={styles.label}>Name</div>
        <input
          type="text"
          name="username"
          value={details.username}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.label}>Email</div>
        <input
          type="text"
          value={details.email}
          name="email"
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.label}>Password</div>
        <input
          type="password"
          name="password"
          value={details.password}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.label}>Confirm Password</div>
        <input
          type="password"
          name="confirmPassword"
          value={details.confirmPassword}
          onChange={handleChange}
          className={styles.input}
        />
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignUpBox;
