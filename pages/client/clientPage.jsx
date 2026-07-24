import { Route, Routes } from "react-router-dom";
import Header from "../../src/components/header";
import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import HomePage from "../homePage";

import ReviewsPage from "./reviewsPage";


export default function ClientWebPage(){
  return(
  <div className="w-full h-screen max-h-screen ">

  <Header/>
    <div className="w-full h-[calc(100%-100px)] ">
      <Routes path="/">
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/reviews" element={<ReviewsPage/>}/>
      <Route path="/about-us" element={<h1 className="text-3xl text-center">About us Page</h1>}/>
      <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact us Page</h1>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path="/overview/:productId" element={<ProductOverViewPage/>}/>
      
      <Route path="/*" element={<h1 className="text-3xl text-center">404 Not found</h1>}/>
      
      </Routes>
     </div>
    </div>
    )
}