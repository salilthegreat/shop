import { useEffect, useState } from "react"
import "./widgetLg.css"
import { useDispatch } from "react-redux"
import { loginFailure } from "../../redux/userRedux"
import { userRequest } from "../../requestMethods"

import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
}
export default function WidgeetLg() {
    const [orders,setOrders] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const getOrders = async() => {
            try {
            const res = await userRequest.get("/orders")
            setOrders(res.data)
            } catch (err) {
                dispatch(loginFailure)
            }
        }
        getOrders()
    })

  return (
    <div className='widgetLg'>
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            {orders?.map((order)=>(
            <tr className="widgetLgTr" key={order._id} >
                <td className="widgetLgUser">
                    <img src="https://images.pexels.com/photos/6324235/pexels-photo-6324235.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate"><ReactTimeAgo date={Date.parse(order.createdAt)} locale="en-US"/></td>
                <td className="widgetLgAmount">{order.amount}</td>
                <td className="widgetLgStauts"><Button type={order.status}/></td>
            </tr>
            ))}
        </table>
    </div>
  )
}
