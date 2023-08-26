import React, { useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
function LoginBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.authSlice.users);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    if (details.email.length && details.password.length) {
      const fetchUser = users?.find(
        (user) =>
          user.email == details.email && user.password == details.password
      );
      if (fetchUser != undefined) {
        dispatch(
          login({ email: fetchUser.email, username: fetchUser.username })
        );
        navigate("/");
      } else {
        alert("No user found with this credientials");
      }
    } else {
      alert("Please enter all details");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Login</div>
      <div>
        <div className={styles.label}>Email</div>
        <div>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={details.email}
            className={styles.input}
          />
        </div>
        <div className={styles.label}>Password</div>
        <div>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={details.password}
            className={styles.input}
          />
        </div>
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginBox;
