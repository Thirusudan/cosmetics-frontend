import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../src/components/loader";
import ImageSlider from "../../src/components/imageSlider";
import { addToCart, getCart } from "../../src/utils/cart";

export default function ProductOverViewPage(){
    const params = useParams()
    const[product,setProduct] = useState(null)
    const navigate = useNavigate()
    const[status, setStatus] = useState("loading"); //loading, success , error
     

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${params.productId}`).then(
                    (res)=>{
                        setProduct(res.data);
                        setStatus("success");
                }).catch(()=>{
                   setStatus("error")
                })
            }
    },[status]
)

    return(
        <div className="w-full h-full">

           {
            status == "loading" && <Loader/>
           }

           {
            status == "success" &&( <div className="w-full h-full flex flex-col md:flex-row">
                <h1 className="text-2xl my-4 text-center font-bold md:hidden">{product.name}
                <span className="font-light">{product.altNames.join(" | ")}</span> 
                 </h1>

                <div className="w-full flex flex-col justify-center items-center md:w-[49%] ">
                    
                    <ImageSlider images={product.images}/>
                </div>
                <div className="w-full flex flex-col items-center pt-[200px] md:w-[49%] ">
               <h1 className="text-2xl font-bold hidden md:block">{product.name}{""}
                <span className="font-light">{product.altNames.join(" | ")}</span>  </h1>
                <p className="text-lg p-2">{product.description}</p>
                <div className="w-full flex flex-row  items-center mt-[20px]">
                    {
                        product.labelledPrice > product.price?
                        <div>
                            <span className="text-2xl font-semissbold  line-through mr-[20px]"> {product.labelledPrice.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                            <span className="text-3xl font-bold ">{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                        </div>
                        :
                        <div>
                            <span className="text-3xl font-bold ">{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                        </div>
                    }
                </div>
                <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[10px] ">
                    <button className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-900 border-[2px] border-blue-900 hover:bg-white hover:text-blue-900"onClick={()=>{   
 /*16*/       navigate("/checkout",{state:{items:
            [{
                productId : product.productId,
                quantity : 1,
                name: product.name,
                image: product.images[0],
                price: product.price
            }]
        }})
    }}>
                      Buy Now
                    </button>
                     <button className="w-[200px] h-[50px] cursor-pointer rounded-xl shadow-2xl text-white bg-blue-600 border-[2px] border-blue-600 hover:bg-white hover:text-blue-600" onClick={()=>{
                        addToCart(product,1)
                        toast.success("Product added to cart")
                        console.log(getCart())
                     }}>
                      Add to card
                    </button>
                </div>
               </div>
            </div> 
    )
           }
           {
            status =="error" && <div>Error loading product</div>
           }
        </div>
    )
}



/*const params = useParams()
        👆
      gets values from URL!
      example URL: /overview/COSM001
      params.productId = "COSM001" 
      
      const [product, setProduct] = useState(null)
               👆          👆                    👆
             stores      updates             starts as null!
             ONE         product             (no data yet!)
             product

const [status, setStatus] = useState("loading")
        👆         👆                    👆
      tracks     updates              starts as "loading"
      page       status               (3 possible values:
      state                            "loading", "success", "error")



Step 1 — ProductOverViewPage loads. params = useParams() reads the URL, so if URL is /overview/COSM001, then params.productId = "COSM001".

Step 2 — useState runs. product = null (empty, nothing yet) and status = "loading" (starting state).

Step 3 — useEffect runs because status == "loading" is true. axios.get sends a request to /api/products/COSM001 using params.productId from Step 1.

Step 4 — Backend responds with ONE product's data: { productId:"COSM001", name:"Serum", images:["url1.jpg","url2.jpg","url3.jpg"] }.

Step 5 — setProduct(res.data) saves this data, so product now equals that object. setStatus("success") changes status from "loading" to "success".

Step 6 — Page re-renders. useEffect runs again because [status] changed, but if(status=="loading") is now false, so axios.get does NOT run again — it stops here.

Step 7 — In the return section, status=="loading" is false so Loader is hidden. status=="success" is true, so the success block renders.

Step 8 — Inside the success block, <ImageSlider images={product.images}/> runs. This creates a box called props and puts product.images = ["url1.jpg","url2.jpg","url3.jpg"] inside it, labeled "images". This box is sent to ImageSlider.

Step 9 — Now we move into ImageSlider.jsx. The function receives props — this is the box from Step 8. props.images opens the box and takes out the array. const images = props.images gives it a shorter name, so images = ["url1.jpg","url2.jpg","url3.jpg"].

Step 10 — useState(0) creates activeImageIndex starting at 0.

Step 11 — The big image renders with src={images[activeImageIndex]} = images[0] = "url1.jpg". This is the first image shown by default.

Step 12 — Below it, images.map runs through all 3 URLs one by one and creates a thumbnail for each. On the first run, image = "url1.jpg" and index = 0, so it creates <img src="url1.jpg" key={0}/>. On the second run, image = "url2.jpg" and index = 1, creating <img src="url2.jpg" key={1}/>. On the third run, image = "url3.jpg" and index = 2, creating <img src="url3.jpg" key={2}/>.

Step 13 — User clicks the second thumbnail (url2.jpg, index=1). Its onClick fires setActiveImageIndex(1), so activeImageIndex changes from 0 to 1.

Step 14 — Component re-renders. The big image's src is now images[activeImageIndex] = images[1] = "url2.jpg" — the big image switches to the second photo.

Step 15 — User can click any thumbnail (index=0, 1, or 2) at any time, and activeImageIndex updates to match — the big image always shows images[activeImageIndex], while all 3 thumbnails stay visible below as small clickable previews.   


16-  User clicks "Buy Now" on Perfume Bottle page
         ↓
navigate() sends user to /checkout
         ↓
Carries this package:
state = {
    items: [{
        productId: "COS001",
        quantity: 1,
        name: "Perfume Bottle",
        image: "url...",
        price: 3000
    }]
}
         ↓
CheckoutPage receives via location.state.items
         ↓
Shows just that ONE product ready to order ✅
*/