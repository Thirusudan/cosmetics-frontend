import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export default function RegisterPage(){

const[firstName ,setFirstName ] = useState("")
const[lastName , setLastName] = useState("")
const[email,setEmail] = useState("")
const[password, setPassword] = useState("")
const navigate = useNavigate()

  
  async function register(){

    if (!firstName || !lastName || !email || !password) {
        toast.error("Please fill all fields");
        return;
    }
        try{
   await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users",{
    firstName : firstName,
    lastName : lastName,
    email : email,
    password : password
        
      }
    )
    toast.success("User Register Succesully")
    navigate("/login")

}catch{
     toast.error("User Register failed")
     }
    
      }
    

    return(
        <div className="w-full h-full flex justify-center items-center ">
         <div className="w-[900px] h-[600px] bg-[url('/home.jpg')] bg-cover bg-center flex justify-center items-center rounded-[35px] animate-[fadeInUp_0.7s_ease-out_both]">
         <div>
        <div className="w-[500px] h-[500px] bg-white/55 backdrop-blur-[3px] shadow-xl rounded-[30px] relative gap-[10px] text-secondary flex flex-col justify-center items-center">
            <h1 className="text-2xl top-[10px] text-center w-full h-[50px] font-bold text-black animate-[fadeInUp_0.5s_ease-out_0.3s_both]">Register Page</h1>
            <div className="w-[350px] flex flex-col animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
                <span className="text-lg  text-secondary">First Name</span>
                <input onChange={(e)=>{
                    setFirstName(e.target.value)
                }} type="text"
                placeholder="Enter your first name "
                className="w-[350px] h-[37px] border px-4 border-2 rounded-full focus:border-accent outline-none bg-transparent  duration-300  hover:scale-105 transition-all duration-200 " />
            </div>

            <div className="w-[350px] flex flex-col animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
                <span className="text-lg text-secondary">Last Name</span>
                <input onChange={(e)=>{
                   setLastName(e.target.value)
                }} type="text"
                placeholder="Enter your last name "
                className="w-[350px] h-[37px] border px-4 border-2 rounded-full focus:border-accent outline-none bg-transparent hover:scale-105 transition-all duration-200 " />
            </div>

            <div className="w-[350px] flex flex-col animate-[fadeInUp_0.5s_ease-out_0.6s_both]">
                <span className="text-lg  text-secondary">Email</span>
                <input onChange={(e)=>{
                  setEmail(e.target.value)
                }} type="email"
                placeholder="Enter your your Email "
                className="w-[350px] h-[37px] border px-4 border-2 rounded-full focus:border-accent outline-none bg-transparent  hover:scale-105 transition-all duration-200 " />
            </div>

            <div className="w-[350px] flex flex-col animate-[fadeInUp_0.5s_ease-out_0.7s_both]">
                <span className="text-lg text-secondary">password</span>
                <input onChange={(e)=>{
                  setPassword(e.target.value)
                }} type="password"
                placeholder="Enter your password "
                className="w-[350px] h-[37px] border px-4 border-2 rounded-full focus:border-accent outline-none bg-transparent hover:scale-105 transition-all duration-200 " />
            </div>

            <button className="w-[350px] h-[37px] bg-accent text-white text-lg font-semibold tracking-wide rounded-full shadow-lg mt-5 hover:bg-white hover:text-accent hover:shadow-md  cursor-pointer text-xl  hover:scale-105 border-2 transition-all duration-300 cursor-pointer text-xl animate-[fadeInUp_0.5s_ease-out_0.8s_both]"onClick={register}>
             Register
            </button>


            </div>
            
        
         </div>
         </div>
         
        </div>
    )
}