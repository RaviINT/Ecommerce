import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./style.module.css";
import ProductList from "../../components/ProductList/ProductList";
import Filters from "../../components/Filters/Filters";
function Home() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(2000);

  const fetchProducts = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((json) => {
        setData(json?.products);
        setTemp(json?.products);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const tempData = temp.filter((product) => product.price < price);
    setData(tempData);
  }, [price]);
  useEffect(() => {
    if (category != "All") {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((json) => setData(json?.products));
    } else {
      setData(temp);
    }
  }, [category]);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.product_list}>
        <div className={styles.left_box}>
          <Filters
            setCategory={setCategory}
            setPrice={setPrice}
            price={price}
          />
        </div>
        <div className={styles.right_box}>
          <ProductList data={data} />
        </div>
      </div>
    </div>
  );
}

export default Home;
