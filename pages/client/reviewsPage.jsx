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

        <div className="w-full realtive min-h-screen bg-primary">
            {
              isloading ? (<Loader/>
              ):(  
               <div>
                <div>
                <h1 className="text-4xl text-center pt-[20px] font-bold">What our clients say</h1>
                <Link to={"/addreview"} className="absolute right-[100px] w-[170px] h-[45px] bg-accent text-white text-xl text-center justify-center items-center  ml-[20px] top-[130px] font-bold rounded-xl flex justify-center items-center hover:bg-white hover:text-accent border-[2px] border-bg-accent ">Drop a Review</Link>
                </div>
            <div className="w-full flex-wrap grid grid-cols-2 gap-[40px] p-[40px] px-[40px] ">
                {
                    reviews.map(
                        (review)=>{
                        return(
                            
                            <ReviewCard key={review._id} review={review}/>
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