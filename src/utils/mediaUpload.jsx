const url ="https://xjypnqgfjupbfjxnqrvm.supabase.co"   //1

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqeXBucWdmanVwYmZqeG5xcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTMwMjEsImV4cCI6MjA5NjIyOTAyMX0.OsbowJ9cRjm3Uw21XTaXcK8Z4K50N-tpcUx0uVrElII"   //2
import { createClient } from "@supabase/supabase-js";  //3
import { cache } from "react";
import toast from "react-hot-toast";

const supabsase = createClient(url,key)   //4

export default function uploadFile(file){
    const promise = new Promise(
        (resolve,reject)=>{
        if(file== null){
            reject("Please select a file to upload")
            return
        }

     /*5*/   const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name
        
        /*6*/ supabsase.storage.from("images").upload(fileName,file,{
            cacheControl : '3600',
            upsert : false

        }).then(()=>{
    /*7*/  const publicUrl = supabsase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
             resolve(publicUrl)
        }).catch(
        (error)=>{
            reject(error)
       })

    })
       return promise;
}



//1- supabase project URL
//2 - anon public key
//3 -  import supabase library
//4 - reates connection to supabase project like mongoose.connect() but for supabase!

/*5 - const timeStamp = new Date().getTime()
                👆
          new Date() = gets current date and time
          .getTime() = converts to milliseconds number
          example → 1780730574099
          every millisecond = different number!
          so every upload = unique number! 


 const fileName = timeStamp + "-" + file.name
//               👆            👆    👆
//          the number    joining  original file name
//          1780730574099  "-"    "myimage.jpg"
//          result → "1780730574099-myimage.jpg"
(it means we can upload same image mulitiple times when we save the image the time also will save timeStamp makes every filename unique → fileName)


//6 - from("images") = bucket name in supabas , like a folder where files are stored!
//.upload(file.name, - file name  actual file
//cacheControl: '3600'- browser caches file for 3600 seconds = 1 hour
//upsert: false -false = don't overwrite if same name exists,   true  = overwrite if same name exists

//7- gets the link to access the uploaded file! and then send URL back to whoever called uploadFile!


/*mediaUpload.jsx          testPage.jsx
───────────────          ─────────────
resolve(publicUrl)  →→→  .then((url))
      👆                       👆
 sends this URL         receives same URL!
 "https://..."          url = "https://..."   */


 /*media upload defination - User selects file
      ↓
onChange → setFile(e.target.files[0])
      ↓
file saved in useState

User clicks Upload
      ↓
handleUpload() runs
      ↓
uploadFile(file) called
      ↓
timeStamp = 1780730574099
fileName  = "1780730574099-myimage.jpg"
      ↓
supabase.storage.upload(fileName, file)
      ↓
    ┌───┴───┐
 success  failed
    ↓        ↓
resolve    reject
(publicUrl) (error)
    ↓        ↓
 .then()  .catch()
 console   toast
 .log(url) .error()*/
