import { useState } from "react";
import { orders } from "../../assets/order";
import { OrdersContext } from "./OrdersContext";

export const OrdersProvider=({children})=>{
const [orderList,setOrderList]=useState(orders);
const ordersListHandler=(e)=>{setOrderList(e)}


return(<OrdersContext.Provider value={{orderList,setOrderList,ordersListHandler}}>{children}</OrdersContext.Provider>)

}


