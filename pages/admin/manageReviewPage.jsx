import { useEffect, useState } from "react"
import Loader from "../../src/components/loader"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BiTrash } from "react-icons/bi"
import ReviewCard from "../../src/components/reviewCard"
import toast from "react-hot-toast"
import { FaStar } from "react-icons/fa"
import { CiStar } from "react-icons/ci"

export default function ManageReviewPage(){
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [isloading, setIsLoading] = useState(true)

    {/*Reply popup state - controls whether popup shows, which review is selected, and the text being typed*/}
    const [replyPopupVisible, setReplyPopupVisible] = useState(false)
    //controls whether the reply popup shows on screen
    const [selectedReview, setSelectedReview] = useState(null)
    //stores the whole review object the admin clicked "Reply" or "Edit Reply" on
    const [replyText, setReplyText] = useState("")
   // holds whatever text is currently typed in the popup's textarea


    useEffect(()=>{
       if(isloading){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/review").then(
            (res)=>{
                setReviews(res.data)
                setIsLoading(false)
        })
       }
    },[isloading])

    {/*Send Reply button function*/}
    function sendReply(){
        const token = localStorage.getItem("token")
        if(token == null){
            navigate("/login")
            return
        }
        axios.patch(import.meta.env.VITE_BACKEND_URL+"/api/review/"+selectedReview._id,
            {reply: replyText},
            { headers:{ Authorization : "Bearer "+token } }
        ).then((res)=>{
            toast.success("Reply sent")
            setReplyPopupVisible(false)
            setIsLoading(true)
        }).catch((error)=>{
            console.error(error)
            toast.error("Failed to add reply")
        })
    }
    {/*Send Reply button function end*/}

    {/*Delete Reply function*/}
    function deleteReply(){
        const token = localStorage.getItem("token")
        if(token == null){
            navigate("/login")
            return
        }
        axios.patch(import.meta.env.VITE_BACKEND_URL+"/api/review/reply/delete/"+selectedReview._id,
            {},
            { headers:{ Authorization : "Bearer "+token } }
        ).then((res)=>{
            toast.success("Reply deleted")
            setReplyPopupVisible(false)
            setIsLoading(true)
        }).catch((error)=>{
            console.error(error)
            toast.error("Failed to delete reply")
        })
    }
    {/*Delete Reply function end*/}

    {/*Delete Review function*/}
    function deleteReview(reviewId){
        const token = localStorage.getItem("token")
        if(token == null){
            navigate("/login")
            return
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/review/"+reviewId,
            { headers:{ Authorization : "Bearer "+token } }
        ).then((res)=>{
            toast.success("Review Deleted sucessfully")
            setIsLoading(true)
        }).catch((err)=>{
            console.error(err)
            toast.error("Failed to delete review")
        })
    }
    {/*Delete Review function end*/}

    return(
        <div className="w-full h-full realtive ">
            {
              isloading ? (<Loader/>) : (
                <div className="w-full flex flex-col gap-[20px] p-[40px] px-[40px] ">
                    {
                        reviews.map((review)=>{
                            return(
                                <div className="relative" key={review._id}>
                                    <ReviewCard review={review}/>

                                    {/*Delete Review button - deletes whole review*/}
                                    <BiTrash
                                        className="bg-red-500 text-white rounded-full text-3xl p-[5px] cursor-pointer absolute top-[-2px] right-[-35px]"
                                        onClick={()=>deleteReview(review._id)}
                                    />

                                    {/*Reply button - opens the popup instead of showing input inline*/}
                                    <button
                                        className="bg-accent text-white px-[15px] py-[8px] rounded-xl mt-[10px] cursor-pointer shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-accent"
                                        onClick={()=>{
                                            setSelectedReview(review)
                                            setReplyText(review.reply?.text || "")
                                            setReplyPopupVisible(true)
                                        }}
                                    >
                                        {review.reply && review.reply.text ? "Edit Reply" : "Reply"}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
              )
            }

            {/*Reply popup - only shows when replyPopupVisible is true AND a review is selected, same pattern as the orders popup*/}
            {
                replyPopupVisible && selectedReview && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50 ">
                        <div className="w-full max-w-xl bg-white rounded-lg p-6 relative shadow-xl">

                            {/*Close button - just closes popup, no save*/}
                            <button
                                className="absolute w-[30px] h-[30px] bg-red-600 border-[2px] border-red-600 text-white top-[-15px] right-[-15px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-600"
                                onClick={()=>setReplyPopupVisible(false)}
                            >
                                x
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">Reply to {selectedReview.name}</h2>

                            <div className="flex gap-1 mb-5">
    {[1,2,3,4,5].map((item)=>(
        item <= selectedReview.rating
        ?
        <FaStar key={item} className="text-yellow-500 text-xl"/>
        :
        <CiStar key={item} className="text-yellow-500 text-xl"/>
    ))}
</div>

<div className="text-gray-500 text-sm mb-4  absolute top-[5px] right-[15px]">
    {new Date(selectedReview.createdAt).toLocaleString()}
</div>


                            {/*Original review shown read-only for context*/}
                            <p className="text-gray-600 mb-4">{selectedReview.review}</p>

                  

                            {/*Write a Reply function*/}
                            <textarea
                                className="w-full h-[150px] p-2 border rounded mb-4"
                                placeholder="Write a Reply"
                                value={replyText}
                                onChange={(e)=>setReplyText(e.target.value)}
                            ></textarea>
                            {/*Write a Reply function End*/}

                            <div className="flex justify-end gap-2">
                                {/*Delete Reply button - only shows if a reply already exists*/}
                                {
                                    selectedReview.reply && selectedReview.reply.text && (
                                        <button
                                            className="bg-red-500 text-white px-[15px] py-[8px] rounded-xl shadow-2xl bg-accent border-[1px] border-red-500 text-white hover:bg-white hover:text-red-500 cursor-pointer"
                                            onClick={deleteReply}
                                        >
                                            Delete Reply
                                        </button>
                                    )
                                }
                                {/*SendReply button - saves and closes popup*/}
                                <button
                                    className="bg-accent text-white px-[15px] py-[8px] rounded-xl shadow-2xl bg-accent border-[1px] border-accent text-white hover:bg-white hover:text-accent cursor-pointer"
                                    onClick={sendReply}
                                >
                                    SendReply
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
     )
}