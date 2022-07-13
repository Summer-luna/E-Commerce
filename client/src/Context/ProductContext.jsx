import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
}

export const ProductProvider = (props) => {

  const [products, setProducts] = useState(null);

  useEffect(()=>{
    // get product from database
    const getProducts = async () => {
      const { data } = await axios.get("/getProducts");
      setProducts(data);
    }

    getProducts();
  },[]);

  const value = {products, setProducts}

  return(
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  )
}
