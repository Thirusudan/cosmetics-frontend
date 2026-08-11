import { Link } from "react-router-dom"

export default function ProductCard(props){
    const product = props.product
    return(
       <Link to={"/overview/"+product.productId} className="min-w-[300px] h-[400px] flex flex-col shadow-2xl shrink-0 rounded-2xl overflow-hidden    group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 bg-blue-900"> 

       <img src={product.images[0]} className="w-full h-[275px] object-cover     0bject-cover  transition-transform duration-500 ease-out group-hover:scale-125 group-hover:-translate-x-2 group-hover:-translate-y-2 " />  
        <div className="w-full h-[125px] flex flex-col p-[3px] bg-[#F5F1E8]">
            <span className="text-gray-400 text-[12px]">{product.productId}</span>
            <h1 className="text-lg font-bold">
             {product.name} {""}
           
            <span className="text-gray-500 text-[14px]">
                {product.category}
            </span>
             </h1>

             <div>
              {
                product.labelledPrice > product.price? (
                    <p>
                        <span className="line-through mr-[10px]">{product.labelledPrice.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                        <span>{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                    </p>
                ) : (
                <p>{product.price.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
             ) }  
             </div>


        </div>
       </Link> 
    )
}



/*<img src={product.images[0]} className="w-full h-[275px] object-cover" /> 
product.images[0]
              👆
        FIRST image only!
        even if 3 images uploaded,
        card shows ONLY the 1st one! 
        
        
                                          */
