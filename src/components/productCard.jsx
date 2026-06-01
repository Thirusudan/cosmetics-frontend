
export default function ProductCard(props){
    console.log(props)
    return(
        <div className="">
            <h1>{props.name}</h1>
            <img src={props.image} />
            <p>{props.price}</p>
            <button>view more</button>
        </div>
    )
}