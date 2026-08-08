import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"


export default function ReviewCard(props){
    const review = props.review

    return(
        <div className="w-full min-h-[220px] shadow-2xl shrink-0 flex flex-col rounded-xl bg-[#e8efe4] border border-bg-accent border-[2px] p-[15px] md:p-[20px] gap-[8px] md:gap-[10px]"> {/* RESPONSIVE: p-[15px] md:p-[20px], gap-[8px] md:gap-[10px] */}

          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-[8px] sm:gap-0"> {/* RESPONSIVE: flex-col sm:flex-row, sm:items-center, gap-[8px] sm:gap-0 */}
            <div className="flex gap-1">
                {/* RESPONSIVE: star icons text-xl md:text-2xl */}
                {[1,2,3,4,5].map((item)=>(
                    item <= review.rating
                    ?
                    <FaStar key={item} className="text-yellow-500 text-xl md:text-2xl"/>
                    :
                    <CiStar key={item} className="text-yellow-500 text-xl md:text-2xl"/>
                ))}
            </div>

            <div className="text-gray-500 text-sm md:text-md"> {/* RESPONSIVE: text-sm md:text-md */}
                {new Date(review.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="w-full bg-white rounded-lg p-[10px]">
            <span className="text-sm md:text-md">{review.review}</span> {/* RESPONSIVE: text-sm md:text-md */}
          </div>

          <div className="text-sm md:text-md font-bold"> {/* RESPONSIVE: text-sm md:text-md */}
            {review.name}
          </div>

          {
            review.reply && review.reply.text && (
                <div className="w-full bg-white rounded-lg p-[10px] border-l-[4px] border-accent mt-auto">
                    <span className="font-bold text-xs md:text-sm text-accent">Reply from CBC Cosmetics</span> {/* RESPONSIVE: text-xs md:text-sm */}
                    <p className="text-sm md:text-md">{review.reply.text}</p> {/* RESPONSIVE: text-sm md:text-md */}
                </div>
            )
          }

        </div>
    )
}