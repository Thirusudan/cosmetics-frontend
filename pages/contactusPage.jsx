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
        <div className="w-full min-h-screen bg-primary ">

            <div className="text-center animate-[fadeInUp_0.5s_ease-out_both] px-[20px]"> {/* RESPONSIVE: px-[20px] */}
            <p className="text-lg md:text-xl pt-[20px]">We're here to help and answer any question you might have.We look forward to hearing from you</p> {/* RESPONSIVE: text-lg md:text-xl */}
        </div>
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[200px] items-center lg:items-start px-[20px] lg:px-0"> {/* RESPONSIVE: flex-col lg:flex-row, gap-[40px] lg:gap-[200px], items-center lg:items-start, px-[20px] lg:px-0 */}
            <div className="w-full max-w-[500px] lg:w-[600px] lg:h-[700px] ml-0 lg:ml-[30px] mt-[2px] flex flex-col p-[10px] animate-[fadeInLeft_1s_ease-out_0.2s_both] "> {/* RESPONSIVE: w-full max-w-[500px] lg:w-[600px], lg:h-[700px] (no fixed height on mobile), ml-0 lg:ml-[30px] */}
             
             <div className="w-full flex flex-col mt-[9px]"> {/* RESPONSIVE: w-full instead of fixed w-[500px] */}
             <label className="text-md">Full Name</label>
             <input type="text" 
              placeholder="Enter Your Name here"  
              className="w-full sm:w-[300px] h-[35px] border-[2px] border-accent rounded-xl  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none" 
              value={name}
              onChange={(
                (e)=>{
                    setName(e.target.value)
              })}
              />
             </div>
             {/* RESPONSIVE: input w-full sm:w-[300px] */}

             <div className="w-full flex flex-col mt-[9px] "> {/* RESPONSIVE: w-full */}
             <label className="text-md">Email Address</label>
             <input type="text" 
              placeholder="Enter Your Email here"  
              className="w-full sm:w-[300px] h-[35px] border-[2px] border-accent rounded-xl  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
              value={email}
              onChange={(
                (e)=>{
                 setEmail(e.target.value)
              })}
              />
             </div>
             {/* RESPONSIVE: input w-full sm:w-[300px] */}

              <div className="w-full flex flex-col mt-[9px] "> {/* RESPONSIVE: w-full */}
             <label className="text-md">Phone Number</label>
             <input type="text" 
              placeholder="Enter Your Phone Number here"
              className="w-full sm:w-[300px]  h-[35px] border-[2px]  border-accent rounded-xl  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
              value={phoneNumber} 
              onChange={(
                (e)=>{
                setPhoneNumber(e.target.value)
              })}/>
             </div>
             {/* RESPONSIVE: input w-full sm:w-[300px] */}
             
               <div className="w-full flex flex-col mt-[9px] "> {/* RESPONSIVE: w-full */}
             <label className="text-md">Message</label>
             <textarea type="text" 
              placeholder="Enter Your message here"  
              className="w-full h-[150px] border-[2px] border-black rounded-xl border-accent  transition-all duration-200 focus:scale-105 focus:shadow-md focus:outline-none"
                value={message}
              onChange={(e)=>{
                setMessage(e.target.value)
              }}> </textarea>
             </div>
             {/* RESPONSIVE: textarea w-full (was fixed w-[570px], overflowed on mobile) */}

             <div className="w-full mt-[20px] ml-0 sm:ml-[10px] flex justify-center sm:justify-start"> {/* RESPONSIVE: w-full, ml-0 sm:ml-[10px], flex justify-center sm:justify-start */}
                <button className="w-[130px] h-[40px] text-md bg-accent text-[#F2f2f2] font-bold rounded-xl cursor-pointer  hover:bg-white hover:text-accent border-[2px] border-accent  hover:scale-105 transition-all duration-200" onClick={sendmessage}>Send message</button>
             </div>

        
            </div>
            
  
         <div className="w-full max-w-[500px] lg:w-[350px] lg:h-[450px] mt-0 lg:mt-[30px] ml-0 lg:ml-[50px] bg-accent text-white rounded-2xl p-[25px] lg:p-[30px] flex flex-col justify-between animate-[fadeInRight_1s_ease-out_0.2s_both]"> {/* RESPONSIVE: w-full max-w-[500px] lg:w-[350px], lg:h-[450px], mt-0 lg:mt-[30px], ml-0 lg:ml-[50px], p-[25px] lg:p-[30px] */}
    
    <div>
        <h2 className="text-xl lg:text-2xl font-bold">Get in Touch</h2> {/* RESPONSIVE: text-xl lg:text-2xl */}
        <p className="text-sm mt-[10px] opacity-80">
            Have a question or need more information about our products? 
            Reach out to us using the details below.
        </p>
    </div>

    <div className="flex flex-col gap-[18px] lg:gap-[20px] mt-[15px] lg:mt-[10px] "> {/* RESPONSIVE: gap-[18px] lg:gap-[20px], mt-[15px] lg:mt-[10px] */}

        <div className="flex items-start gap-[12px]">
            <span className="text-lg">📍</span>
            <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm opacity-80">123, Negombo Road, Negombo</p>
            </div>
        </div>


        <a href="mailto:tsudhan110@gmail.com">
        <div className="flex items-start gap-[12px] transition-transform duration-200 hover:translate-x-1">
            <span className="text-lg">✉️</span>
            <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-80">tsudhan110@gmail.com</p>
            </div>
        </div>
        </a>

         <a href="tel:+944746691">
        <div className="flex items-start gap-[12px]  transition-transform duration-200 hover:translate-x-1">
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