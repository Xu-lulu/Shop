import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import {
  NavbarFood,
  FooterFood,
  NavbarAdminHidden,
} from "./common/NavFood";
import axios from "axios";
import { CartContext } from "./Contexts/CartContext";
import PublicRoute from "./routes/public";
import Admin from "./routes/admin";
import { dataCategorys, dataProducts } from "./redux/api/apiProduct";
import { Layout, Flex } from "antd";
import { datauser } from "./common/dataReux";
const { Header, Footer, Sider, Content } = Layout;
//
function App() {
  // const [allProducts, setallProducts] = useState([]);
  const [myCart, addtoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [showlogin, setshowlogin] = useState(false);
  const [datalogin, setdatalogin] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dataProducts(dispatch);
    dataCategorys(dispatch);
  }, [dispatch]);
  const user = datauser();
  // const decodeuser = useSelector((state) => state.auth.login.currentUser.accessToken);
  // const axiosJwt = axios.create();
  // axiosJwt.interceptors.request.use(
  //   async(config) =>{
  //     const decode = jwt_decode()
  //   }
  // )
  return (
    <CartContext.Provider
      value={{
        myCart,
        addtoCart,
        total,
        setTotal,
        count,
        setCount,
        datalogin,
        setdatalogin,
      }}
    >
      {user === "admin" ? (
        <Router>
          <div className="admin">
            <div className="NavbarAdmin">
              <NavbarAdminHidden />
            </div>
            <div className="page-container-admin">
              <Admin />
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <Flex gap="middle" wrap="wrap">
            <Header>
              <NavbarFood />
            </Header>
            <Content>
              <PublicRoute />
            </Content>
            <Footer>
              <FooterFood />
            </Footer>
          </Flex>
          {/* <div className="User">
            <div className="Navbar-users">
              <NavbarFood />
            </div>
            <div className="page-container-user">
              <PublicRoute />
            </div>
            <div className="Footer-users">
              <FooterFood />
            </div>
          </div> */}
        </Router>
      )}
    </CartContext.Provider>
  );
}
//
export default App;
