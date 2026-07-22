import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast"

export default function ForgetPasswordPage(){
    const[emailSent,setEmailSent] = useState(false)
    const[email,setEmail] = useState("")
    const[otp,setOtp] = useState("");
    const[newPassword,setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

  async function sendOTP(){
     try{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp", { email:email });
        toast.success("OTP send successfully")
        setEmailSent(true)
     }catch{
      toast.error("Failed to send OTP")
     }
    }

    async function resetPassword(){
        if(newPassword!== confirmPassword){
            toast.error("Passowrd do not match")
            return
        }
        try{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/reset-password",{
            email:email,
            otp:otp,
            newPassword :newPassword
        })
        toast.success("Password reset sucessfully")
        }catch{
            toast.error("Failed to reset password")
        }
    }


    return(
    <div className="w-full h-full flex justify-center items-center text-secondary">
     {!emailSent && <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <input type="email"
        placeholder="Enter you Email"
        className="w-[350px h-[40px] border-white rounded-xl text-center"
        onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <button onClick={sendOTP} className="w-[350px] h-[40px] bg-accent rounded-xl text-white text-lg mt-5 hover:bg-white hover:text-accent  border-[3px] border-accent cursor-pointer">
            Send Otp
        </button>
      </div>
      }

      {
                emailSent&& <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]">
                    <h1 className="text-2xl font-bold">Verify OTP</h1>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={resetPassword} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                        Reset Password
                    </button>
                </div>
            }

    </div>
    )
}

/*


Part 1 — Sending the OTP
1st we have to some steps in google accounts 

STEP 1 — User types their email
<input onChange={(e)=>{
    setEmail(e.target.value)
}}/>

Real example, typing "user@gmail.com" letter by letter:
User types "u"  → onChange fires → setEmail("u")             → email = "u"
User types "s"  → onChange fires → setEmail("us")            → email = "us"
User types "e"  → onChange fires → setEmail("use")           → email = "use"
   ... continues ...
Finally          → email = "user@gmail.com"

Each keystroke fires onChange again, and e.target.value always holds the FULL current text in the
box (not just the new letter) — so setEmail keeps replacing email with the complete, up-to-date
string every time, until it settles on "user@gmail.com".

STEP 2 — User clicks "Send Otp" → sendOTP function runs
async function sendOTP(){
    try{
        await axios.post(".../api/users/send-otp", { email: email });   ← email = "user@gmail.com"
        toast.success("OTP send successfully")
        setEmailSent(true)
    }catch{
        toast.error("Failed to send OTP")
    }
}
Since email was kept up-to-date on every keystroke, by the time the button is clicked, it already
holds "user@gmail.com" — this is what gets sent to the backend. If successful, setEmailSent(true)
switches emailSent from false to true, which makes {emailSent && (...)} render the OTP+password
screen instead of the email screen.

──────────────────────────────────────────

STEP 3 — Backend receives the email
export async function sendOTP(req,res){
    const email = req.body.email             ← email = "user@gmail.com"
    const otpCode = Math.floor(100000 + Math.random() * 900000);   ← example: otpCode = 719205

Note: this function does NOT check if "user@gmail.com" belongs to a real registered user — it will
generate and send an OTP to ANY email typed in, even one that was never signed up.

STEP 4 — Backend clears out any old OTPs for this email first
await OTP.deleteMany({email:"user@gmail.com"})
Deletes any OTP previously saved for this email — so only the newest code stays valid.

STEP 5 — Backend saves the new OTP in the database
const newOTP = new OTP({email:"user@gmail.com", otp:719205});
await newOTP.save();
Database now has exactly one record: { email: "user@gmail.com", otp: 719205 }

STEP 6 — Backend emails the code
text : `your OTP CODE IS 719205`
transporter.sendMail(...) actually sends this email to user@gmail.com's inbox.

STEP 7 — Frontend receives the response
toast.success("OTP send successfully")
setEmailSent(true)   ← screen switches to OTP + password fields


Part 2 — Verifying the OTP and resetting the password


STEP 8 — User checks their inbox, sees "719205", types it into the OTP field
<input onChange={(e) => setOtp(e.target.value)} />

Real example:
User types "7"       → setOtp("7")
User types "1"       → setOtp("71")
User types "9"       → setOtp("719")
   ... continues ...
Finally               → otp = "719205"   (still a STRING at this point, since it came from an input)

User also types a new password and confirms it:
<input type="password" onChange={(e) => setNewPassword(e.target.value)} />     ← newPassword = "MyNewPass123"
<input type="password" onChange={(e) => setConfirmPassword(e.target.value)} /> ← confirmPassword = "MyNewPass123"

STEP 9 — User clicks "Reset Password" → resetPassword checks passwords match FIRST
async function resetPassword(){
    if(newPassword !== confirmPassword){          ← "MyNewPass123" !== "MyNewPass123" → false, they match
        toast.error("Passowrd do not match")
        return
    }
Since they match, it continues (if they DIDN'T match, it would stop right here — backend never contacted).

STEP 10 — Send everything to the backend
await axios.post(".../api/users/reset-password",{
    email: "user@gmail.com",
    otp: "719205",
    newPassword: "MyNewPass123"
})

──────────────────────────────────────────

STEP 11 — Backend receives the data
const email = req.body.email;              ← "user@gmail.com"
const newPassword = req.body.newPassword;  ← "MyNewPass123"
const otp = Number(req.body.otp);          ← converts "719205" (string) into 719205 (number),
                                               since it was SAVED as a number in sendOTP — this
                                               conversion is necessary or the comparison would fail

STEP 12 — Backend checks if this OTP matches what's currently stored
const otpRecord = await OTP.findOne({ email: "user@gmail.com", otp: 719205 });
if(!otpRecord){
    return res.status(404).json({ message: "Invalid OTP" });
}
Since { email: "user@gmail.com", otp: 719205 } really was saved in STEP 5, this FINDS a match.
otpRecord is NOT null → check passes, code continues.

(THE DOUBT, explained here): this isn't comparing "old OTP vs new OTP" — it's simply checking
"does a record with THIS EXACT email+code combination exist right now?" Since deleteMany always
wipes out any earlier OTP whenever a new one is requested, there's only ever ONE valid OTP saved
per email at any given moment. If the user had typed an OLDER code from a previous request (one
that got deleted when a newer OTP was generated), findOne would find NOTHING, and it would
correctly show "Invalid OTP" — not because it's "comparing" old vs new, but because the old one
simply doesn't exist in the database anymore.

STEP 13 — Backend checks the user actually exists
const user = await User.findOne({ email: "user@gmail.com" });
if(!user){
    return res.status(404).json({ message: "User not found" });
}
(THE DOUBT, resolved here): since sendOTP in STEP 3 never checked if "user@gmail.com" was a real
registered account, it's technically possible for someone to type in a completely unregistered
email, still receive a valid OTP in STEP 6, and correctly pass the OTP check in STEP 12 — but they
would fail HERE instead, at STEP 13, once the backend finally checks whether an actual user account
exists for that email. So "User not found" only ever appears at THIS later point — never when the
OTP was originally sent.

STEP 14 — Backend hashes the new password and updates it
const hashedPassword = bcrypt.hashSync("MyNewPass123", 10);   ← e.g. "$2b$10$eImA8Xz9k2..."
await User.updateOne({ email: "user@gmail.com" }, { password: hashedPassword });
Same hashing technique as signup — the plain password "MyNewPass123" is never stored directly,
only its hashed version.

STEP 15 — Backend deletes the used OTP
await OTP.deleteMany({ email: "user@gmail.com" });
Removes 719205 now that it's been used, so it can never be reused again for another reset attempt.

STEP 16 — Backend sends success response
res.json({ message: "Password reset successfully" });

──────────────────────────────────────────

STEP 17 — Frontend receives the response
toast.success("Password reset sucessfully")
Shows the success message. Unlike login, there's no token/redirect here — the user must now go
log in separately using their new password "MyNewPass123".
*/