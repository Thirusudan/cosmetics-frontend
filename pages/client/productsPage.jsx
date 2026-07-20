import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../src/components/loader"
import ProductCard from "../../src/components/productCard"

export default function ProductsPage(){

    const[products,SetProducts]= useState([])
    const[loading, SetLoading] = useState(true)
    const[query,setQuery] = useState("") //

    useEffect(()=>{
        if(loading){
            if(query ==""){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                SetProducts(res.data)
                SetLoading(false)
            })
            }else {
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query).then((res)=>{
                    SetProducts(res.data)
                    SetLoading(false)
                })
            }
        }
    },
    [loading]
)

    return(
    <div className="w-full h-full">
        <div className="w-full h-[100px] flex justify-center items-center">
        <input type="text"
         placeholder="Search products..."
         value={query}
         onChange={(e)=>{
         setQuery(e.target.value)
         SetLoading(true)
         }}
         className="w-[400px] h-[40px] border border-gray-300 rounded-lg"/>
        </div>
      {
        loading? ( <Loader/> 

        ) : (
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
        )
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
const product = ...    → your local name, can be ANYTHING 

PRODUCT SEACRH PART EXPLAINATION 

STEP 1 — Page loads
Frontend:
const [query, setQuery] = useState("")      // query = ""
const [loading, setLoading] = useState(true) // loading = true

STEP 2 — Since loading is true, useEffect runs
useEffect(()=>{
    if(loading){
        if(query == ""){                     ← query IS "" right now

STEP 3 — Since query is empty, fetch ALL products (no search yet)
Frontend:
axios.get(".../api/products").then((res)=>{
    SetProducts(res.data)
    SetLoading(false)
})

STEP 4 — Grid shows every product, spinner stops
loading = false → Loader disappears → all products shown

──────────────────────────────────────────

STEP 5 — Admin types "al" into the search box
Frontend:
<input onChange={(e)=>{
    setQuery(e.target.value)    ← query becomes "al"
    SetLoading(true)            ← loading becomes true
}}/>

STEP 6 — Since loading changed, useEffect runs again
useEffect(()=>{
    if(loading){
        if(query == ""){ ... }
        else {                                ← query is NOT "" now

STEP 7 — Fetch SEARCH results instead
Frontend:
axios.get(".../api/products/search/" + query).then((res)=>{
    SetProducts(res.data)
    SetLoading(false)
})
// sends: GET /api/products/search/al

──────────────────────────────────────────

STEP 8 — Backend receives the request
export async function searchProducts(req,res){
    const query = req.params.query    ← query = "al"

STEP 9 — Backend searches MongoDB
try{
    const products = await Product.find({
        $or:[
            { name : {$regex:query , $options: "i"} },
            { altNames : {$elemMatch :{$regex:query, $options:"i"}}}
        ],
        isAvailable:true
    })
    return res.json(products)
}catch{
    res.status(500).json({message: "Failed to search products"})
}

$or: [...] means "match if EITHER of these two conditions is true — not both required."
  Condition 1: name matches the search text
  Condition 2: altNames (the array) has at least one match
So a product counts as a match if the search text is found in its NAME, OR in one of its
altNames — only one needs to match, not both.

Example 1: product name = "Aloevera Cream", admin types "al"
$regex checks: does "al" appear ANYWHERE inside "Aloevera Cream"? → YES (partial match, not exact)
$options: "i" makes it ignore uppercase/lowercase → "al" still matches "Al" in "Aloevera"
→ Condition 1 (name) is TRUE → because of $or, this product is already a match

Example 2: product name = "Face Wash", altNames = ["Aloe Face Wash", "Gentle Cleanser"]
admin types "al"
Condition 1 (name): does "Face Wash" contain "al"? → NO
Condition 2 (altNames): $elemMatch checks each item in the array —
   "Aloe Face Wash" contains "al"? → YES
→ Condition 2 is TRUE → because of $or, this product is STILL a match

isAvailable: true → required separately (AND, outside the $or), so hidden or unavailable
products never show up in search results, even if their name/altNames match

STEP 10 — Backend sends matching products back
res.json(products)   // e.g. [ {name:"Aloevera Cream"}, {name:"Face Wash", altNames:["Aloe Face Wash"]} ]

──────────────────────────────────────────

STEP 11 — Frontend receives the response
.then((res)=>{
    SetProducts(res.data)   ← grid updates to ONLY matching products
    SetLoading(false)       ← spinner stops
})

STEP 12 — Grid now shows only search results
Admin sees only products matching "al"

──────────────────────────────────────────

STEP 13 — Admin clears the search box
setQuery("")      ← query becomes "" again
SetLoading(true)  ← loading becomes true

STEP 14 — useEffect runs again, query is "" → back to STEP 3
Fetches ALL products again → grid shows everything, like at the start

*/