import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"

export default function ReviewCard(props){
    const review = props.review

    return(
        <div className="w-full h-[500px] shadow-2xl shrink-0 flex flex-col overflow-hidden rounded-xl bg-[#e8efe4] border border-bg-accent border-[2px] ">
          <div className="w-full h-[100px] flex px-[20px] items-center">
             {[1,2,3,4,5].map((item)=>(
                item <= review.rating
                ?
                <FaStar key={item} className="text-yellow-500 text-3xl"/>   // ⭐ filled
                :
                <CiStar key={item} className="text-yellow-500 text-3xl"/>   // ☆ empty
            ))}
          </div>

          <div className="w-full h-[300px] flex-1 overflow-hidden hover:overflow-y-auto px-[20px]">
          <span className="text-lg ">{review.review}</span>
          </div>

          <div className="text-lg w-full h-[100px] mt-auto px-[20px]">
        <span>{review.name}</span>
          </div>
           
        </div>
    )
    
}