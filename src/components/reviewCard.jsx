import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"


export default function ReviewCard(props){
    const review = props.review

    return(
        <div className="w-full min-h-[220px] shadow-2xl shrink-0 flex flex-col rounded-xl bg-[#e8efe4] border border-bg-accent border-[2px] p-[20px]  gap-[10px]">

          <div className="w-full flex justify-between items-center">
            <div className="flex gap-1">
                {[1,2,3,4,5].map((item)=>(
                    item <= review.rating
                    ?
                    <FaStar key={item} className="text-yellow-500 text-2xl"/>
                    :
                    <CiStar key={item} className="text-yellow-500 text-2xl"/>
                ))}
            </div>

            <div className="text-gray-500 text-md">
                {new Date(review.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="w-full  bg-white rounded-lg p-[10px] ">
            <span className="text-md  ">{review.review}</span>
          </div>

          <div className="text-md font-bold">
            {review.name}
          </div>

          

          {
            review.reply && review.reply.text && (
                <div className="w-full bg-white rounded-lg p-[10px] border-l-[4px] border-accent mt-auto">
                    <span className="font-bold text-sm text-accent">Reply from CBC Cosmetics</span>
                    <p className="text-md">{review.reply.text}</p>
                </div>
            )
          }

        </div>
    )
}