import { useEffect, useState } from "react"
import Loader from "../../src/components/loader"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BiTrash } from "react-icons/bi"
import ReviewCard from "../../src/components/reviewCard"
import toast from "react-hot-toast/headless"

export default function DeleteReviewpage(){
    const navigate = useNavigate()
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
    
            <div className="w-full h-full realtive ">
                {
                  isloading ? (<Loader/>
                  ):(  
                  
                  
                <div className="w-full w-full grid grid-cols-3 flex-wrap gap-[40px] p-[40px] px-[40px]" >
                    {
                        reviews.map(
                            (review)=>{
                            return(
                                <div className="relative" key={review._id}>
                                <ReviewCard  review={review}/>
                                <BiTrash className="bg-red-500 absolute text-white rounded-full text-3xl p-[5px] cursor-pointer top-3 right-3" onClick={()=>{
                            const token = localStorage.getItem("token")
                            if(token == null){
                                navigate("/login")
                                return
                            }

                            axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/review/"+review._id,
                                {
                    headers:{
                    Authorization : "Bearer "+token
                            }} ).then((res)=>{
                                console.log("Review Deleted sucessfully")
                         toast.success("Review Deleted sucessfully")
                         setIsLoading(!isloading)
                            }).catch((err)=>{
                           console.log(err)
                           toast.error("Failed to delete review")
                            })
                           
                                }}/>
                                </div>
                            )
                        })
                    }
                </div>
                
                )
                    }
            </div>
         )
}