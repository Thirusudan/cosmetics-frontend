import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const banners = [
  { tag: "SUMMER SALE", title: "Up to 50% Off", btnText: "Shop Now" },
  { tag: "NEW ARRIVALS", title: "Discover the Latest", btnText: "Explore" },
  { tag: "BEST SELLERS", title: "Customer Favorites", btnText: "View All" },
];

export default function PromoAlert() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1000);
    const hideTimer = setTimeout(() => setVisible(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [current]);

  return (
    <div 
      className={`fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px] pointer-events-none"}`}
    >
      <div className="bg-[url('/home.jpg')] w-[500px] h-[350px] bg-cover text-white rounded-2xl shadow-xl px-[30px] py-[15px] flex items-center gap-[20px]">
        <div>
          <span className="text-xs font-bold text-yellow-400">{banners[current].tag}</span>
          <h4 className="text-lg font-bold">{banners[current].title}</h4>
        </div>
        <Link 
          to={"/products"} 
          className="bg-white text-accent px-[15px] py-[8px] rounded-xl font-bold text-sm whitespace-nowrap hover:bg-yellow-400 transition"
        >
          {banners[current].btnText}
        </Link>
        <button 
          onClick={() => setVisible(false)} 
          className="text-white/70 hover:text-white text-xl ml-[5px]"
        >
          ×
        </button>
      </div>
    </div>
  );
}