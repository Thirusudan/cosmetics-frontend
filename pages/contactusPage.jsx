import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ContactusPage(){

    const[name,setName] =useState("")
    const[email,setEmail] = useState("")
    const[phoneNumber, setPhoneNumber] =useState("")
    const[message, setMessage] =useState("")

   

    function sendmessage(){
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/contact",{
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            message : message
        }).then((res)=>{
            console.log(res.data)
            toast.success("Your Contact details sumbit Sucessfully We will contact you soon",)
            setName("");
            setEmail("");
            setPhoneNumber("");
            setMessage("");
            
        }).catch((error)=>{
            console.log(error)
            toast.error("Failed to submit contact details")
        })
    }

    return(
        <div className="w-full h-full">

            <div className="text-center ">
            <p className="text-xl pt-[20px]">We're here to help and answer any question you might have.We look forward to hearing from you</p>
        </div>
            <div className="w-[700px] h-[700px] ml-[30px] mt-[2px] flex flex-col p-[10px]">
             
             <div className="w-[500px] flex flex-col mt-[10px]">
             <label className="text-lg">Full Name</label>
             <input type="text" 
              placeholder="Enter Your Name here"  
              className="w-[300px] h-[42px] border-[2px] border-accent rounded-xl" 
              value={name}
              onChange={(
                (e)=>{
                    setName(e.target.value)
              })}
              />
             </div>

             <div className="w-[500px] flex flex-col mt-[10px] ">
             <label className="text-lg">Email Address</label>
             <input type="text" 
              placeholder="Enter Your Email here"  
              className="w-[300px] h-[42px] border-[2px] border-accent rounded-xl"
              value={email}
              onChange={(
                (e)=>{
                 setEmail(e.target.value)
              })}
              />
             </div>

              <div className="w-[500px] flex flex-col mt-[10px] ">
             <label className="text-lg">Phone Number</label>
             <input type="text" 
              placeholder="Enter Your Phone Number here"
              className="w-[300px]  h-[42px] border-[2px]  border-accent rounded-xl"
              value={phoneNumber} 
              onChange={(
                (e)=>{
                setPhoneNumber(e.target.value)
              })}/>
             </div>
             
               <div className="w-[500px] flex flex-col mt-[10px] ">
             <label className="text-lg">Message</label>
             <textarea type="text" 
              placeholder="Enter Your message here"  
              className="w-[570px] h-[200px] border-[2px] border-black rounded-xl border-accent"
                value={message}
              onChange={(e)=>{
                setMessage(e.target.value)
              }}> </textarea>
             </div>

             <div className="w-[500px] mt-[20px] ml-[10px] ">
                <button className="w-[155px] h-[43px] text-lg bg-accent text-[#F2f2f2] font-bold rounded-xl cursor-pointer  hover:bg-white hover:text-accent border-[2px] border-accent" onClick={sendmessage}>Send message</button>
             </div>

            

            </div>
            

        </div>
    )

}