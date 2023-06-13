import { publicRequest, userRequest } from "../requestMethods"
import { getProductFailure, getProductStart, getProductSuccess,deleteProductStart, deleteProductSuccess, deleteProductFailure  } from "./productRedux";
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