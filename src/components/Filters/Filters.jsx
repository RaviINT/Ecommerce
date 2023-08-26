import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
function Filters({ setCategory, setPrice, price, maxPrice }) {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = () => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(parseInt(e.target.value));
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>Filters</div>
      <div>
        <div className={styles.category} >Category</div>
        <div>
          <select className={styles.select} name="" id="" onChange={handleCategory}>
            <option value="All">All</option>
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className={styles.category} >Price</div>
        <div>
          <input
            type="range"
            max={2000}
            min="0"
            value={price}
            className={styles.select}
            onChange={handlePrice}
          />
        </div>
        <div className={styles.category}>₹{price}</div>
      </div>
    </div>
  );
}

export default Filters;
