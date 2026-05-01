import { useContext, useState } from "react"
import { OrdersContext } from "../context/ordersContext/OrdersContext";
import MenuList from "./MenuList";

export default function CookBoard() {
    const { orderList } = useContext(OrdersContext);

    const orders = orderList.map((element) => {
        const orderDetail = {
            orderId: element.id,
            List: element.orderList
        };
        return (orderDetail);
    });

    const showList = (whichBoard) => (
        orders.flatMap((e) =>
            e.List.filter((list) => {
                if (whichBoard === "finished") return list.status === "finished";
                if (whichBoard === "doing") return list.status === "Cook" || list.status === "InKitchen";
                return false;
            }).map((list) => (
                whichBoard === "finished" ? (
                 <MenuList order={e} list={list}></MenuList>
                ) : (
                 <MenuList order={e} list={list}></MenuList>
                )
            ))
        )
    )

    return (
        <div className="flex flex-row justify-center gap-[5vh] bg-gray-200 min-h-screen min-w-screen 
                        max-md:flex-col max-md:justify-start max-md:gap-y-[5vh]">
            <div className="flex flex-col bg-amber-300 w-[45%] p-[.5vh] max-md:w-full max-md:h-[45vh] overflow-scroll">
                <h1>In Kitchen</h1>
                {showList("doing")}
            </div>
            <div className="flex flex-col bg-amber-300 w-[45%] p-[.5vh] max-md:w-full max-md:h-[45vh] overflow-scroll">
                <h1>Finished</h1>
                {showList("finished")}
            </div>
        </div>
    )
}
