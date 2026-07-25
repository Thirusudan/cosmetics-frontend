import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"

export default function ReviewCard(props){
    const review = props.review

    return(
        <div className="w-[700px] h-[500px] shadow-2xl shrink-0 flex flex-col overflow-hidden rounded-xl ">
          <div className="w-full h-[100px] flex">
             {[1,2,3,4,5].map((item)=>(
                item <= review.rating
                ?
                <FaStar key={item} className="text-yellow-500 text-3xl"/>   // ⭐ filled
                :
                <CiStar key={item} className="text-yellow-500 text-3xl"/>   // ☆ empty
            ))}
          </div>

          <div className="w-full h-[300px]">
          <span className="text-2xl">{review.review}</span>
          </div>

          <div className="text-2xl w-full h-[100px]">
        <span>{review.name}</span>
          </div>
           
        </div>
    )
    
}