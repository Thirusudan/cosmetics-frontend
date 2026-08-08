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

/*

FULL DIAGRAM OF ADMIN REPLY FUNCTION

State variables
──────────────────────────────
const [replyPopupVisible, setReplyPopupVisible] = useState(false)
const [selectedReview, setSelectedReview] = useState(null)
const [replyText, setReplyText] = useState("")
        ↓

Admin clicks "Reply" or "Edit Reply" on a review card
──────────────────────────────
<button onClick={()=>{
    setSelectedReview(review)
    setReplyText(review.reply?.text || "")
    setReplyPopupVisible(true)
}}>
    {review.reply && review.reply.text ? "Edit Reply" : "Reply"}
</button>
        ↓

Three things run, in order (NOT automatically triggered by each other —
just written one after another, all firing because it's the same onClick)
──────────────────────────────
setSelectedReview(review)              → selectedReview = the clicked review object
setReplyText(review.reply?.text || "") → replyText = existing text, or "" if no reply yet
setReplyPopupVisible(true)             → replyPopupVisible = true
        ↓

Safety check before rendering the popup
──────────────────────────────
{ replyPopupVisible && selectedReview && ( ...popup content... ) }
Both must be true/non-null before React tries to read selectedReview.name or
selectedReview.review — prevents a crash from reading properties off null.
        ↓

Popup renders, showing the original review + editable textarea
──────────────────────────────
<h2>Reply to {selectedReview.name}</h2>
<p>{selectedReview.review}</p>
<textarea value={replyText} onChange={(e)=>setReplyText(e.target.value)}></textarea>
        ↓
   ┌───────────────────────────┴───────────────────────────┐

Admin clicks "SendReply"                          Admin clicks "Delete Reply"
(only shows if a reply already exists)
──────────────────────────────                    ──────────────────────────────
function sendReply(){                              function deleteReply(){
    const token = localStorage.getItem("token")        const token = localStorage.getItem("token")
    if(token == null){ navigate("/login"); return }    if(token == null){ navigate("/login"); return }

    axios.patch(".../api/review/"+selectedReview._id,  axios.patch(".../api/review/reply/delete/"+selectedReview._id,
        {reply: replyText},                                {},
        {headers:{Authorization:"Bearer "+token}}          {headers:{Authorization:"Bearer "+token}}
    ).then((res)=>{                                    ).then((res)=>{
        toast.success("Reply sent")                        toast.success("Reply deleted")
        setReplyPopupVisible(false)                        setReplyPopupVisible(false)
        setIsLoading(true)                                 setIsLoading(true)
    }).catch((error)=>{                                }).catch((error)=>{
        toast.error("Failed to add reply")                 toast.error("Failed to delete reply")
    })                                                  })
}                                                    }
   ↓                                                    ↓
        Both use PATCH — because backend does findByIdAndUpdate, an UPDATE not a removal

Backend for sendReply — updates the reply field
──────────────────────────────
Review.findByIdAndUpdate(req.params.id, { reply: { text: replyText, repliedAt: new Date() } }, {new:true})

Backend for deleteReply — resets the reply field, does NOT remove the review
──────────────────────────────
if(isAdmin(req)){
    const deleted = await Review.findByIdAndUpdate(
        req.params.id,
        { reply: { text: null, repliedAt: null } },
        { new: true }
    )
    if(!deleted){ return res.status(404).json({message:"Reply Not found"}) }
    res.json("Reply deleted successuly")
}
        ↓

Frontend closes popup, refetches reviews
──────────────────────────────
setReplyPopupVisible(false)
setIsLoading(true)   → triggers useEffect → reviews refetch → card updates with new/removed reply

*/

/*
FULL PARAGRAPH EXPLANATION OF ADMIN REPLY FUNCTION

First, each review card has a button whose label depends on whether a reply already exists:
review.reply && review.reply.text ? "Edit Reply" : "Reply". This checks TWO things joined by &&
— does review.reply exist at all (not null), and does that object's text actually hold something.
Both must be true for it to say "Edit Reply"; if review.reply is null (no reply written yet), the
check stops immediately at the first condition and falls back to "Reply" — this short-circuiting
also protects against a crash, since trying to read review.reply.text directly when review.reply
is null would throw an error.

When the admin clicks this button, three things run — not because one triggers the next, but
because they're all written inside the same onClick function and JavaScript runs each line in
order. setSelectedReview(review) saves the whole clicked review object. setReplyText(review.reply?.text
|| "") uses optional chaining (?.) to safely check if review.reply exists — if it does, .text grabs
the actual reply message; if review.reply is null, ?. stops safely and returns undefined, and ||
"" falls back to an empty string instead, so the textarea starts blank for a brand new reply, or
pre-filled for an edit. Finally setReplyPopupVisible(true) flips the visibility flag to true.

Now the safety check {replyPopupVisible && selectedReview && (...)} runs. Since both were just set
to true and to a real object, the popup renders. Inside it, {selectedReview.name} and
{selectedReview.review} show the original review for context, and the textarea, bound to
value={replyText}, lets the admin type — onChange updates replyText on every keystroke.

If the admin clicks "SendReply", the sendReply function checks for a login token first, redirecting
to /login if missing. Then it sends axios.patch(".../api/review/" + selectedReview._id, {reply:
replyText}, {headers...}) — PATCH is used here (not POST) because this modifies an EXISTING review's
reply field rather than creating a brand new resource. On the backend, Review.findByIdAndUpdate
finds that review by ID and updates its reply object with the new text and a timestamp. On success,
the frontend shows a toast, closes the popup with setReplyPopupVisible(false), and — the familiar
trick — calls setIsLoading(true), which flips the useEffect dependency and refetches all reviews,
so the updated reply appears on screen.

If the admin clicks "Delete Reply" instead (which only shows if selectedReview.reply && 
selectedReview.reply.text is true — same guard pattern as the button label), deleteReply runs.
Same login check, then axios.patch(".../api/review/reply/delete/" + selectedReview._id, {}, 
{headers...}) — an empty body, since nothing new needs to be sent, just which review's reply to
clear, via the ID in the URL. On the backend, isAdmin(req) is checked first; if true,
Review.findByIdAndUpdate resets the reply field back to { text: null, repliedAt: null } — notably,
this does NOT delete the review itself, nor does it fully remove the reply field from the document;
it just resets its values. This is exactly why PATCH (an update method) is used here instead of
DELETE (a removal method) — despite the feature being called "delete reply," what's technically
happening in the database is an UPDATE, not a removal.

(THE DOUBT, explained here): if you tried switching this to axios.delete while keeping the same
3-argument structure — axios.delete(url, {}, {headers...}) — it would break silently. axios.delete
only accepts 2 arguments, (url, config), unlike patch/post/put which accept 3, (url, body, config).
The {} meant as a body would get misread as the config object, and the actual headers (containing
the Authorization token) would become an ignored 3rd argument. Without that header reaching the
backend, isAdmin(req) would return false (since req.user depends on it), and since the whole
function body sits inside if(isAdmin(req)){...} with no else, nothing would run — no response, no
error, just a hanging request on the frontend. To use axios.delete correctly, headers would need
to move into the 2nd argument slot instead of the 3rd, with the {} removed entirely.

Either way — success or failure — once sendReply or deleteReply finishes successfully, 
setReplyPopupVisible(false) closes the popup, and setIsLoading(true) triggers a full refetch of the
reviews list, so the review card immediately reflects whatever changed: a new reply, an edited
reply, or the reply being cleared back to empty.
*/