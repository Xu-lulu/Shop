import { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import ProductsCart from "./ProductCard";
import "./Products.scss";
import BanerProducts from "../baner/banerProducts";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { findCategorys } from "../../redux/api/apiProduct";
const CategoryProducts = () => {
  const { name } = useParams();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  console.log(name);
  // useEffect(() => {
  findCategorys(dispatch, name);
  // }, [name]);
  const dataCategory = useSelector(
    (state) => state.products.categorys.dataCategorys
  );
  const datafincategory = useSelector(
    (state) => state.products.findcategorys.finddataCategorys
  );
  return (
    <>
      <div className="product">
        <BanerProducts></BanerProducts>
        <div>
          <nav className="navbarpro">
            <Link exact={true} className="btn" to="/products" active="active">
              {" "}
              All
            </Link>
            {dataCategory.map((item, index) => {
              return (
                <NavLink
                  className="btn"
                  key={index}
                  to={`/products/category/${item.Namecategory}`}
                  active="active"
                >
                  {item.Namecategory}
                </NavLink>
              );
            })}
          </nav>{" "}
        </div>
        <div>
          {datafincategory ? (
            <div className="alldataproduct row row-cols-4 gy-1 p-5">
              {datafincategory.map((product, index) => {
                return (
                  <div className="product-card p-1" key={index}>
                    <ProductsCart
                      _id={product._id}
                      Name={product.Name}
                      Price={product.Price}
                      Description={product.Description}
                      Image={product.Image}
                      Count={product.count}
                      Category={product.Category}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </>
  );
};
export default CategoryProducts;
