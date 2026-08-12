import { useEffect, useState } from "react"
import { TbTrash } from "react-icons/tb"
import { Navigate, useLocation, useNavigate } from "react-router-dom" 
import { getCart } from "../../src/utils/cart" 
import axios from "axios"
import toast from "react-hot-toast"


export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate ()
/*4*/    const[user,setUser] = useState(null)
         const[name,setName] = useState("")
         const[address,setAddress] = useState("")
         const[phone,setPhone] = useState("")
         

/*5*/    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token==null){
            toast.error("Please login to checkout");
            navigate("/login")
            return;
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            }).then(
                (res)=>{
                setUser(res.data)
                setName(res.data.firstName + ""+res.data.lastName)
                console.log(user)
            }).catch(
                (err)=>{
                 console.error(err)
                toast.error("Failed to fetch user details")
                navigate("/login")
            })
        }
    },[])
/*3*/    const [cart, setCart] = useState(location.state?.items || getCart())
      if(location.state?.items == null){
        toast.error("Please select items to checkout")
        Navigate("/products")
        }


function getTotal(){
            let total =0 
            cart.forEach((item)=>{
                total +=item.quantity * item.price
            })
            return total
        }
 
/*1*/ 
async function placeOrder(){
    const token = localStorage.getItem("token");
    if(token == null){
        toast.error("Please login to place an order");
        navigate("/login");
        return;
    }

if(name ===""|| address === "" || phone === ""){
    toast.error("Please fill all the fileds");
    return;
}

  const order = {
        address : address,
        phone   : "phone",
        items   : []
    }

    /*2*/ 
    cart.forEach((item)=>{
        order.items.push({
            productId: item.productId,
            qty: item.quantity
        })
    }
        
)
try{
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",order,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    })
    toast.success("Order placed successfully")
    

}catch(err){
    console.error(err)
    toast.error("Failed to place order")
    return
}}

    
    console.log(cart)

    return (
    <div className="w-[100vw] max-w-[100vw] h-screen flex flex-col px-[10px] py-[40px] items-center overflow-y-auto bg-primary"> {/* RESPONSIVE: overflow-y-auto added */}
      {cart.map((item, index) => {
        return (
          <div
            key={item.productId}
            className="w-full md:w-[800px] h-auto md:h-[100px] m-[10px] shadow-2xl flex flex-col md:flex-row items-center relative animate-[fadeInUp_0.4s_ease-out_both] p-[15px] md:p-0 gap-[10px] md:gap-0"
            /* RESPONSIVE: h-auto md:h-[100px], flex-col md:flex-row, p-[15px] md:p-0, gap-[10px] md:gap-0 */
          >
            <div className="w-full md:w-[100px] flex flex-row md:flex-col justify-start md:justify-center items-center gap-[15px] md:gap-0 text-2xl md:text-md">
              {/* RESPONSIVE: w-full md:w-[100px], flex-row md:flex-col, justify-start md:justify-center, gap-[15px] md:gap-0 */}
              <img
                src={item.image}
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover shrink-0 transition-transform duration-300 hover:scale-110"
                /* RESPONSIVE: w-[80px] h-[80px] md:w-[100px] md:h-[100px], shrink-0 */
              />
              <div className="flex-1 flex-col justify-center pl-[10px] md:hidden flex"> {/* RESPONSIVE: flex-1 instead of h-full */}
                <span className="font-bold text-left md:text-left">
                  {item.name}
                </span>
                {/*price*/}
                <span className="font-semibold text-left md:text-left">
                  {item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="w-[320px] h-full flex-col justify-center pl-[10px] hidden md:flex">
              <span className="font-bold text-center md:text-left">
                {item.name}
              </span>
              <span className="font-semibold text-center md:text-left">
                {item.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="w-full md:w-[190px] h-auto md:h-full text-2xl md:text-md flex flex-row justify-between md:justify-center items-center">
              {/* RESPONSIVE: w-full md:w-[190px], h-auto md:h-full, text-2xl (was text-4xl), justify-between md:justify-center */}
              <div className="flex flex-row items-center"> {/* RESPONSIVE: wrapper added so qty controls group together */}
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-accent text-white cursor-pointer hover:bg-blue-400   hover:scale-110 transition-all duration-150 active:scale-90"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity -= 1;
                  if (newCart[index].quantity <= 0) {
                    newCart.splice(index, 1);
                  }
                  setCart(newCart);
                }}
              >
                -
              </button>
              <span className="mx-[10px]">{item.quantity}</span>
              <button
                className="flex justify-center items-center w-[30px] rounded-lg bg-accent text-white cursor-pointer hover:bg-blue-400   hover:scale-110 transition-all duration-150 active:scale-90"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                }}
              >
                +
              </button>
              </div>

              <div className="text-xl md:hidden font-semibold"> {/* RESPONSIVE: mobile-only total next to qty controls */}
                {(item.quantity * item.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="hidden md:flex w-[190px] text-3xl md:text-md h-full justify-end items-center pr-[10px]">
              {/* RESPONSIVE: hidden md:flex (desktop-only, mobile version shown above next to qty) */}
                {/*total quantity *price*/}
              <span className="font-semibold">
                {(item.quantity * item.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <button
              className="w-[30px]  h-[30px] absolute top-[10px] right-[10px] md:top-[35px] md:right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700 hover:scale-110 transition-all duration-150 active:scale-90" 
              /* RESPONSIVE: top-[10px] right-[10px] md:top-[35px] md:right-[-40px] */
              onClick={() => {
                const newCart = [...cart];
                newCart.splice(index, 1);
                setCart(newCart);
              }}
            >
              <TbTrash className="text-xl" />
            </button>
          </div>
        );
      })}

      <div className="md:w-[800px] w-full h-auto md:h-[100px] m-[10px] p-[15px] md:p-[10px] shadow-2xl flex flex-col md:flex-row items-center justify-center md:justify-end gap-[15px] md:gap-0 relative animate-[fadeInUp_0.5s_ease-out_both]">
        {/* RESPONSIVE: h-auto md:h-[100px], p-[15px] md:p-[10px], flex-col md:flex-row, justify-center md:justify-end, gap-[15px] md:gap-0 */}
        <span className="font-bold text-xl md:text-2xl"> {/* RESPONSIVE: text-xl md:text-2xl */}
          Total:{" "}
          {getTotal().toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          onClick={placeOrder}
          className="w-full md:w-[150px] md:absolute md:left-[10px] text-xl md:text-md h-[50px] cursor-pointer rounded-lg shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-accent   hover:scale-105 transition-all duration-200"
          /* RESPONSIVE: w-full md:w-[150px], md:absolute md:left-[10px], text-xl md:text-md */
        >
          Place Order
        </button>
      </div>

      <div className="md:w-[800px] w-full m-[10px] p-[10px] shadow-2xl flex flex-col md:flex-row items-center justify-center gap-2 animate-[fadeInUp_0.6s_ease-out_both]">
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]   transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]   transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
    
}


/*
1. Click "Place Order"
→ Check token → not logged in? → redirect to login ❌
→ logged in? → build order object with cart items ✅
→ POST to backend with token in header
→ success? → "Order placed successfully" ✅
→ failed?  → "Failed to place order" ❌

2 -  the backend already has all the product details in MongoDB! Remember in your createOrder backend code This is a security reason — if you sent price from frontend, a hacker could change the price to 1 rupee before sending! The backend always gets the real price from MongoDB, so customers can never cheat the price

3 - When the CheckoutPage loads, location.state is the data bag that was sent from the Cart Page using navigate("/checkout", { state: { items: cart } }). So location.state?.items opens that bag and takes out the cart items array. The ?. is used for safety — if someone visits /checkout by typing the URL directly in the browser instead of coming from the Cart Page, then no bag was carried, meaning location.state will be null, and without ?. the page would crash with an error. So ?. prevents the crash by returning undefined instead. Then || getCart() acts as a backup — if location.state?.items is null or undefined, it falls back to reading the cart directly from localStorage using getCart(). After that, the if check on the next line checks if location.state?.items is null, and if it is, it shows a warning toast saying "Please select items to checkout" and redirects the user back to the products page — because they arrived at checkout without going through the proper cart flow.

location        = The delivery person
location.state  = The bag the delivery person carries
location.state.items = The products INSIDE the bag
Cart Page sends:   "Here delivery person, carry this bag with items!"
Checkout Page:     "Hey delivery person, give me the items from your bag!"

4-  Creates a state to store the logged-in user's details. Starts as null because we don't have the user details yet when the page first loads.

5- Page loads
→ useEffect runs
→ get token from localStorage
→ no token? → redirect to login ❌
→ has token? → ask backend "who is this user?"
→ backend replies with user details
→ setUser(res.data) saves user details ✅
→ can now use user.name, user.phone, user.address in placeOrder ✅

 we have to save the users details for who orders the products
*/