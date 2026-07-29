export default function Aboutuspage(){
    return(
        <div className="w-full h-full flex flex-row gap-[200px]">
            <div className="w-[600px] h-[600px]  bg-[url('/aboutus.jpg')] bg-cover mt-[100px] ml-[100px] rounded-[30px]">

            </div>

             <div className="w-[750px] h-[550px] mt-[100px]">

            <div className="w-[950px] h-[160px]  p-[5px]">
           <h1 className="text-accent font-bold text-4xl">Our story</h1>
           <p className="mt-[10px] text-secondary">At CBS Cosmetics, we believe beauty should be simple, honest, and empowering. Founded with a passion for quality and self-expression, we curate a range of skincare and makeup essentials crafted to bring out your natural radiance. Every product we offer is chosen with care, blending premium ingredients with affordable pricing so that everyone can feel confident in their own skin. From everyday must-haves to your next favorite find, CBS Cosmetics is dedicated to helping you look good, feel good, and glow with confidence.</p>
            </div>

            <div className="w-[950px] h-[400px]  items-center flex items-center gap-[20px] break-words">

            <div className="w-[250px] h-[300px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[18px] flex flex-col">
  <span className="text-4xl">🌿</span>
  <h3 className="text-2xl font-bold text-[#2d4a34] mt-[10px]">Natural Ingredients</h3>
  <p className="text-base text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    We source pure, plant-based ingredients straight from nature, blending 
    them with care to create skincare you can truly trust and feel good about.
  </p>
        </div>
             
             <div className="w-[250px] h-[300px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[18px] flex flex-col">
  <span className="text-4xl">🐰</span>
  <h3 className="text-2xl font-bold text-[#2d4a34] mt-[10px]">Cruelty-Free</h3>
  <p className="text-base text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    We never test on animals, and never will. Every formula is developed 
    with kindness and compassion built directly into the process.
  </p>
           </div>

             <div className="w-[250px] h-[300px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[18px] flex flex-col">
  <span className="text-4xl">🧪</span>
  <h3 className="text-2xl font-bold text-[#2d4a34] mt-[10px]">Dermatologically Tested</h3>
  <p className="text-base text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    Every formula is carefully tested to ensure it's gentle, safe, and 
    suitable for all skin types, so you can use it with complete confidence.
  </p>
             </div>
            
            </div>

            </div>

           
        </div>
    )
}