import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import ProductItem from "@Components/Product/ProductItem";

// Actions
// import { getProducts as productsList } from "@Redux/actions/productActions";
import { getProducts as productsList } from "@Redux/cart-000/actions/productActions";

// Styles
import "./ProductsPage.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  useEffect(() => {
    console.log({ products });
  }, [products]);

  return (
    <div className="container-fluid">
      <div className="homepage">
        <h2 className="homepage__title">Latest Products</h2>
        <div className="homepage__products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                category={product.category}
                name={product.name}
                description={product.description}
                price={product.price}
                pictureUrl={product.pictureUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
