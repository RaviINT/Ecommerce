import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeCart } from "../../store/slices/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const [sum, setSum] = useState(0);
  const [Items, setItems] = useState([]);
  const CartItems = useSelector((state) => state?.cartSlice?.cart);
  const User = useSelector((state) => state?.authSlice?.userLogin);

  useEffect(() => {
    let total = Items?.reduce(function (a, b) {
      return a + b.price;
    }, 0);
    setSum(total);
  }, [Items]);
  useEffect(() => {
    const tempItems = CartItems.filter((item) => item.user === User?.email);
    setItems(tempItems);
  }, [CartItems]);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main_box}>
        <div className={styles.left_box}>
          {Items.length ? (
            <>
              {Items?.map((cartItem) => (
                <div className={styles.box}>
                  <div className={styles.sub_box}>
                    <div className={styles.img_box}>
                      <img
                        src={cartItem.thumbnail}
                        className={styles.img}
                        alt=""
                      />
                    </div>
                    <div className={styles.item_right_box}>
                      <div className={styles.title}>{cartItem.title}</div>
                      <div className={styles.price}>₹{cartItem.price}</div>
                    </div>
                  </div>

                  <div
                    className={styles.icon}
                    onClick={() => dispatch(removeCart(cartItem.id))}
                  >
                    <AiFillDelete size={30} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.item}>No Items in cart</div>
          )}
        </div>
        <div className={styles.right_box}>
          <div className={styles.sub_right_box}>
            <div className={styles.heading}>Total Amount</div>
            <div className={styles.list}>
              <div>Items: {Items.length}</div>
              <div className={styles.price}>₹{sum}</div>
            </div>
            <div className={styles.list}>
              <div>Delivery</div>
              <div>₹100</div>
            </div>
            <div className={styles.list}>
              <div>Total</div>
              <div className={styles.price}>₹{sum + 100}</div>
            </div>
            <div className={styles.btn}>Proceed to Checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
