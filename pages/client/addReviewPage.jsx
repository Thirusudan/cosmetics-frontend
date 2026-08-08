import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa"
import { Link, useNavigate} from "react-router-dom";


export default function AddReviewpage(){
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [star,setStar] =useState(0)//1
const [review,setReview] =useState("")
const navigate = useNavigate()


function submit(){
   const token = localStorage.getItem("token") 
  if(token==null){
   navigate("/login")
   return
  }

  axios.post(import.meta.env.VITE_BACKEND_URL+"/api/review",
    {
      name : name,
      email:email,
      rating: star,
      review: review
    }
    ,{
    headers : {
                    Authorization : `Bearer ${token}`,
                },
  }).then(
    (res)=>{
      console.log(res.data)
      toast.success("Thank you for Review")
       navigate("/reviews")
  }).catch((err)=>{
        console.error(err)
        toast.error("Failed to add review try again")
  })
}


    return(
      <div className="w-full min-h-screen  flex justify-center items-center fixed"> 
        <div className="w-full max-w-[1000px] border-[2px] border-accent rounded-[30px] flex flex-col p-[10px] absolute top-[20px] animate-[fadeInUp_0.6s_ease-out_both]"> 
         <h1 className="text-xl font-bold text-center ">Submit your Review</h1>
         <div className="w-full flex flex-row gap-[40px]">
        <div className="w-[350px] flex flex-col text-md  animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
            <span>Name</span>
            <input type="text" onChange={(e)=>{
              setName(e.target.value)
              
            }}
            value={name}
            placeholder="Enter Your name here" 
            className="w-[350px] h-[40px] border-[2px] rounded-[10px]  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"/>

        </div>
          <div className="w-[350px] flex flex-col text-md animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
            <span>Email</span>
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }} type="text" 
            placeholder="Enter Your Email here" 
            value={email}
            className="w-[350px] h-[40px] border-[2px] rounded-[10px]  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"/>

        </div>
        </div>

         <div className="w-[350px] flex flex-col text-md animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
            <span>Rating</span>
            <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((item) => (
                            item <= star
                            ?
                            <FaStar
                                key={item}
                                onClick={() => setStar(item)}
                                className="cursor-pointer text-4xl text-yellow-500 transition-transform duration-150 hover:scale-125"
                            />
                            :
                            <CiStar
                                key={item}
                                onClick={() => setStar(item)}
                                className="cursor-pointer text-4xl text-yellow-500 transition-transform duration-150 hover:scale-125"
                            />
                        ))}
                        
                    </div>

        </div>

         <div className="w-full flex flex-col text-md animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
            <span>Review</span>
    
           <textarea  placeholder="Drop your Review here" className="w-full h-[200px] border-[2px] rounded-[20px]   transition-all duration-200 focus:shadow-md focus:outline-none focus:border-accent"    value={review} 
              onChange={(e)=>{
              setReview(e.target.value)
          
            }} type="text" >
            
           </textarea >
        </div>
        <div className="w-full flex  items center  pt-[20px] gap-[20px] animate-[fadeInUp_0.5s_ease-out_0.5s_both] ">
            <button className="w-[100px] h-[40px] text-md bg-accent text-white  rounded-xl cursor-pointer hover:bg-white hover:text-accent border-[2px] border-accent  transition-all duration-200  hover:scale-105 transition-all duration-200" onClick={submit}> 
                Submit
            </button>

                 <Link to={"/reviews"} className="w-[100px] h-[40px] text-md bg-white bg-white text-accent  rounded-xl border-[2px] border-accent  flex justify-center items-center hover:bg-accent hover:text-white hover:scale-105 transition-all duration-200" > 
               Cancel
            </Link>
        

        </div>

        
    


        

        </div>
      </div>
      )
}



/*
Star function
[1, 2, 3, 4, 5].map((item) => ...)
        ↓
.map loops through the array [1,2,3,4,5] one number at a time, running the function once
for EACH number — so this runs 5 times total, building 5 star icons
        ↓
item = position of this star (1 to 5)  ← NOT the rating quantity, just "which star is this"
        ↓
star = currently selected rating (state)  ← this IS the actual rating the user picked
        ↓
compare: item <= star ?
        ↓
   ┌───────────────┴───────────────┐
true → FaStar (filled)      false → CiStar (empty)
   ↓                                ↓
onClick sets star = item    onClick sets star = item

══════════════════════════════════════════════

REAL EXAMPLE — say star = 3

.map runs 5 times, item takes each value in turn: 1, 2, 3, 4, 5

item = 1  →  1 <= 3 → true  → FaStar (filled)
item = 2  →  2 <= 3 → true  → FaStar (filled)
item = 3  →  3 <= 3 → true  → FaStar (filled)
item = 4  →  4 <= 3 → false → CiStar (empty)
item = 5  →  5 <= 3 → false → CiStar (empty)

Result on screen: ★★★☆☆ — first 3 stars filled, last 2 empty. Matches "3 stars selected."

        ↓
User clicks the 4th star:
onClick={() => setStar(item)}   ← runs setStar(4)
        ↓
star = 4  (updated by the click)
        ↓
.map runs again, all 5 times, with the new star value

item = 1  →  1 <= 4 → true  → FaStar
item = 2  →  2 <= 4 → true  → FaStar
item = 3  →  3 <= 4 → true  → FaStar
item = 4  →  4 <= 4 → true  → FaStar   ← just changed from empty to filled
item = 5  →  5 <= 4 → false → CiStar

Result on screen: ★★★★☆ — now 4 stars filled instead of 3. Clicking any star always
"fills in" every star up to and including the one clicked, and empties everything after it.
*/