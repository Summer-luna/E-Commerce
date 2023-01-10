import {ProductCard} from "./components/ProductCard";
import {useEffect} from "react";
import {useProduct} from "../../Context/ProductContext";

const Home = () => {

  const { products } = useProduct();

  useEffect(() => {
    (async function test(){
      console.log(products);
    })()
  })

  return (
    <ul className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center pt-44">
      {
        products !=null && products.map((product) => {
          return(
            <li className="max-w-xs md:max-w-sm flex flex-col gap-4 bg-white p-4 cursor-pointer" key={product._id}><ProductCard data={product} /></li>
          );
        })
      }
    </ul>
  );
};

export default Home;

