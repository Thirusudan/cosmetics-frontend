import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Link,useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)  //1
    return(
          <header className="h-[100px] bg-accent flex justify-center items-center relative">
{/*4*/}        {isOpen && 
               <div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
               <div className="h-full w-[350px] bg-white flex flex-col">
               <div className="w-full h-[100px]  bg-accent flex pl-[45px] flex-row items-center gap-[2]">
{/*5*/}                 <GiHamburgerMenu className="text-white  md:hidden text-5xl" onClick={()=>{
                    setIsOpen(close)
                 }}/>
                  <img className="w-[300px] h-[80px] object-cover cursor-pointer" onClick={()=>{
              navigate("/")
          }}  src="/cbc_cosmetics_logo.png" alt="Logo"/>
               </div>

               <div className="w-full flex flex-col p-[45px] items-start">
                {/*Navigate to Home page*/}
               <button className="text-accent text-2xl flex flex-row items-center" onClick={()=>{
                setIsOpen(false)
                navigate("/")
               }}>
                <HiHome className="text-accent text-2xl mr-2"/>
                Home
               </button>
                
               {/*Navigate to Products page*/}
               <button className="text-accent text-2xl flex flex-row items-center" onClick={()=>{
                setIsOpen(false)
                navigate("/products")
               }}>
                <BiStore className="text-accent text-2xl mr-2"/>
                Products
               </button>

               </div>


               </div>
               </div> 
             }
        
          <img className="w-[300px] h-[80px] object-cover absolute md:left-[40px] cursor-pointer" onClick=  {()=>{
            navigate("/")
          }}  src="/cbc_cosmetics_logo.png" alt="Logo"/>

      
{/*2*/}    <GiHamburgerMenu className="text-white text-4xl absolute md:hidden left-[10px]" 
           onClick={()=>{setIsOpen(true)
           }} 
           />
 
{/*3*/}    <div className="hidden w-full md:flex justify-center  items-center">
           <Link to="/" className="text-white text-xl ">Home</Link>
           <Link to="/products" className="text-white text-xl ml-4">Products</Link>
           <Link to="/reviews" className="text-white text-xl ml-4">Reviews</Link>
           <Link to="/about-us" className="text-white text-xl ml-4">About us</Link>
           <Link to="/contact-us" className="text-white text-xl ml-4">Contact Us</Link>
           <Link to="/cart" className="absolute right-[80px]">
           <BiCart className="text-white text-3xl m1-4"/>
           </Link>
           </div>
            </header>
      )
  }

/*
1. One simple on/off switch. isOpen starts false — meaning the mobile sidebar menu is closed. This single variable decides whether the mobile drawer menu shows or not.

2. md:hidden → this is a Tailwind responsive class. It means: "hide this on medium screens and up (desktops), but show it on small screens (mobile)." So this hamburger icon only appears on mobile.
onClick={()=>{ setIsOpen(true) }} → tapping it flips isOpen to true, which opens the sidebar menu.

3.hidden → by default (on small/mobile screens), this whole row of links is hidden.
md:flex → on medium screens and up (desktop), it switches to flex and becomes visible, laid out horizontally. 
So mobile and desktop show completely different navigation styles: mobile gets a hamburger icon, desktop gets a full horizontal menu bar. They never show both at once — only one is visible depending on screen size, controlled purely by Tailwind's md: breakpoint.

4.4. What happens when isOpen is true — the sidebar drawer appears
jsx{isOpen && 
   <div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
When isOpen becomes true, this whole block renders. It's a full-screen dark overlay (w-[100vw] h-[100vh], semi-transparent black background bg-[#00000050]) that covers the entire screen, sitting on top of everything else (z-[100]).
jsx<div className="h-full w-[350px] bg-white flex flex-col">
Inside that dark overlay, there's a white sidebar panel, 350px wide, full height — this is the actual menu drawer sliding in from the side

5. Same hamburger icon, but this time clicking it sets isOpen back to false, closing the sidebar. It's inside the sidebar's own header bar, next to the logo.

Mobile screen loads → isOpen is false → sidebar hidden, hamburger icon visible, desktop nav hidden (md:hidden/hidden)
        ↓
Admin taps hamburger icon → setIsOpen(true)
        ↓
isOpen is now true → the {isOpen && (...)} block renders
        ↓
Full-screen dark overlay + white sidebar drawer slide into view, showing Home/Products links
        ↓
Admin taps "Products" → setIsOpen(false) AND navigate("/products") both run
        ↓
Sidebar closes, page navigates to Products

Desktop screen loads → md:hidden hides the hamburger icon → md:flex shows the horizontal nav bar instead
        ↓
Admin just clicks Home/Products/Reviews/etc. directly in the top bar — no sidebar, no isOpen involved at all

Simple way to remember it: isOpen is a light switch just for the mobile sidebar drawer. Tailwind's md:hidden / md:flex pair is what decides whether you see the hamburger+drawer (small screens) or the full horizontal nav bar (larger screens) — these two systems work independently and never overlap.
*/  