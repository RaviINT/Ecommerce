import React, { useState } from "react";
import styles from "./style.module.css";
import LoginBox from "../../components/LoginBox/LoginBox";
import main_logo from "../../assets/main_logo.jpg";
import SignUpBox from "../../components/SignUpBox/SignUpBox";
function Login() {
  const [login, setLogin] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_box}>
          <img src={main_logo} alt="" className={styles.img} />
        </div>
        <div className={styles.right_box}>
          <div className={styles.text} onClick={() => setLogin(!login)}>
            {login ? "Sign Up" : "Login"}
          </div>
          <div className={styles.text}>About</div>
          <div className={styles.text}>Contact Us</div>
        </div>
      </div>
      <div className={styles.body}>{login ? <LoginBox /> : <SignUpBox />}</div>
    </div>
  );
}

export default Login;
