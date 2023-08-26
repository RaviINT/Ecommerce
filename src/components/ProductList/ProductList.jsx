import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function ProductList({data}) {
const navigate=useNavigate()
  return (
    <div className={styles.container}>
      {data?.map((item,index) => (
        <div key={index} className={styles.product} onClick={()=>navigate(`/product/${item.id}`)}>
          <div className={styles.img_box}>
            <img src={item.thumbnail} alt="" className={styles.img} />
          </div>
          <div>
            <div className={styles.price}>₹{item.price}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.discount}>
              <div className={styles.percentage}>
                {item.discountPercentage}%
              </div>
              <div className={styles.dis_text}>Discount</div>
            </div>

            <div className={styles.rating_box}>
              <AiFillStar color="#FFD700" />

              <div className={styles.rating}>{item.rating}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
