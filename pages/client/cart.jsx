import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../src/utils/cart"
import { TbTrash } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

export default function CartPage(){
    const[cart,setCart]=useState(getCart())
    const navigate = useNavigate()
    console.log(cart)
    return(
        <div className="w-[100vw] max-w-[100vw] h-screen flex flex-col px-[10px] items-center overflow-y-auto bg-primary">
        {
            cart.map(
                (item,index)=>{
                return(
                    <div key={item.productId} className="w-full md:w-[800px] h-auto md:h-[100px] m-[10px] shadow-2xl flex flex-col md:flex-row items-center relative animate-[fadeInUp_0.4s_ease-out_both] p-[15px] md:p-0 gap-[10px] md:gap-0 "
                    style={{ animationDelay: `${index * 0.08}s` }}>

                 <div className="w-full md:w-[100px] flex flex-row md:flex-col justify-start md:justify-center items-center gap-[15px] md:gap-0 text-2xl md:text-md">

                  <img src={item.image} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover shrink-0 transition-transform duration-300 hover:scale-110"/>

                   <div className="flex-1 flex-col pl-[10px] md:hidden flex">
                        <span className="font-bold text-left">{item.name}</span>
                    <span className="font-semibold text-left">{item.price.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                  </div>

                    <div className="w-[320px] h-full flex-col pl-[10px] hidden md:flex  "> 
                        <span className="font-bold text-center md:text-left ">{item.name}</span>
                    <span className=" font-semibold text-center md:text-left ">{item.price.toLocaleString('en-us',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>

                    <div className="w-full md:w-[190px] text-2xl md:text-md h-auto md:h-full flex flex-row justify-between md:justify-center items-center">
                    <div className="flex flex-row items-center">
                    <button className="flex justify-center items- center w-[30px] rounded-lg bg-accent text-white cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-150 active:scale-90"onClick={()=>{
                        addToCart(item,-1)
                        setCart(getCart())
                    }}>-</button>

                    <span className="mx-[10px]">{item.quantity}</span>

                    <button className="flex justify-center items- center w-[30px] rounded-lg bg-accent text-white  cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-150 active:scale-90"onClick={()=>{
                        addToCart(item,1)
                        setCart(getCart())
                    }}>+</button>
                    </div>

                    <div className="text-xl md:hidden font-semibold">
                        {(item.quantity * item.price).toLocaleString("en-us",{minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    </div>

                    <div className="hidden md:flex w-[190px] text-3xl md:text-md h-full justify-end items-center ">
                    <span className="font-semibold">{(item.quantity * item.price).toLocaleString("en-us",{minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>

                    <button className="w-[30px] h-[30px] absolute top-[10px] right-[10px] md:top-[30px] md:right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700 hover:scale-110 transition-all duration-150 active:scale-90"onClick={()=>{
                        addToCart(item, -item.quantity)
                        setCart(getCart())
                    }}>
                        <TbTrash className="text-xl "/>
                    </button>
                    </div>
                )
            })
        }
         <div className="md:w-[800px] w-full h-auto md:h-[100px] m-[10px] p-[15px] md:p-[10px] shadow-2xl flex flex-col md:flex-row items-center justify-center md:justify-end gap-[15px] md:gap-0 relative animate-[fadeInUp_0.5s_ease-out_both]">
            <span className="font-bold text-xl md:text-2xl ">
                Total: {getTotal().toLocaleString("en-us",{minimumFractionDigits:2,maximumFractionDigits:2})}
            </span>
            <button className="w-full md:w-[150px] md:absolute md:left-[10px] text-xl md:text-md h-[50px] cursor-pointer rounded-lg shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-accent  hover:scale-105 transition-all duration-200 " onClick={()=>{
                navigate("/checkout",{state:{items:cart}})
            }}>
                checkout
             </button>
        </div>
        </div>
    )
}

/*
addToCart(item, -1)    passes -1 as qty
setCart(getCart())     re-reads localStorage and updates the screen

addToCart(item, 1)     passes 1 as qty
setCart(getCart())     re-reads localStorage and updates the screen

addToCart()  →  updates/removes/increases in localStorage
getCart()    →  reads the updated cart FROM localStorage
setCart()    →  pushes that updated cart into React state → screen refreshes

-item.quantity  →  makes qty go to exactly 0 in one click
addToCart()     →  sees newQty <= 0 → filter() removes product from localStorage
getCart()       →  reads updated localStorage (product now gone)
setCart()       →  refreshes the screen to show product removed ❌
*/