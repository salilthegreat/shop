import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMethods';

const Success = () => {
  // const {search} = useLocation()
  const navigate = useNavigate();
  // const params = new URLSearchParams(search);
  // const payment_intent_client_secret = params.get("payment_intent_client_secret")

  useEffect(()=>{
    const makeRequest = () => {
        setTimeout(()=>{
          navigate("/cart?success=true")
        },5000)
    }
    // const makeRequest = async() => {
    //   try {
    //     await userRequest.put("/orders",{payment_intent_client_secret})
    //     setTimeout(()=>{
    //       navigate("/cart")
    //     },5000)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    makeRequest()
  },[])
  return (
    <div>Payment Successful. You are being redirected to the success page, please don't refresh.</div>
  )
}

export default Success


