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
        <div className="w-full flex flex-col lg:flex-row gap-10 px-4"> {/* RESPONSIVE: flex-col lg:flex-row (was buggy flex-col flex-row together before) */}
            <div 
              ref={imgRef}
              className={`w-full lg:w-[45%] h-[280px] sm:h-[380px] lg:h-[490px] bg-[url('/aboutus.jpg')] bg-cover mt-[30px] ml-0 lg:ml-[20px] rounded-[20px] lg:rounded-[30px] transition-all duration-1000 ease-out ${
                imgInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              /* RESPONSIVE: w-full lg:w-[45%], h-[280px] sm:h-[380px] lg:h-[490px], ml-0 lg:ml-[20px], rounded-[20px] lg:rounded-[30px] */
            />

             <div className="w-full lg:w-[55%] mt-[30px] flex flex-col flex-wrap"> {/* RESPONSIVE: w-full lg:w-[55%] (removed fixed width) */}

            <div 
              ref={textRef}
              className={`w-full lg:w-[750px] h-auto p-[5px] transition-all duration-1000 ease-out delay-150 ${
                textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              /* RESPONSIVE: w-full lg:w-[750px], h-auto (was fixed h-[160px]) */
            >
           <h1 className="text-accent font-bold text-2xl md:text-4xl">Our story</h1> {/* RESPONSIVE: text-2xl md:text-4xl */}
           <p className="mt-[10px] text-secondary p-[10px] text-sm md:text-base"> {/* RESPONSIVE: text-sm md:text-base */}
            At CBS Cosmetics, we believe beauty should be simple, honest, and empowering. Founded with a passion for quality and self-expression, we curate a range of skincare and makeup essentials crafted to bring out your natural radiance. Every product we offer is chosen with care, blending premium ingredients with affordable pricing so that everyone can feel confident in their own skin. From everyday must-haves to your next favorite find, CBS Cosmetics is dedicated to helping you look good, feel good, and glow with confidence.
           </p>
            </div>

            <div ref={cardsRef} className="w-full flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-[15px] pt-[10px]"> {/* RESPONSIVE: w-full (was fixed w-[950px]), flex-col sm:flex-row, gap-[15px] instead of ml offsets */}

            <div className={`w-full sm:w-[200px] h-auto sm:h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm p-[15px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
              cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`} style={{ transitionDelay: cardsInView ? "200ms" : "0ms" }}>
            {/* RESPONSIVE: w-full sm:w-[200px], h-auto sm:h-[250px] */}
  <span className="text-xl">🌿</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Natural Ingredients</h3>
  <p className="text-sm text-[#3f5a46] leading-relaxed break-words">
    We source pure, plant-based ingredients straight from nature, blending 
    them with care to create skincare you can truly trust and feel good about.
  </p>
        </div>
             
             <div className={`w-full sm:w-[200px] h-auto sm:h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm p-[15px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
               cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
             }`} style={{ transitionDelay: cardsInView ? "350ms" : "0ms" }}>
            {/* RESPONSIVE: w-full sm:w-[200px], h-auto sm:h-[250px] */}
  <span className="text-xl">🐰</span>
  <h3 className="text-lg font-bold text-[#2d4a34] mt-[10px]">Cruelty-Free</h3>
  <p className="text-sm text-[#3f5a46] mt-[10px] leading-relaxed break-words">
    We never test on animals, and never will. Every formula is developed 
    with kindness and compassion built directly into the process.
  </p>
           </div>

             <div className={`w-full sm:w-[200px] h-auto sm:h-[250px] bg-[#e8efe4] border border-[#a9c2a0] rounded-xl shadow-sm p-[15px] flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-lg ${
               cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
             }`} style={{ transitionDelay: cardsInView ? "500ms" : "0ms" }}>
            {/* RESPONSIVE: w-full sm:w-[200px], h-auto sm:h-[250px] */}
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