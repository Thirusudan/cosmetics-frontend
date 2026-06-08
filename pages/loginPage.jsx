import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const[email,setEmail] = useState("")  //1
    const[password,setPassword] =useState("") 
    const navigate = useNavigate() //3


    function login(){
        console.log(email,password)
        /*5*/ axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email : email,
            password:password
        }).then((response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token) //4


                toast.success("Login successful")
                if(response.data.role == "admin"){
                   // window.location.href ="/admin"
                   navigate("/admin")
                }else if(response.data.role == "user"){
                    //window.location.href="/"
                    navigate("/")
                }

        }).catch((error)=>{
            console.log(error)
            //alert("Login failed")
            toast.error("Login failed")
            
        })
    }

    return (
        <div className="w-full h-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex justify-center items-center">
         <div className="h-[500px] w-[500px] backdrop-blur-sm shadow-xl rounded-[30px] relative text-white flex flex-col items-center justify-center gap-[20px]">
        <h1 className="absolute top-[20px] text-2xl font-bold text-center my-5">Login</h1>
        <div className="w-[350px] flex flex-col">
            <span className="text-lg">Email</span>
          <input onChange={(e)=>{//1
             setEmail(e.target.value)
          }}
          
          type="text" className="w-[350px] h-[40px] border border-white rounded-xl"/>
        </div>

        <div className="w-[350px] flex flex-col">
            <span className="text-lg">Password</span>
          <input onChange={(e)=>{  //2
            setPassword(e.target.value)
            console.log("password is changed")
          }} 
          
          type="password" className="w-[350px] h-[40px] border border-white rounded-xl"/>
        </div>
       <button onClick={login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">Login</button>
       <p>Don't have an account? <Link to="/register" className="text-blue ">Sign up</Link> from here</p>
       
         </div>
        </div>
    );
    
};



//1 - const [email, setEmail] = useState("")-  email - current value of email input  setEmail = function to update email value this function runs when Login button is clicked it prints the current email and password values to console

//2 <input onChange={(e) => {
    //setEmail(e.target.value)-   e.target is the input element, e.target.value is the current text inside the input, setEmail updates the email state with the new typed value


    //// onClick fires when button is clicked, calls the login function defined above , login function then prints email and password to console


  //3 -  navigate = a function that moves user  to different page WITHOUT refreshing the browser!
  //useNavigate = React's smooth page changer — moves user to different pages without refreshing the browser! 


  //4 - after login success server sends back this token saved in browser
  //after login → token saved in browser next time user opens the app ,token is still there!,user stays logged in! ,no need to login again!

  //5 - axios.post - to match frontend and backend and send http request  
//but there is a problem when we send request it doesn't accpet because it block the request then we need to install npm install cors in backend not frontend when we install cors then wqe can send only authrized person only and then we have to mention the port number also

//6 - react hot toast - when we give the email addres and password we enter the code login suucessfull and login failed and it is very old method then we will install this code 