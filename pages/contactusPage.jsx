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
        <div className="w-full h-full ">

            <div className="text-center ">
            <p className="text-xl pt-[20px]">We're here to help and answer any question you might have.We look forward to hearing from you</p>
        </div>
        <div className="flex flex-row gap-[200px]">
            <div className="w-[600px] h-[700px] ml-[30px] mt-[2px] flex flex-col p-[10px]">
             
             <div className="w-[500px] flex flex-col mt-[9px]">
             <label className="text-md">Full Name</label>
             <input type="text" 
              placeholder="Enter Your Name here"  
              className="w-[300px] h-[35px] border-[2px] border-accent rounded-xl" 
              value={name}
              onChange={(
                (e)=>{
                    setName(e.target.value)
              })}
              />
             </div>

             <div className="w-[500px] flex flex-col mt-[9px] ">
             <label className="text-md">Email Address</label>
             <input type="text" 
              placeholder="Enter Your Email here"  
              className="w-[300px] h-[35px] border-[2px] border-accent rounded-xl"
              value={email}
              onChange={(
                (e)=>{
                 setEmail(e.target.value)
              })}
              />
             </div>

              <div className="w-[500px] flex flex-col mt-[9px] ">
             <label className="text-md">Phone Number</label>
             <input type="text" 
              placeholder="Enter Your Phone Number here"
              className="w-[300px]  h-[35px] border-[2px]  border-accent rounded-xl"
              value={phoneNumber} 
              onChange={(
                (e)=>{
                setPhoneNumber(e.target.value)
              })}/>
             </div>
             
               <div className="w-[500px] flex flex-col mt-[9px] ">
             <label className="text-md">Message</label>
             <textarea type="text" 
              placeholder="Enter Your message here"  
              className="w-[570px] h-[150px] border-[2px] border-black rounded-xl border-accent"
                value={message}
              onChange={(e)=>{
                setMessage(e.target.value)
              }}> </textarea>
             </div>

             <div className="w-[500px] mt-[20px] ml-[10px] ">
                <button className="w-[130px] h-[40px] text-md bg-accent text-[#F2f2f2] font-bold rounded-xl cursor-pointer  hover:bg-white hover:text-accent border-[2px] border-accent" onClick={sendmessage}>Send message</button>
             </div>

        
            </div>
            
  
         <div className="w-[350px] h-[450px] mt-[30px] ml-[50px] bg-accent text-white rounded-2xl p-[30px] flex flex-col justify-between">
    
    <div>
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-sm mt-[10px] opacity-80">
            Have a question or need more information about our products? 
            Reach out to us using the details below.
        </p>
    </div>

    <div className="flex flex-col gap-[20px] mt-[10px] ">
        <a href=""></a>

        <div className="flex items-start gap-[12px]">
            <span className="text-lg">📍</span>
            <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm opacity-80">123, Negombo Road, Negombo</p>
            </div>
        </div>


        <a href="mailto:tsudhan110@gmail.com">
        <div className="flex items-start gap-[12px]">
            <span className="text-lg">✉️</span>
            <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-80">tsudhan110@gmail.com</p>
            </div>
        </div>
        </a>

         <a href="tel:+944746691">
        <div className="flex items-start gap-[12px]">
            <span className="text-lg">📞</span>
            <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm opacity-80">+94 4746691</p>
            </div>
        </div>
        </a>

        <div className="flex items-start gap-[12px]">
            <span className="text-lg">🕒</span>
            <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-sm opacity-80">Mon - Sat: 10:00 AM - 7:00 PM</p>
                <p className="text-sm opacity-80">Sunday: Closed</p>
            </div>
        </div>

    </div>

</div>
</div>
              


        </div>
    )

}