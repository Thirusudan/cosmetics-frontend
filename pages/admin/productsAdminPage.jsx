import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";


export default function ProductsAdminPage(){

    const [products,setProducts] = useState([])
    const[a,setA] = useState(0)
    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res)=>{
        setProducts(res.data)
        })
        },
        [a]
    )

const navigate = useNavigate()

return(
<div className="w-full h-full border-[3px] ">

   <table>

     <thead>
         <tr>
            <th className="p-[10px]">Images</th>
            <th className="p-[10px]">Product Id</th>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Price</th>
            <th className="p-[10px]">Labelled Price</th>
            <th className="p-[10px]">Category</th> 
            <th className="p-[10px]">Stock</th>
            <th className="p-[10px]">Action</th>
          
         </tr>
      </thead>

        <tbody>
          {
             products.map(
                (product,index)=>{
                    return (
                    <tr key={index}>
                        <td>
                            <img src={product.images[0]} alt={product.name} className="w-[50px]  h-[50px]"/> 
                        </td>
                        <td className="p-[10px]">{product.productId}</td>
                        <td className="p-[10px]">{product.name}</td>
                        <td className="p-[10px]">{product.price}</td>
                        <td className="p-[10px]">{product.labelledPrice}</td>
                        <td className="p-[10px]">{product.category}</td>
                        <td className="p-[10px]">{product.stock}</td>
                        <td className="p-[10px] flex flex-row justify-center items-center" >
                             <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer" onClick={
                                 ()=>{
                                    const token = localStorage.getItem("token");
                                    if(token==null){
                                    navigate("/login")
                                    return;
                                    }

                        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product.productId,  {
                    headers:{
                    Authorization : "Bearer "+token
                            }}
                    ).then((res)=>{
                    console.log("Product deleted successfully")
                    toast.success("Product delete successfullly")
                    setA(a+1)     
            
                    }).catch(
                    (error)=>{
                    console.error("Error delete Product:",error)
                    toast.error("Failed to delete Product")
                    })
                        }}/>
                
       
                
                    <BiEdit onClick={()=>{
                        navigate("/admin/updateProduct",
                            {
                               state  : product
                            }
                        )
                    }} className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]"/>
                     </td>
                         
                    </tr>
                    )
                })
               }
        </tbody>

           </table>

            <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-black rounded-full shadow-2xl ">
                <BiPlus className="text-3xl"/>
                
            </Link>
        </div>
    )
}


//index →it is a  temporary key word it is the position number,if 1st image upload 0 and 2 nd it will be 1, React needs a unique identifier for every item but we can add the productId as a unique key but some time can send without prodcut key so that time the index will unique key and the thing is it is only for when we 1st created front end when we create backend we can change the product as a unique key


// <img src={product.images[0]} alt={product.name} /> - images will save in array and starts from 0 


/*useEffect  (  ()=>{  ...code...  }  ,  []  )
  👆             👆                      👆
 the tool   WHAT to run           WHEN to run
 from React  (the function)       (only on load)

useEffect(()=>{
          👆
   this is a CALLBACK FUNCTION!
   = the code you want to run!
   everything inside {} will execute!


[]  - runs ONLY when page loads fresh!
page load → runs 
refresh → runs 
navigate here → runs 

user types → NOT run 
click → NOT run 
setProducts → NOT run  


WITHOUT useEffect []
─────────────────────
user types    → runs ❌
page loads    → runs ❌
anything changes → runs ❌
setProducts   → runs ❌
INFINITE LOOP! 😵


WITH useEffect []
─────────────────────
page loads    → runs ONCE ✅
user types    → NOT run ✅
anything changes → NOT run ✅
setProducts   → NOT run ✅
STOPS! peaceful! 😊 


Admin adds new product
        ↓
clicks "Add Products" button
        ↓
axios.post → saves to MongoDB ✅
        ↓
navigate("/admin/products")
← this moves to products page!
        ↓
products page LOADS FRESH!
= same as refresh!
        ↓
useEffect RUNS! ✅
        ↓
axios.get → fetch ALL products
including NEW product! ✅
        ↓
new product shows in table! ✅*/