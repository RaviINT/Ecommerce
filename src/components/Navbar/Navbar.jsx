import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import main_logo from "../../assets/main_logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartLength, setCartLength] = useState(0);
  const username = useSelector((state) => state.authSlice?.userLogin);
  const cartItems = useSelector((state) => state.cartSlice?.cart);

  useEffect(() => {
    const items = cartItems.filter((item) => item?.user == username?.email);
  
    setCartLength(items.length);
  }, [cartItems]);
  return (
    <div className={styles.container}>
      <div className={styles.img_box} onClick={() => navigate("/")}>
        <img src={main_logo} alt="" className={styles.img} />
      </div>
      <div className={styles.right_box}>
        <div>Hi {username?.username}</div>
        <div onClick={() => navigate("/cart")} className={styles.cart_box}>
          <div className={styles.number}>{cartLength}</div>
          <AiOutlineShoppingCart size={25} />
        </div>

        <div className={styles.btn} onClick={() => dispatch(logout())}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Navbar;
