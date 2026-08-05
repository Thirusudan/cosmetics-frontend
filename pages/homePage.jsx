import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromoAlert from "../src/components/promoAlert";

export default function HomePage() {

  const banners = [
  { tag: "SUMMER SALE", title: "Up to 50% Off", btnText: "Shop Now" },
  { tag: "NEW ARRIVALS", title: "Discover the Latest", btnText: "Explore" },
  { tag: "BEST SELLERS", title: "Customer Favorites", btnText: "View All" },
];
  
  return (
    <div className="w-full min-h-screen ">


            <PromoAlert />
     


      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row  items-start  py-[50px] gap-[100px]">

       
       


        {/* LEFT - all text content together */}
        <div className="flex flex-col text-black max-w-[600px] ml-[30px] mt-[20]">

          <span className="text-3xl font-bold text-secondary">Good Skin</span>
          <span className="text-3xl font-bold text-secondary">Good Glow</span>
          <span className="text-3xl font-bold text-yellow-500">Guaranteed</span>

          <p className="text-2xl mt-[20px]">
            Discover a wide range of natural, cruelty-free skincare and fragrance
            products delivered straight to your door.
          </p>

          <div className="flex flex-col text-md gap-[10px] mt-[20px]">
            <span>✔ 100% Natural & Organic Ingredients</span>
            <span>✔ Cruelty-Free & Vegan Formulas</span>
            <span>✔ Dermatologically Tested</span>
            <span>✔ Free From Harmful Chemicals</span>
            <span>✔ Sustainable & Eco-Friendly Packaging</span>

          
          <div className="flex gap-[40px] mt-[10px]">
    <div className="flex flex-col">
        <span className="text-xl font-bold text-accent">1000+</span>
        <span className="text-sm">Happy Customers</span>
    </div>
    <div className="flex flex-col">
        <span className="text-xl font-bold text-accent">50+</span>
        <span className="text-sm">Products</span>
    </div>
    <div className="flex flex-col">
        <span className="text-xl font-bold text-accent">100%</span>
        <span className="text-sm">Natural</span>
    </div>
</div>


          </div>
          <Link to={"/products"} className=" text-white bg-accent w-[130px] h-[40px] mt-[20px] rounded-[10px] font-bold text-xl flex justify-center items-center  hover:bg-white hover:text-accent border-[2px] border-accent">Shop Now</Link>

        </div>

        {/* RIGHT - image */}
        <div className="w-[500px] h-[470px] bg-[url('/register1.jpg')] bg-cover bg-center rounded-full ">
        </div>

      </div>


      
        <div className="max-w-[1400px] mx-auto flex gap-[30px] py-[30px]">
    <div className="w-1/2 h-[250px] bg-[url('/home.jpg')] bg-cover bg-center rounded-2xl flex flex-col justify-center p-[40px]">
        <span className="text-sm font-bold text-yellow-500">SUMMER SALE</span>
        <h3 className="text-3xl font-bold text-white">Up to 50% Off</h3>
        <Link to={"/products"} className="mt-[15px] bg-white text-black w-[130px] h-[40px] rounded-[10px] font-bold flex justify-center items-center hover:bg-accent hover:text-white transition">Shop Now</Link>
    </div>
    <div className="w-1/2 h-[250px] bg-[url('/home.jpg')] bg-cover bg-center rounded-2xl flex flex-col justify-center p-[40px]">
        <span className="text-sm font-bold text-yellow-500">NEW ARRIVALS</span>
        <h3 className="text-3xl font-bold text-white">Discover the Latest</h3>
        <Link to={"/products"} className="mt-[15px] bg-white text-black w-[130px] h-[40px] rounded-[10px] font-bold flex justify-center items-center hover:bg-accent hover:text-white transition">Explore</Link>
    </div>
</div>



<div className="max-w-[1400px] mx-auto flex justify-center gap-[60px] py-[30px] border-t-[1px] border-gray-200">
    <div className="flex items-center gap-[10px]">
        <span className="text-2xl">✔️</span>
        <span className="text-lg font-semibold">Premium Quality</span>
    </div>
    <div className="flex items-center gap-[10px]">
        <span className="text-2xl">🚚</span>
        <span className="text-lg font-semibold">Free Shipping</span>
    </div>
    <div className="flex items-center gap-[10px]">
        <span className="text-2xl">↩️</span>
        <span className="text-lg font-semibold">Easy Returns</span>
    </div>
    <div className="flex items-center gap-[10px]">
        <span className="text-2xl">🔒</span>
        <span className="text-lg font-semibold">Secure Payment</span>
    </div>
</div>

    </div>
  )
}
