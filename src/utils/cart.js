export function getCart(){
    let cartInString = localStorage.getItem("cart");  //1

 /*2*/  if(cartInString == null){
        cartInString = "[]"
        localStorage.setItem("cart", cartInString);
    }

 /*3*/    const cart = JSON.parse(cartInString);
    return cart;
}


/*4*/ export function addToCart(product,qty){
    const cart = getCart()  /*5*/
     

/*6*/    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId === product.productId
    })
    
/*7*/    if(existingProductIndex == -1){
           cart.push({
                        productId : product.productId,
                        quantity: qty,
                        price: product.price,
                        name: product.name,
                        altNames: product.altNames,
                        image: product.images[0]
                     }
        ) 
        localStorage.setItem("cart",JSON.stringify(cart))
        }else{
/*8*/     const newQty = cart[existingProductIndex].quantity + qty
/*9*/      if(newQty<=0){
/*9*/       const newCart = cart.filter((item,index)=>{
/*9*/        return index !== existingProductIndex
            })
           localStorage.setItem("cart",JSON.stringify(newCart))
/*8*/         } else{
/*8*/        cart[existingProductIndex].quantity = newQty
/*8*/        localStorage.setItem("cart",JSON.stringify(cart))
        }
    }
}

/*10*/
export function getTotal(){
    const cart = getCart();
    let total =0 
    cart.forEach((item)=>{
        total +=item.quantity * item.price
    })
    return total
}



/*.
1- This gets the value stored in Local Storage with the key "cart".
2- If there is no cart in Local Storage, create an empty cart Then save it:
3 - converts a JSON string into a JavaScript object or array.

The getCart() function is used to get the shopping cart from the browser's Local Storage. First, localStorage.getItem("cart") reads the cart, which is stored as a string. If no cart exists (null), it creates an empty cart "[]" and saves it using localStorage.setItem(). Next, JSON.parse(cartInString) converts the JSON string into a JavaScript array/object so the program can use it. Finally, return cart returns the cart data to wherever the function is called.

getItem() → Get the string from Local Storage.
setItem() → Save the string to Local Storage.
JSON.stringify() → Object/Array → String (before saving).
JSON.parse() → String → Object/Array (after reading).

Save: JavaScript Array → JSON.stringify() → String → localStorage.setItem()
Read: localStorage.getItem() → String → JSON.parse() → JavaScript Array

4 - then we need add the product to cart addToCart() is the main function that handles adding, updating, and removing products from the cart 

5 - first load the current cart from localStorage using getCart() 

6 - use findIndex() to search the cart array for a product whose productId matches the incoming product.when we add product to the cart first we have to check the product 
 is already in the cart or not. findIndex() will return the INDEX POSITION (0,1,2...) if product is found, and return -1 if product is not found

 7 -  if it is -1 (product not in cart) then cart.push() will run and add the new product details (productId, quantity, price, name, altNames, image) into the cart array, then save it to localStorage as a string
 ex- Imagine you want to add a new Lipstick to the cart. Since Lipstick is not already in the cart, findIndex() returns -1. So cart.push() adds the Lipstick as a brand new item into the cart array, then JSON.stringify() converts the array back to a string and saves it to localStorage.

 8 - Imagine the Perfume Bottle is already in cart with quantity: 2 and you press the + button (qty = 1). Since Perfume Bottle is already found in the cart, findIndex() returns its index position. Then newQty = 2 + 1 = 3. Since newQty (3) > 0, it just updates the quantity to 3 and saves to localStorage.

 9 - Imagine the Perfume Bottle is in cart with quantity: 1 and you press the - button (qty = -1). Then newQty = 1 + (-1) = 0. Since newQty (0) <= 0, filter() removes the Perfume Bottle completely from the cart and saves the updated cart to localStorage.


 10- getCart()     →  load cart array from localStorage
    total = 0     →  start counter at zero
    forEach()     →  loop each item → quantity × price → add to total
    return total  →  send final total to the screen

 Long way:
total = total + (item.quantity * item.price)
Short way (same thing):
total += item.quantity * item.price
*/