import { useEffect, useState } from "react"
import ReviewCard from "../../src/components/reviewCard"
import axios from "axios"
import Loader from "../../src/components/loader"
import { Link } from "react-router-dom"

export default function ReviewsPage(){

    const [reviews, setReviews] = useState([])
    const [isloading, setIsLoading] =useState(true)

    useEffect(()=>{
       if(isloading){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/review").then(
            (res)=>{
                console.log(res.data)
                setReviews(res.data)
                setIsLoading(false)
        })
       }
    },[isloading]
)

     return(

        <div className="w-full min-h-screen bg-primary">
            {
              isloading ? (<Loader/>
              ):(  
               <div>
                <div className="flex justify-between items-center px-[100px] pt-[20px] animate-[fadeInUp_0.6s_ease-out_both]">
                  <h1 className="text-4xl font-bold">What our clients say</h1>
                  <Link to={"/addreview"} className="w-[145px] h-[39px] bg-accent text-white text-lg rounded-xl flex justify-center items-center hover:bg-white hover:text-accent border-[2px] border-bg-accent hover:scale-105 transition-all duration-200">Drop a Review</Link>
                </div>
             
            <div className="w-full flex-wrap grid grid-cols-2 gap-[40px] p-[40px] px-[40px] ">
                {
                   reviews.map(
                        (review, index)=>{
                        return(
                            <div
                              key={review._id}
                              className="animate-[fadeInUp_0.5s_ease-out_both]"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <ReviewCard review={review}/>
                            </div>
                        )
                    })
                }
            </div>
            </div>
            )
                }
        </div>
     )
}