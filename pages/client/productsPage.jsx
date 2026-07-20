import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../src/components/loader"
import ProductCard from "../../src/components/productCard"

export default function ProductsPage(){

    const[products,SetProducts]= useState([])
    const[loading, SetLoading] = useState(true)

    useEffect(()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                SetProducts(res.data)
                SetLoading(false)
            }).catch
        }
    },
    [loading]
)

    return(
    <div className="w-full h-full">
      {
        loading? <Loader/> :
        <div className="w-full flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
            { 
                products.map(
                    (product)=>{
                        return(
                            <ProductCard key={product.productId} product={product}/>
                        )
                })
            }
        </div>
      }

    </div>
      )
}


/* First, loading is true and products is an empty array []. Since loading is true, axios.get runs and fetches all products from MongoDB. Then setProducts(res.data) fills products with [perfume, soap, cream], and setLoading(false) sets loading to false — this tells the page "fetching is done, stop showing the spinner." The page re-renders, and because loading is now false, the condition loading ? <Loader/> : (...) skips the Loader and shows the products grid instead. Now products.map runs — it goes through the array one item at a time. On the first run, product equals perfume's data, and this gets sent to ProductCard through product={product}. Inside ProductCard, props.product receives this same perfume data, and const product = props.product stores it in a local variable. ProductCard then displays perfume's image, productId, name, category, and price using product.images[0], product.productId, product.name, product.category, and product.price. Before showing the price, it checks if product.labelledPrice is greater than product.price — if true, it shows the old price with a strikethrough plus the new price; if false, it just shows the price normally. This whole process then repeats for the second item — product equals soap's data, gets sent the same way, and ProductCard displays soap's card. Then it repeats again for the third item — product equals cream's data, and ProductCard displays cream's card. The key={product.productId} on each ProductCard tells React which card belongs to which product, so React can track and update them correctly. The result is that the grid shows one card for every product in the array, each card built by the same ProductCard component but filled with different data each time.


ProductsPage.jsx                          ProductCard.jsx
════════════════════                      ════════════════════

0 — useState setup
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    // products = empty array
    // loading = true (start fetching!)
         ↓
1 — useEffect runs (page loads)
    useEffect(()=>{
        if(loading){
         ↓
2 — axios.get(url + "/api/products")
    asks backend for all products
         ↓
3 — .then((res)=>{
        setProducts(res.data)
        // products = [perfume, soap, cream]
        setLoading(false)
        // done loading!
    })
        }
    }, [loading])
         ↓
4 — page re-renders
    loading = false now
         ↓
5 — loading ? <Loader/> : (...)
    loading=false → skip Loader
    → show products grid!
         ↓
6 — products.map((product) => {
        return(
            <ProductCard
                key={product.productId}
                product={product}
            />              👆        👆
        )            prop name    current item
    })                (must match  from .map loop
                      props.product)

────────────────────────────────────────→
        SENDS one product object at a time!


                                           7 — export default function ProductCard(props){
                                                   const product = props.product
                                                   //    👆           👆
                                                   //  your name   must match
                                                   //  (any name)  sent prop name!

                                           8 — return(
                                                   <div>

                                           9 —      <img src={product.images[0]}/>
                                                   // first image of this product

                                          10 —      <span>{product.productId}</span>
                                                   // "111"

                                          11 —      <h1>{product.name}
                                                       <span>{product.category}</span>
                                                     </h1>
                                                   // "perfume"  "fragrance"

                                          12 —      {
                                                       product.labelledPrice > product.price
                                                       ? (
                                                           <p>
                                                             <span className="line-through">
                                                               {product.labelledPrice}
                                                             </span>
                                                             <span>{product.price}</span>
                                                           </p>
                                                         )
                                                       : (
                                                           <p>{product.price}</p>
                                                         )
                                                     }
                                                   // discount check:
                                                   // labelledPrice > price?
                                                   // YES → old price crossed out + new price
                                                   // NO  → price only

                                                   </div>
                                               )
                                           }


13 — LOOP REPEATS for each product
──────────────────────────────
1st loop → product = perfume → ProductCard shows perfume card
2nd loop → product = soap    → ProductCard shows soap card
3rd loop → product = cream   → ProductCard shows cream card
         ↓
14 — table/grid shows all product cards! ✅


KEY RULE
──────────────────────────────
.map variable name     → can be ANYTHING (product, AC, item...)
prop name (X={X})      → MUST match on both sides!
props.X in ProductCard → must match the prop name sent!
const product = ...    → your local name, can be ANYTHING */