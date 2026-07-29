import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <div className="w-full min-h-screen ">

      <div className="max-w-[1400px] mx-auto flex items-start  py-[100px] gap-[100px]">

        {/* LEFT - all text content together */}
        <div className="flex flex-col text-black max-w-[600px] ">

          <span className="text-6xl font-bold text-secondary">Good Skin</span>
          <span className="text-6xl font-bold text-secondary">Good Glow</span>
          <span className="text-6xl font-bold text-yellow-500">Guaranteed</span>

          <p className="text-3xl mt-[20px]">
            Discover a wide range of natural, cruelty-free skincare and fragrance
            products delivered straight to your door.
          </p>

          <div className="flex flex-col text-3xl gap-[10px] mt-[20px]">
            <span>✔ 100% Natural & Organic Ingredients</span>
            <span>✔ Cruelty-Free & Vegan Formulas</span>
            <span>✔ Dermatologically Tested</span>
            <span>✔ Free From Harmful Chemicals</span>
            <span>✔ Sustainable & Eco-Friendly Packaging</span>
          </div>
          <Link to={"/products"} className=" text-white bg-accent w-[250px] h-[50px] mt-[20px] rounded-xl font-bold text-3xl flex justify-center items-center">Shop Now</Link>

        </div>

        {/* RIGHT - image */}
        <div className="w-[700px] h-[700px] bg-[url('/register1.jpg')] bg-cover bg-center rounded-full ">
        </div>

      </div>

    </div>
  )
}