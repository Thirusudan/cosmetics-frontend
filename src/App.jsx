 
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from '../pages/homePage'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from '../pages/adminPage'
import TestPage from '../pages/testPage'
import { Toaster } from 'react-hot-toast'
import ClientWebPage from '../pages/client/clientPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

function App() {

  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
       <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
         <Toaster position="top-wright" /> 
     
     <Routes path="/">  
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/test" element={<TestPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/*" element={<ClientWebPage/>}/>

     </Routes>

    </div>
    </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
