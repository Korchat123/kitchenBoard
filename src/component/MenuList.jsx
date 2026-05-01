export default function MenuList({order,list}){





    return(

            <div className="bg-white m-2" key={`finished-${order.orderId}-${list.id}`}>
                ID: {order.orderId}
                 <div>
                            {`${list.id} : ${list.name} total ${list.quantity} plate status: ${list.status} Time ${list.countdownTime}`}
                  </div>
            </div>




    )


}