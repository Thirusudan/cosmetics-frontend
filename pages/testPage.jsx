
import { useState } from "react"

import toast from "react-hot-toast";
import uploadFile from "../src/utils/mediaUpload";


export default function TestPage(){
    const[file,setFile] = useState(null);

    function handleUpload(){
      uploadFile(file).then(
        (url)=>{
            console.log(url)
            toast.success("File upload successfully")
            
      }).catch(
        (error)=>{
            console.error("Error uploading file:",error);
            toast.error(error)
      })
    }

    
    return(
       <div>
       <input type="file" onChange={
        (e)=>{
         setFile(e.target.files[0])
       }}/>
       <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
        Upload
       </button>
       </div>
    )
}