import { Route, Routes } from "react-router-dom";
import Header from "../../../src/components/header";

export default function ClientWebPage(){
  return(
  <div className="w-full h-screen max-h-screen ">

  <Header/>
    <div className="w-full h-[calc(100%-100px)] ">
      <Routes path="/">
      <Route path="/" element={<h1 className="text-3xl text-center">Welcome to Home Page</h1>}/>
      <Route path="/products" element={<h1 className="text-3xl text-center">Products Page</h1>}/>
      <Route path="/reviews" element={<h1 className="text-3xl text-center">Reviews Page</h1>}/>
      <Route path="/about-us" element={<h1 className="text-3xl text-center">About us Page</h1>}/>
      <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact us Page</h1>}/>
      <Route path="/*" element={<h1 className="text-3xl text-center">404 Not found</h1>}/>
      </Routes>
     </div>
    </div>
    )
}