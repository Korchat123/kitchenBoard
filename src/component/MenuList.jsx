import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../context/ordersContext/OrdersContext";

export default function MenuList({ order, list }) {
    const { orderList, setOrderList } = useContext(OrdersContext);
    const [countdownTime, setTime] = useState(list.countdownTime);
    
    useEffect(() => {
        let interval = null;

        if (list.status === "Cook") {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [list.status, countdownTime]);

    const countTimeHandler = () => {
        let nextStatus = list.status;
        if (list.status === "InKitchen") {
            nextStatus = "Cook";
        } else if (list.status === "Cook") {
            nextStatus = "finished";
        }

        const updatedOrders = orderList.map((o) => {
            if (o.id === order.orderId) {
                return {
                    ...o,
                    orderList: o.orderList.map((li) => {
                        if (li.id === list.id) {
                            return { ...li, status: nextStatus };
                        }
                        return li;
                    }),
                };
            }
            return o;
        });
        setOrderList(updatedOrders);
    };

    return (
        <div className="bg-white m-2 border rounded shadow-sm p-2">
            <div className="text-xs text-gray-500 font-bold">Order ID: {order.orderId}</div>
            <div 
                className={`p-2 cursor-pointer rounded transition ${
                    list.status === "Cook" ? "bg-orange-100 hover:bg-orange-200" : "hover:bg-gray-100"
                }`} 
                onClick={countTimeHandler}
            >
                <div className="flex justify-between items-center">
                    <span>{list.id} : {list.name} (x{list.quantity})</span>
                    <span className={`font-mono font-bold ${countdownTime < 10 ? "text-red-600" : "text-blue-600"}`}>
                        {countdownTime}s
                    </span>
                </div>
                <div className="text-[10px] uppercase mt-1">Status: {list.status}</div>
            </div>
        </div>
    );
}
