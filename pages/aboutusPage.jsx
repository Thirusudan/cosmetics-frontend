export default function Aboutuspage(){
    return(
        <div className="w-full flex flex-col flex-row gap-10 px-4">
            <div className="lg:w-[45%] h-[490px]  bg-[url('/aboutus.jpg')] bg-cover mt-[30px] ml-[20px] rounded-[30px]">

            </div>

             <div className=" lg:w-[55%] w-full mt-[30px]  flex flex-col flex-wrap">

            <div className="w-[750px] h-[160px]  p-[5px]   ">
           <h1 className="text-accent font-bold text-4xl">Our story</h1>
           <p className="mt-[10px] text-secondary p-[10px]">At CBS Cosmetics, we believe beauty should be simple, honest, and empowering. Founded with a passion for quality and self-expression, we curate a range of skincare and makeup essentials crafted to bring out your natural radiance. Every product we offer is chosen with care, blending premium ingredients with affordable pricing so that everyone can feel confident in their own skin. From everyday must-haves to your next favorite find, CBS Cosmetics is dedicated to helping you look good, feel good, and glow with confidence.</p>
            </div>

            <div className="w-[950px] h-[400px]  items-center flex items-center break-words pt-[10px] ">

            <div className="w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[5px] p-[10px] flex flex-col">
  <span className="text-xl">🌿</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Natural Ingredients</h3>
  <p className="text-sm text-[#3f5a46]  leading-relaxed break-words">
    We source pure, plant-based ingredients straight from nature, blending 
    them with care to create skincare you can truly trust and feel good about.
  </p>
        </div>
             
             <div className="w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[10px] flex flex-col">
  <span className="text-xl">🐰</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Cruelty-Free</h3>
  <p className="text-sm text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    We never test on animals, and never will. Every formula is developed 
    with kindness and compassion built directly into the process.
  </p>
           </div>

             <div className="w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[10px] flex flex-col">
  <span className="text-xl">🧪</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Dermatologically Tested</h3>
  <p className="text-sm text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    Every formula is carefully tested to ensure it's gentle, safe, and 
    suitable for all skin types, so you can use it with complete confidence.
  </p>
             </div>
            
            </div>

            </div>

           
        </div>
    )
}