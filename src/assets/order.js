export const orders=[
    {id:"1",
     orderList:[
        {id:1,name:"fire_chicken",quantity:2,countdownTime:120,status:"InKitchen"},
        {id:2,name:"burger",quantity:1,countdownTime:120,status:"finished"},
        {id:3,name:"frenchFire",quantity:2,countdownTime:120,status:"InKitchen"}


     ],
     type:"delivery",
     orderDate:new Date().setDate("2026-04-05"),
     orderTime:new Date().setHours(15,20),
    },
    {id:"2",
     orderList:[{id:1,name:"fire_chicken",quantity:5,countdownTime:120,status:"Cook"}],
     type:"Onsite",
     orderDate:new Date().setDate("2026-04-05"),
     orderTime:new Date().setHours(15,20),
    },
    {id:"3",
     orderList:[{id:1,name:"Burger",quantity:2,countdownTime:100,status:"finished"}],
     type:"Onsite",
     orderDate:new Date().setDate("2026-04-05"),
     orderTime:new Date().setHours(14,20),
    }
]