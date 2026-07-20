import { useState } from "react"

/*2*/ export default function ImageSlider(props){
     const images= props.images
     const[activeImageIndex,setActiveImageIndex] = useState(0)
     return(
        <div className="w-[300px] h-[500px] md:w-[400px]">
         <img src={images[activeImageIndex]} className="w-full h-[400px] object-cover " /> 

         <div className="w-full h-[100px] flex flex-row justify-center items-center gap-[2px]">
         {
           /*4*/ images.map(
                (image,index)=>{
                    return(
                        <img src={image} key={index} className={"w-[90px] h-[90px] object-cover cursor-pointer "+(activeImageIndex == index && "border-[5px]")} onClick={()=>{
                            setActiveImageIndex(index)
                        }}/>
                    )
            }) 
         }
         </div>
        </div>
    )
}



/*    SENDING SIDE (ProductOverViewPage)
<ImageSlider images={product.images}/>
               👆        👆
           prop name   value
           "images"    = ["url1.jpg","url2.jpg","url3.jpg"]

  2.    RECEIVING SIDE (ImageSlider)
export default function ImageSlider(props){
                                       👆
                               props = a BOX containing
                               EVERYTHING sent to this component!

    console.log(props)
          props = { images: ["url1.jpg","url2.jpg","url3.jpg"] }
                   👆
              this is the "box"!
              "images" is one item INSIDE the box!

    const images = props.images
             👆           👆
           new variable  opens the box
                          takes out "images" item!
           images = ["url1.jpg","url2.jpg","url3.jpg"]


3- Simple Analogy 📦

note - props = a delivery box

<ImageSlider images={product.images}/>
              👆
        you write "images" on a label
        and put product.images inside the box!
props.images
        👆
   opens the box
   reads the label "images"
   takes out what's inside!


const images = props.images
        👆
   gives it a shorter name
   "images" instead of "props.images"
   easier to use!

<img src={images[activeImageIndex]} className="w-full h-[400px] object-cover " /> -This is the first image shown by default.


4 - images.map explanation

images.map(
    (image, index) => {
      👆      👆
     each   position
     item   0,1,2...
     in     in array
     array

        return(
            <img
                src={image}
                      👆
                 THIS image's URL!
                 1st run: "url1.jpg"
                 2nd run: "url2.jpg"
                 3rd run: "url3.jpg"

                key={index}
                      👆                 0, 1, 2
                 unique id for React!

                className="w-[90px] h-[90px] object-cover cursor-pointer"

                onClick={()=>{
                    setActiveImageIndex(index)
                                         👆
                     when THIS thumbnail clicked
                    → save THIS index!
                     1st thumbnail clicked → index=0
                     2nd thumbnail clicked → index=1
                     3rd thumbnail clicked → index=2
                }}
            />
        )
    }
)

images = ["url1.jpg", "url2.jpg", "url3.jpg"]

map runs 3 times:

1st run:
image = "url1.jpg"
index = 0
    ↓
<img src="url1.jpg" key={0} onClick={()=>setActiveImageIndex(0)}/>


2nd run:
image = "url2.jpg"
index = 1
    ↓
<img src="url2.jpg" key={1} onClick={()=>setActiveImageIndex(1)}/>


3rd run:
image = "url3.jpg"
index = 2
    ↓
<img src="url3.jpg" key={2} onClick={()=>setActiveImageIndex(2)}/>

USER CLICKS 2nd thumbnail (url2.jpg)
        ↓
onClick fires
        ↓
setActiveImageIndex(1)
        ↓
activeImageIndex = 1
        ↓
big image src = images[activeImageIndex]
             = images[1]
             = "url2.jpg" ✅
        ↓
big image changes to url2.jpg!


images.map = walking past 3 photo frames

1st frame: photo = url1.jpg, has button "Show big" (index=0)
2nd frame: photo = url2.jpg, has button "Show big" (index=1)
3rd frame: photo = url3.jpg, has button "Show big" (index=2)

Click 2nd frame's button
    ↓
setActiveImageIndex(1)
    ↓
big screen shows photo from 2nd frame!*/