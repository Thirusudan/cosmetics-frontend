import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <div className="w-full min-h-screen ">

      <div className="max-w-[1400px] mx-auto flex items-start  py-[100px] gap-[100px]">

        {/* LEFT - all text content together */}
        <div className="flex flex-col text-black max-w-[600px] ">

          <span className="text-4xl font-bold text-secondary">Good Skin</span>
          <span className="text-4xl font-bold text-secondary">Good Glow</span>
          <span className="text-4xl font-bold text-yellow-500">Guaranteed</span>

          <p className="text-2xl mt-[20px]">
            Discover a wide range of natural, cruelty-free skincare and fragrance
            products delivered straight to your door.
          </p>

          <div className="flex flex-col text-2xl gap-[10px] mt-[20px]">
            <span>✔ 100% Natural & Organic Ingredients</span>
            <span>✔ Cruelty-Free & Vegan Formulas</span>
            <span>✔ Dermatologically Tested</span>
            <span>✔ Free From Harmful Chemicals</span>
            <span>✔ Sustainable & Eco-Friendly Packaging</span>
          </div>
          <Link to={"/products"} className=" text-white bg-accent w-[150px] h-[40px] mt-[20px] rounded-[10px] font-bold text-xl flex justify-center items-center  hover:bg-white hover:text-accent border-[2px] border-accent">Shop Now</Link>

        </div>

        {/* RIGHT - image */}
        <div className="w-[600px] h-[600px] bg-[url('/register1.jpg')] bg-cover bg-center rounded-full ">
        </div>

      </div>

    </div>
  )
}