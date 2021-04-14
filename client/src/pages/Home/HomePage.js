import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "@Redux/products/productsActions";

// Components
import ProductItem from "@Components/Product/ProductItem";

// Actions
// import { getProducts as productsList } from "@Redux/cart-000/actions/productActions";

// Styles
import "./HomePage.css";

const HomePage = () => {
  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Products Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("products");
  // }, []);

  // const dispatch = useDispatch();

  // const getProducts = useSelector((state) => state.getProducts);
  // const { products, loading, error } = getProducts;

  // useEffect(() => {
  //   dispatch(productsList());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log({ products });
  // }, [products]);

  return (
    <div className="container-fluid">
      {/* {`total products count : ${totalCount}`}
      {entities?.map((product) => (
        <li key={product._id}>{product.name}</li>
      ))} */}
      <div className="homepage">
        <h2 className="homepage__title">Latest Products</h2>
        <div className="homepage__products">
          {listLoading ? (
            <h2>Please wait...</h2>
          ) : (
            entities?.map((product) => (
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
