import axios from "axios"
import { useEffect } from "react"
import Loader from "../../src/components/loader"
import { useState } from "react"

export default function ContactPageAdmin(){
    const [contacts,setContacts] = useState([])
    const[isLoading,setIsLoading] = useState(true)

   useEffect(()=>{
    if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/contact").then(
            (res)=>{
          setContacts(res.data)
          setIsLoading(false)
        })
    }
   },[isLoading]
)

    return(
        <div className=" w-full h-full border-[3px] p-10">
            {
                isLoading ? (<Loader/>)
                :(
            
            <table>
                <thead>
                    <tr>
                       
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Email</th>
                        <th className="border p-3">Phone Number</th>
                        <th className="border p-3">message</th>
                        <th className="border p-3">Date</th>
                        <th className="border p-3">Time</th>

                    </tr>
                </thead>

                <tbody>
                    {contacts.map((contact,index)=>{

                 return(
                    <tr key={index}>
                        <td className="border p-3">{contact.name}</td>
                        <td className="border p-3">{contact.email}</td>
                        <td className="border p-3">{contact.phoneNumber}</td>
                        <td className="border p-3">{contact.message}</td>
                        <td className="border p-3">{new Date(contact.date).toLocaleDateString("en-LK")}</td>
                        <td className="border p-3">{new Date(contact.date).toLocaleTimeString("en-LK", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZone: "Asia/Colombo"
                                })}</td>

                    </tr>
                    )
                       }
                    )
                    }
            
                </tbody>


            </table>
            )

          }
        </div>
    )
    
}