import { publicRequest, userRequest } from "../requestMethods"
import { getProductFailure, getProductStart, getProductSuccess,deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductFailure, updateProductStart, updateProductSuccess,addProductStart, addProductSuccess, addProductFailure  } from "./productRedux";
import { loginStart,loginSuccess,loginFailure } from "./userRedux"
export const  login = async(dispatch,user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const  getProducts = async(dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}

export const  deleteProducts = async(id,dispatch) => {
    dispatch(deleteProductStart())
    try {
        //  await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

export const  updateProducts = async(id,product,dispatch) => {
    dispatch(updateProductStart())
    try {
        //  await userRequest.put(`/products/${id}`);
        dispatch(updateProductSuccess({id,product})) //send product:res.data or this might also work
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

export const  addProducts = async(product,dispatch) => {
    dispatch(addProductStart())
    try {
         const res = await  userRequest.post(`/products`,product);
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}