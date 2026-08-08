import { useEffect, useRef, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export default function Aboutuspage(){
    const [imgRef, imgInView] = useInView()
    const [textRef, textInView] = useInView()
    const [cardsRef, cardsInView] = useInView()

    return(
        <div className="w-full flex flex-col flex-row gap-10 px-4">
            <div 
              ref={imgRef}
              className={`lg:w-[45%] h-[490px] bg-[url('/aboutus.jpg')] bg-cover mt-[30px] ml-[20px] rounded-[30px] transition-all duration-1000 ease-out ${
                imgInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            />

             <div className="lg:w-[55%] w-full mt-[30px] flex flex-col flex-wrap">

            <div 
              ref={textRef}
              className={`w-[750px] h-[160px] p-[5px] transition-all duration-1000 ease-out delay-150 ${
                textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
           <h1 className="text-accent font-bold text-4xl">Our story</h1>
           <p className="mt-[10px] text-secondary p-[10px]">At CBS Cosmetics, we believe beauty should be simple, honest, and empowering. Founded with a passion for quality and self-expression, we curate a range of skincare and makeup essentials crafted to bring out your natural radiance. Every product we offer is chosen with care, blending premium ingredients with affordable pricing so that everyone can feel confident in their own skin. From everyday must-haves to your next favorite find, CBS Cosmetics is dedicated to helping you look good, feel good, and glow with confidence.</p>
            </div>

            <div ref={cardsRef} className="w-[950px] h-[400px] items-center flex items-center break-words pt-[10px]">

            <div className={`w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[5px] p-[10px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
              cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`} style={{ transitionDelay: cardsInView ? "200ms" : "0ms" }}>
  <span className="text-xl">🌿</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Natural Ingredients</h3>
  <p className="text-sm text-[#3f5a46] leading-relaxed break-words">
    We source pure, plant-based ingredients straight from nature, blending 
    them with care to create skincare you can truly trust and feel good about.
  </p>
        </div>
             
             <div className={`w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[10px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
               cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
             }`} style={{ transitionDelay: cardsInView ? "350ms" : "0ms" }}>
  <span className="text-xl">🐰</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Cruelty-Free</h3>
  <p className="text-sm text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    We never test on animals, and never will. Every formula is developed 
    with kindness and compassion built directly into the process.
  </p>
           </div>

             <div className={`w-[200px] h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm ml-[40px] p-[10px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
               cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
             }`} style={{ transitionDelay: cardsInView ? "500ms" : "0ms" }}>
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