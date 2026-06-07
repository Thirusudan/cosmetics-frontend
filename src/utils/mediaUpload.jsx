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
    /*7*/  const publicUrl = supabsase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
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
//                         
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





 

 
 /*image uploaad full fucntions details

 addProductAdminPage.jsx          mediaUpload.jsx
════════════════════             ════════════════════

0 — user selects images in input
    <input multiple type="file"
    onChange={(e)=>{
        setImages(e.target.files)
    }}
    // e.target.files = all selected files
    // multiple = allows selecting 3 or more files!
    // setImages saves all files to useState!
         ↓
1 — images state
    [file1, file2, file3]
         ↓
2 — for loop starts
    i=0 → i=1 → i=2
         ↓
3 — uploadFile(images[i]) ──────→ 4 — timeStamp + fileName
                                       "1780099-file1.jpg"
                                            ↓
                                  5 — supabase.upload(fileName)
                                       saved to bucket! ✅
                                            ↓
                                  6 — .then() success
                                       getPublicUrl(fileName)
                                            ↓
                                  7 — resolve(publicUrl)
                                       URL ready to send back!
                                            ↓
                                  8 — .catch() if failed
                                       reject(error)
                                            ↓
                          ←────── 9 — return promise → URL back!

10 — promisesArray[i] = promise
      stores each promise!
         ↓
11 — Promise.all
      all 3 upload same time!
         ↓
12 — await
      wait until ALL done!
         ↓
13 — responses
      [URL1, URL2, URL3]
         ↓
14 — productData.images = responses
         ↓
15 — axios.post → MongoDB ✅
         ↓
    ┌────┴────┐
16-then    16-catch
success!   failed!*/
