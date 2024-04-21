import { useSelector, useDispatch } from "react-redux";
export const dataproduct = () => {
  return useSelector((state) => {
    const dataproductuser = state?.products?.allproduct;
    if (dataproductuser && dataproductuser?.dataProducts) {
      return dataproductuser?.dataProducts;
    }
    return null;
  });
};
export const datacategory = () => {
  return useSelector((state) => {
    const datacategoryuser = state?.products.categorys;
    if (datacategoryuser && datacategoryuser?.dataCategorys) {
      return datacategoryuser?.dataCategorys;
    }
    return null;
  });
};
export const datafindcategory = () => {
  return useSelector((state) => {
    const data = state?.products.findcategorys;
    if (data && data?.finddataCategorys) {
      return data?.finddataCategorys;
    }
    return null;
  });
};
export const tokenuser = () => {
  return useSelector((state) => {
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser?.accessToken) {
      return currentUser.accessToken;
    }
    return null;
  });
};
export const datauser = () => {
  return useSelector((state) => {
    const currentUser = state?.auth?.login?.currentUser;
    if (currentUser && currentUser?.newUsers) {
      return currentUser?.newUsers;
    }
    return null;
  });
};
export const datarole = () => {
  return useSelector((state) => {
    const currentUser = state?.auth?.login?.currentUser;
    if (currentUser && currentUser?.newUsers?.role) {
      return currentUser?.newUsers?.role;
    }
    return null;
  });
};
export const usedataCart = () => {
  return useSelector((state) => {
    const data = state.cartUser.dataCart.dataCarts.datacart;
    if (data && data.cart) {
      return data.cart;
    }
    return null;
  });
};