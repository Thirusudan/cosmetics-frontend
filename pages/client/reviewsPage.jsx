import { useEffect, useState } from "react"
import ReviewCard from "../../src/components/reviewCard"
import axios from "axios"
import Loader from "../../src/components/loader"
import { Link } from "react-router-dom"

export default function ReviewsPage(){

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] =useState(true)

    useEffect(()=>{
       if(loading){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/review").then(
            (res)=>{
                console.log(res.data)
                setReviews(res.data)
                setLoading(false)
        })
       }
    },[loading]
)

     return(

        <div className="w-full h-full realtive">
            {
              loading ? (<Loader/>
              ):(  
               <div>
                <div>
                <h1 className="text-4xl text-center pt-[20px] font-bold">What our clients say</h1>
                <Link to={"/addreview"} className="absolute right-[100px] w-[150px] h-[40px] bg-black text-white text-xl text-center justify-center items-center  ml-[20px] top-[130px] text-bold">Drop a Review</Link>
                </div>
            <div className="w-full w-full grid grid-cols-3 flex-wrap gap-[40px] p-[40px] px-[40px] ">
                {
                    reviews.map(
                        (review)=>{
                        return(
                            <ReviewCard key={review.id} review={review}/>
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