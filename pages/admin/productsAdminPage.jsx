import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";


export default function ProductsAdminPage(){

/*2*/    const [products,setProducts] = useState([])
/*6*/    const[a,setA] = useState(0)
    useEffect(()=>{
/*3*/  axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res)=>{
        setProducts(res.data)
        })
        },
 /*6*/   [a]
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
           /*4*/  products.map(
                (product,index)=>{
                    /*5*/
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
         /*6*/     setA(a+1)     
            
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


/*Note - index →it is a  temporary key word it is the position number,if 1st image upload 0 and 2 nd it will be 1, React needs a unique identifier for every item but we can add the productId as a unique key but some time can send without prodcut key so that time the index will unique key and the thing is it is only for when we 1st created front end when we create backend we can change the product as a unique key


Note -  <img src={product.images[0]} alt={product.name} /> - images will save in array and starts from 0 


2.const [products, setProducts] = useState([])
          👆          👆                👆
        stores      updates            starts as
        products    products           empty array!
        list        list

3. - axios.get(url + "/api/products")
     👆
     sends GET request to backend!
     backend → Product.find() → gets ALL from MongoDB!
     sends back to frontend!      

setProducts(res.data)
 now products = [product1, product2, product3]

  setProducts(res.data)
                  👆
       res.data = products array from MongoDB!
     [
         { productId:"111", name:"perfume" },
         { productId:"112", name:"soap"    },
         { productId:"113", name:"cream"   }
       ]
       setProducts saves to useState!
       products = MongoDB data now! 


 4. MongoDB → backend → frontend → .map() → display!
 products.map((product, index) => {
  👆         👆
  products = MongoDB array!
  map picks ONE product at a time!
  gives to product variable!

  5.

MongoDB
─────────────────────────────
[perfume, soap, cream]
        ↓
axios.get → asks backend
        ↓
backend → Product.find()
        ↓
res.data = [perfume, soap, cream]
        ↓
setProducts(res.data)
        ↓
useState products = [perfume, soap, cream]
        ↓
products.map picks ONE at a time!
─────────────────────────────
1st → product = perfume
    → <tr> perfume row </tr>

2nd → product = soap
    → <tr> soap row </tr>

3rd → product = cream
    → <tr> cream row </tr>
─────────────────────────────
table shows all 3 products! ✅

In `.map()` we can get the product details. We can print them in the Google console, and then we return our necessary things. We give the backend URL, and it will get the products.
But when we change any product or create a new product, it will not automatically update the page. Then we use:

const [products, setProducts] = useState([])
`useState` is a React function. `products` is a variable and `setProducts` is a function.we have to setProducts in axios.get . When we run the `setProducts` function, the `products` variable is updated (the value of the `products` variable changes), and then the page re-renders. After that, the newly added product will be displayed on the page.

When we run:
setProducts(res.data)
the products state is updated and React re-renders the page.
But there is a problem. If we put the axios.get() directly inside the component without useEffect, every time the page re-renders, axios.get() will run again. Then setProducts(res.data) will run again, which causes another re-render. This creates a loop where the GET request keeps running again and again.

As a result, the frontend will continuously send requests to the backend, which can cause performance problems and put unnecessary load on the backend server.
To solve this problem, we use useEffect().

useEffect  (  ()=>{  ...code...  }  ,  []  )
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
new product shows in table! ✅


6 - In the delete function there is a problem. We can delete the product using `axios.delete()`, and MongoDB will also delete it successfully. But the product will still be shown on the page because `useEffect()` only runs when the page loads. If we manually refresh the page, the product will disappear because the latest products are fetched from the backend.
To solve this problem, we use another state:

const [a, setA] = useState(0)

and add `a` to the `useEffect` dependency array: [a]

After the delete is successful, we write: setA(a + 1)

Initially, `a = 0`. After deleting a product, `a` changes to `1`. Since the value in `[a]` changed, `useEffect()` runs again, gets the latest products from the backend, updates the `products` state, and the deleted product disappears from the table without manually refreshing the page.


*/