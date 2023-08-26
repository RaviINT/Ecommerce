import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./style.module.css";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CartItems = useSelector((state) => state.cartSlice.cart);
  const UserEmail = useSelector((state) => state?.authSlice?.userLogin);
  let id = location.pathname.split("/")[2];

  const [selectedImage, setSelectedImage] = useState(0);
  const [cartExists, setCartExists] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchProduct = () => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  };
  const sendToCart = () => {
    product.user = UserEmail?.email;
    dispatch(addToCart(product));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product) {
      const itemIndex = CartItems.findIndex((item) => item.id == product.id);
      if (itemIndex != -1) {
        setCartExists(true);
      }
    }
  }, [product, CartItems]);
  return (
    <div className={styles.container}>
      <Navbar />
      {product && (
        <div className={styles.main_box}>
          <div className={styles.left_box}>
            <div className={styles.sub_left_box}>
              {product?.images?.map((image, index) => (
                <div
                  className={`${styles.img_box} ${
                    selectedImage == index ? styles.img_selected : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt="" className={styles.img} />
                </div>
              ))}
            </div>
            <div className={styles.sub_right_box}>
              <img
                src={product?.images?.[selectedImage]}
                alt=""
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.right_box}>
            <div className={styles.title}>{product?.title}</div>
            <div className={styles.dis}>{product?.description}</div>
            <div className={styles.price}>₹{product?.price}</div>
            {/* <div className={styles.discount}>{product?.discountPercentage}</div> */}
            <div className={styles.rating}>
              <div>
                <AiFillStar color="#FFD700" size={20} />
              </div>
              <div className={styles.rate}>{product?.rating}</div>
            </div>
            <div>
              <button className={styles.buy}>Buy Now</button>
              {cartExists ? (
                <button
                  className={styles.cart}
                  onClick={() => navigate("/cart")}
                >
                  Go to cart
                </button>
              ) : (
                <button className={styles.cart} onClick={sendToCart}>
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
