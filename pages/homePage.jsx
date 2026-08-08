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

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start py-[30px] md:py-[50px] gap-[40px] md:gap-[100px] px-[20px] md:px-0">

    {/* LEFT - all text content together */}
    <div className="flex flex-col text-black text-center md:text-left max-w-full md:max-w-[600px] ml-0 md:ml-[30px] mt-0 md:mt-[-15px] items-center md:items-start animate-[fadeInLeft_1s_ease-out_both]">

      <span className="text-xl md:text-2xl font-bold text-secondary">Good Skin</span>
      <span className="text-xl md:text-2xl font-bold text-secondary">Good Glow</span>
      <span className="text-xl md:text-2xl font-bold text-yellow-500">Guaranteed</span>

      <p className="text-lg md:text-xl mt-[15px] md:mt-[20px]">
        Discover a wide range of natural, cruelty-free skincare and fragrance
        products delivered straight to your door.
      </p>

      <div className="flex flex-col text-md gap-[8px] md:gap-[10px] mt-[15px] md:mt-[20px] items-center md:items-start">
        <span>✔ 100% Natural & Organic Ingredients</span>
        <span>✔ Cruelty-Free & Vegan Formulas</span>
        <span>✔ Dermatologically Tested</span>
        <span>✔ Free From Harmful Chemicals</span>
        <span>✔ Sustainable & Eco-Friendly Packaging</span>

        <div className="flex flex-wrap justify-center md:justify-start gap-[25px] md:gap-[40px] mt-[10px] animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg md:text-xl font-bold text-accent">1000+</span>
            <span className="text-sm">Happy Customers</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg md:text-xl font-bold text-accent">50+</span>
            <span className="text-sm">Products</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg md:text-xl font-bold text-accent">100%</span>
            <span className="text-sm">Natural</span>
          </div>
        </div>

      </div>
      <Link to={"/products"} className="text-white bg-accent w-[130px] h-[40px] mt-[20px] rounded-[10px] font-bold text-lg md:text-xl flex justify-center items-center hover:bg-white hover:text-accent border-[2px] border-accent animate-[fadeInUp_0.6s_ease-out_0.9s_both] hover:scale-105 transition-all duration-200">
        Shop Now
      </Link>

    </div>

    {/* RIGHT - image — now appears FIRST on mobile, stays on the right on desktop */}
    <div className="order-first md:order-last w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[470px] bg-[url('/register1.jpg')] bg-cover bg-center rounded-full animate-[fadeInRight_1s_ease-out_0.2s_both] transition-transform duration-500 hover:scale-105">
    </div>

</div>
    </div>
  )
}