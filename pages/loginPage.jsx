import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage(){
    const[email,setEmail] = useState("")  //1
    const[password,setPassword] =useState("") 
    const navigate = useNavigate() //3
/*8*/    const googleLogin = useGoogleLogin({onSuccess:(response)=>{
/*9*/           axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google-login",{
/*9*/            token : response.access_token 
            }).then(
                (response)=>{
               console.log(response.data)
               localStorage.setItem("token", response.data.token)
               toast.success("Login successfull")
               if(response.data.role == "admin"){
                navigate("/admin")
               }else if(response.data.role == "user"){
                navigate("/")
               }
            }).catch((error)=>{
              toast.error("Google Login failed")
            })
            console.log(response)
    }})


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

{/*7*/}     <button onClick={googleLogin} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">Google Login</button>

       <p>Don't have an account? <Link to="/register" className="text-blue ">Sign up</Link> from here</p>
       <p>Forget Password? <Link to="/forget" className="text-blue ">reset password</Link> from here</p>
       
         </div>
        </div>
    );
    
};


/*
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

GOOGLE LOGIN PART 

7 -Step 1 — A person clicks the "Google Login" button Could be anyone: an existing regular user, an existing admin, or someone who has never signed up before. The button doesn't know or care yet — it just starts the Google sign-in process.

8- Step 2 — Google's popup opens, person signs in with their Google account- useGoogleLogin opens Google's own popup window. The person picks their Google account and confirms. Once Google confirms, onSuccess runs automatically, and response.access_token (Google's own proof-token) becomes available.

9- Step 3 — Frontend sends that Google token to the backend - This is just the sending + receiving part — send the Google token, wait for the backend's response, then save the app's own token and redirect based on whatever role the backend sends back. The actual decision-making happens on the backend, in the next steps.

Frontend sends:  { token: response.access_token }
                          ↓
Backend receives: req.body.token
                          ↓
Backend stores it as: const googleToken = req.body.token

step 4,5,6,7,8,9 is in backend

10 - receiving that response run.then


FULL DIAGRAM OF GOOGLE LOGIN

Person clicks "Google Login"
──────────────────────────────
<button onClick={googleLogin}>Google Login</button>
        ↓

Google popup → person signs in → access_token received
──────────────────────────────
const googleLogin = useGoogleLogin({onSuccess:(response)=>{
    // response.access_token is now available here
        ↓

Frontend sends access_token to backend
──────────────────────────────
axios.post(".../api/users/google-login", {
    token: response.access_token
})
        ↓

Backend asks Google: "whose token is this?" → gets email, name, picture
──────────────────────────────
const googleToken = req.body.token
const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
    headers : { Authorization : `Bearer ${googleToken}` }
})
        ↓

Backend checks MongoDB for that email
──────────────────────────────
const user = await User.findOne({ email: response.data.email })
        ↓
   ┌───────────────────────────┴───────────────────────────┐

Email EXISTS                                    Email does NOT exist
→ log in using EXISTING role                    → create NEW account, role = "user" always
   (could be admin or user)
──────────────────────────────                  ──────────────────────────────
if(user != null){                                else {
    const token = jwt.sign({                         const newUser = new User({
        email: user.email,                                email: response.data.email,
        role: user.role,   ← EXISTING role                role: "user",   ← ALWAYS "user"
        ...                                                ...
    }, process.env.JWT_SECRET)                        })
                                                       await newUser.save();
    res.json({                                        const token = jwt.sign({...})
        token: token,
        message: "Login succesfull",                  res.json({
        role: user.role,                                  token: token,
    })                                                     message: "User created successfully",
}                                                          role: newUser.role,
                                                       })
                                                  }
   ↓                                                    ↓
        Both generate a JWT token, send { token, message, role } back

Frontend saves token, shows toast, redirects to /admin or / based on role
──────────────────────────────
localStorage.setItem("token", response.data.token)
toast.success("Login successfull")
if(response.data.role == "admin"){
    navigate("/admin")
}else if(response.data.role == "user"){
    navigate("/")
}

FULL PARAGRAPE DEFINATION FOR GOOGLE LOGIN

First, the person clicks the "Google Login" button, which runs googleLogin, opening Google's own sign-in popup. Once the person signs into their Google account and confirms, Google's onSuccess callback runs automatically, giving access to response.access_token — Google's own proof-token showing this person really did sign in.
Then axios.post("/api/users/google-login", { token: response.access_token }) sends that token to the backend.
On the backend, req.body.token reads that value into googleToken. Then axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {...}) sends googleToken to Google's own server, asking "who does this token belong to?" Google replies with the person's real email, first name, last name, and profile picture.
Next, User.findOne({ email: response.data.email }) checks MongoDB for that email. If the user is found (user != null), the backend logs them in using their EXISTING data — including their real role, which could be "admin" or "user" — and generates a JWT token with jwt.sign(...). If the user is NOT found, the backend creates a brand new account instead: new User({...}) using Google's info for name and picture, role is always hardcoded to "user" (never "admin"), isEmailVerified is set to true since Google already verified it, and a placeholder password of "123" is used since Google users never need a real password. After saving with newUser.save(), it also generates a JWT token the same way.
Either way, the backend finishes with res.json({ token, message, role }), sending the new JWT token, a success message, and the role back to the frontend.
Back on the frontend, .then((response)=>{...}) runs. localStorage.setItem("token", response.data.token) saves the new token in the browser, so the person stays logged in. toast.success("Login successfull") shows a green success message. Then it checks response.data.role — if "admin", navigate("/admin") sends them to the admin dashboard; if "user", navigate("/") sends them to the homepage.
If anything fails anywhere along this chain — invalid token, Google's servers down, database error — the backend's own catch block sends back a 500 error, and the frontend's .catch((error)=>{...}) runs instead, showing toast.error("Google Login failed") — no token gets saved, no redirect happens.


*/