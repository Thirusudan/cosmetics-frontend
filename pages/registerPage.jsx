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

  
     function register(){
        try{
      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users",{
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
         <div className="w-[900px] h-[850px] bg-[url('/register1.jpg')] bg-cover bg-center flex justify-center items-center rounded-[35px] ">
         <div>
        <div className="w-[500px] h-[600px] bg-white/65 backdrop-blur-[3px] shadow-xl rounded-[30px] relative gap-[20px] text-secondary flex flex-col justify-center items-center">
            <h1 className="text-3xl top-[20px] text-center w-full h-[50px] font-bold text-black textg">Register Page</h1>
            <div className="w-[350px] flex flex-col">
                <span className="text-2xl  text-secondary">First Name</span>
                <input onChange={(e)=>{
                    setFirstName(e.target.value)
                }} type="text"
                placeholder="Enter your first name "
                className="w-[350px] h-[40px] border text-secondary rounded-xl text-secondary" />
            </div>

            <div className="w-[350px] flex flex-col pt-[20px]">
                <span className="text-2xl text-secondary">Last Name</span>
                <input onChange={(e)=>{
                   setLastName(e.target.value)
                }} type="text"
                placeholder="Enter your last name "
                className="w-[350px] h-[40px] border text-secondary rounded-xl text-secondary" />
            </div>

            <div className="w-[350px] flex flex-col pt-[20px]">
                <span className="text-2xl  text-secondary">Email</span>
                <input onChange={(e)=>{
                  setEmail(e.target.value)
                }} type="email"
                placeholder="Enter your your Email "
                className="w-[350px] h-[40px] border text-secondary rounded-xl text-secondary" />
            </div>

            <div className="w-[350px] flex flex-col pt-[20px]">
                <span className="text-2xl text-secondary">password</span>
                <input onChange={(e)=>{
                  setPassword(e.target.value)
                }} type="password"
                placeholder="Enter your password "
                className="w-[350px] h-[40px] border text-secondary rounded-xl text-secondary" />
            </div>

            <button className="w-[200px] h-[40px] bg-accent  rounded-xl text-white mt-[20px] hover:bg-white hover:text-accent border-[2px] border-accent cursor-pointer text-2xl "onClick={register}>
             Register
            </button>


            </div>
            
        
         </div>
         </div>
         
        </div>
    )
}