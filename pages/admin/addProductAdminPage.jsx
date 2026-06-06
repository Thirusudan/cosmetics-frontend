import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../src/utils/mediaUpload";


export default function AddProductPage(){
    const[productId,setProductId]= useState("")  //1
    const[productName,setProductName]= useState("")
    const[alternativeNames,setAlternativeNames]= useState("")
    const[labelledPrice,setLabelledPrice]= useState("")
    const[price,setPrice]= useState("")
    const[images,setImages]= useState([])
    const[description,setDescription]= useState("")
    const[stock,setStock]= useState("")
    const[isAvailable,setIsAvailable]= useState(true)
    const[category,setCategory]= useState("")
    const navigate = useNavigate()

    /*2*/ async function handleSubmit(){

    /*5*/    const promisesArray =[]

         for(let i=0; i<images.length; i++){

            const promise = uploadFile(images[i])
            promisesArray[i] = promise
         }

         const responses = await Promise.all(promisesArray)
         console.log(responses)


        const altNamesInarray = alternativeNames.split(",")
            const productData ={
                productId : productId,
                name : productName,
                altNames   : altNamesInarray,
                labelledPrice : labelledPrice,
                price : price,
                images : responses,
                description : description,
                stock : stock,
                isAvailable : isAvailable,
                category : category
            }
         /*3*/  const token = localStorage.getItem("token");

           if(token == null ){
            window.location.href = "/login"
            return;
           }

         /*4*/  axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products" , productData,
            {
                headers:{
                    Authorization : "Bearer "+token
                }
            }
        ).then(
            (res)=>{
                console.log("Product added successfully")
                console.log(res.data);
                toast.success("Product added successfullly")
                navigate("/admin/products")

        }).catch(
            (error)=>{
                console.error("Error adding Product:",error)
                toast.error("Failed to add Product")
        })
        console.log(productData)
    }

    return(
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[600px] border-[3px] rounded-[15px] flex flex-wrap justify-between p-[40px]">
        <div className="w-[200px] flex flex-col gap-[5px]">
            <label className="text-sm font-semibold">Product Id</label>
            <input type="text"  
            /* 1*/ value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="h-[40px]  border-[1px] rounded-md"/>
        </div>
           
           <div className="w-[300px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Product Name</label>
					<input
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[500px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Alternative Names</label>
					<input
						type="text"
						value={alternativeNames}
						onChange={(e) => setAlternativeNames(e.target.value)}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[200px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Labelled Price</label>
					<input
						type="number"
						value={labelledPrice}
						onChange={(e) => setLabelledPrice(e.target.value)}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[200px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Price</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[500px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Images</label>
					<input
                        multiple
						type="file"
						onChange={(e)=>{
                            setImages(e.target.files)
                        }}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[500px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border-[1px] h-[100px] rounded-md"
					></textarea>
				</div>
				<div className="w-[200px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Stock</label>
					<input
						type="number"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						className="w-full border-[1px] h-[40px] rounded-md"
					/>
				</div>
				<div className="w-[200px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Is Available</label>
					<select
						value={isAvailable}
						onChange={(e) => {
							setIsAvailable(e.target.value === "true");
						}}
						className="w-full border-[1px] h-[40px] rounded-md"
					>
						<option value={true}>Available</option>
						<option value={false}>Not Available</option>
					</select>
				</div>
				<div className="w-[200px] flex flex-col gap-[5px]">
					<label className="text-sm font-semibold">Category</label>
					<select
						value={category}
						onChange={(e) => {
							setCategory(e.target.value);
						}}
						className="w-full border-[1px] h-[40px] rounded-md"
					>
						<option value="cream">Cream</option>
						<option value="face wash">Face Wash</option>
						<option value="soap">Soap</option>
						<option value="fragrance">Fragrance</option>
					</select>
				</div>


        <div className="w-full  flex justify-center flex-row py-[20px]">
        <Link to={"/admin/products"} className="w-[200px] h-[50px] bg-white text-black border-[2px] rounded-md flex justify-center items-center">Cancel</Link>
        <button onClick={handleSubmit} className="w-[200px] h-[50px] bg-black text-white border-[2px] rounded-md flex justify-center items-center ml-[20px]">Add Products</button>
        </div>

          </div>
        </div>
    )
}



//1 - onChange={(e)=>{setProductId(e.target.value)}} -in this input panel when change any thing it will update to in that productId in that use state function - const[productId,setProductId]= useState("") 
//value={productId} - when update it will show the productId


//const [productId, setProductId] = useState("")
//     👆          👆              👆
//   stores      updates        starts as
//   the value   the value      empty string ""

//<input 
 //   type="text"
 //   onChange={(e) => { setProductId(e.target.value) }}
//  👆         👆           👆            👆
//  fires      e =        updates      gets the
//  every time event      productId    typed value
//  user types object     state
///>

// productId    = current value (what user typed)
// setProductId = function to update productId
// useState("") = starts empty when page loads

// user types "L"
//e.target.value = "L"
//setProductId("L")
//productId = "L"

// user types "I"
//e.target.value = "LI"
//setProductId("LI")
//productId = "LI"

/*Page loads
    ↓
productId = ""  (empty)

User types "LIP01" in input
    ↓
onChange fires every letter
    ↓
e.target.value = "LIP01"
    ↓
setProductId("LIP01")
    ↓
productId = "LIP01"  ✅
    ↓
now you can use productId anywhere!
example:
fetch("/products/" + productId)
fetch("/products/LIP01")*/


//2 -function handleSubmit(){
 // const altNamesInarray = alternativeNames.split(",")-convert alternative names string → array
//      const productData =collect ALL form data into ONE object,productData = ONE package with all product info ready to send to backend!

//3 - get token from browser storage token was saved when user logged in, needed to prove user is admin!


//4 - send data to backend
//import.meta.env.VITE_BACKEND_URL + "/api/products",
// 👆 backend URL from .env file
// example: "http://localhost:5000/api/products"

//headers:{
//                Authorization: "Bearer " + token
                // 👆 send token to prove admin!
                // backend checks this in index.js middleware



/*Add product button function - User fills form → clicks "Add Products"
         ↓
handleSubmit() runs
         ↓
STEP 1 — split altNames → array
         ↓
STEP 2 — package all data → productData
         ↓
STEP 3 — get token from localStorage
         ↓
STEP 4 — token exists?
    ↓ NO              ↓ YES
redirect to       continue to
login page!       axios.post
                      ↓
              STEP 5 — send to backend
              with token in header
                      ↓
            ┌─────────┴─────────┐
          SUCCESS            FAILED
            ↓                   ↓
    toast.success         toast.error
    navigate to           stay on page
    products page!        show error!*/



     /* 5 -   const promisesArray = []
     promisesArray = []  ← empty box
     will collect all upload promises here!

    for(let i = 0; i < images.length; i++){
         👆          👆
         i starts 0   runs until all images done

     images.length = 3
     so loop runs 3 times!

     i=0 first run
     i=1 second run
     i=2 third run       

        const promise = uploadFile(images[i])
               👆                    👆
             not URL yet!         images[0] = file1
             just a promise       images[1] = file2
          "still uploading!"   images[2] = file3

        promisesArray[i] = promise
             i=0 → promisesArray[0] = promise of file1
             i=1 → promisesArray[1] = promise of file2
             i=2 → promisesArray[2] = promise of file3
    }

         after loop:
         promisesArray = [promise1, promise2, promise3]
                          👆         👆         👆
                       uploading  uploading  uploading
                          (all at same time!)


const responses = await Promise.all(promisesArray)
        👆          👆         👆
      stores      wait!    run all promises
      all URLs   don't     at same time!
                 continue
                 until all done!

     responses = [URL1, URL2, URL3]
     [
       "https://...supabase.co/.../1780-file1.jpg",
       "https://...supabase.co/.../1781-file2.jpg",
       "https://...supabase.co/.../1782-file3.jpg"
     ]

    console.log(responses)
     prints all 3 URLs in console! ✅ */



     
    /*defination for the loop function User selects 3 images
setImages([file1, file2, file3])
            ↓
clicks Add Products
            ↓
async handleSubmit() runs
            ↓
promisesArray = []  ← empty
            ↓
LOOP 3 times:
i=0 → uploadFile(file1) → promise1 → promisesArray[0]
i=1 → uploadFile(file2) → promise2 → promisesArray[1]
i=2 → uploadFile(file3) → promise3 → promisesArray[2]
            ↓
Promise.all → all 3 upload at SAME TIME!
await → wait until ALL done!
            ↓
responses = [URL1, URL2, URL3]
            ↓
productData.images = responses ✅
            ↓
axios.post → send to backend
            ↓
       ┌────┴────┐
    SUCCESS    FAILED
       ↓          ↓
  toast ✅    toast ❌
  navigate    stay on page */