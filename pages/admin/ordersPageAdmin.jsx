import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import Paginator from "../../src/components/paginator";
import toast from "react-hot-toast/headless";

 export default function OrdersPageAdmin(){
   
      const [orders,setOrders] = useState([])              // stores the orders list          
      const[loading,setLoading] = useState(true)           // tracks if data is loading
      const[page, setPage] = useState(1)                   // current page number (starts at 1)
      const[totalPages,setTotalPages] = useState(0)         // total number of pages
      const[limit,setLimit] = useState(10)                  // how many orders per page (10)   
      const[popupVisibile,setPopVisibile] =useState(false) 
      //controls whether the popup shows on screen or not. Starts false (hidden).
      const[clickedOrder,setClikedOrder] = useState(null) 
      //when we click 201 it will have to show in poppannal
      const [orderStatus, setOrderStatus] = useState("pending"); // pending, completed, cancelled
      const [orderNotes, setOrderNotes] = useState("");
      //holds the text typed inside the notes textarea. Starts empty "".

      
 /*1*/    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/login"
            return;
        }
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/" + page +"/"+limit,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res)=>{
                setOrders(res.data.orders);
                setTotalPages(res.data.totalPages)
                setLoading(false);
                console.log(res.data)
            }).catch((err)=>{
                console.error(err)
            })
        }
      }
      ,[loading,page,limit])

return(
    <div className="w-full flex flex flex-col justify-between">
      <table className="w-full border-[3px]">
    <thead>
        <tr>
            <th className="p-[10px]">OrderId</th>
            <th className="p-[10px]">Email</th>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Address</th>
            <th className="p-[10px]">Phone</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Date</th>
            <th className="p-[10px]">Total</th>
        </tr>
    </thead>
    <tbody>
         {
           (orders ?? []).map(
                
                (order,index)=>{
                 return(
                <tr key={index} className="border-b-[1px] hover:bg-blue-600 hover:text-white"onClick={()=>{
 /*4*/              setOrderStatus(order.status)
                    setOrderNotes(order.notes)
                    setClikedOrder(order)
                    setPopVisibile(true);

                }}>
                 <td className="p-[10px]">{order.orderID}</td>
                 <td className="p-[10px]">{order.email}</td>
                 <td className="p-[10px]">{order.name}</td>
                 <td className="p-[10px]">{order.address}</td>
                 <td className="p-[10px]">{order.phone}</td>
                 <td className="p-[10px]">{order.status}</td>
                 <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                 <td className="p-[10px] text-end">{order.total.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>



                </tr>
                 )
            })
         }
    </tbody>
      </table> 
      {
/*5*/        popupVisibile &&clickedOrder && (
            <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
             <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg p-6 relative shadow-xl">
               {
              (orderStatus!= clickedOrder.status || orderNotes!= clickedOrder.notes)&&<button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-lg cursor-pointer" onClick={async()=>{
                setPopVisibile(false)
                try{
                    await axios.put(import.meta.env.VITE_BACKEND_URL +"/api/orders/" + clickedOrder.orderID,{
                        status:orderStatus,
                        notes : orderNotes
                    },
                    {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                toast.success("Order updated successfully");
                setLoading(true)
                }catch(err){
                    console.error(err);
                    toast.error("Failed to update order")

                }

              }}>
                 Save Changes
                </button>
               }
              <button className="absolute w-[30px] h-[30px]  bg-red-600 border-[2px] border-red-600 text-white top-[-25px] right-[-25px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-600" onClick={()=>{
                setPopVisibile(false)
              }}>
                x
              </button>

              				{/* Header */}
						<h2 className="text-2xl font-semibold mb-4">Order Details</h2>

						{/* Customer Info */}
						<div className="mb-6 space-y-1">
							<p>
								<span className="font-semibold">Order ID:</span>{" "}
								{clickedOrder.orderID}
							</p>
							<p>
								<span className="font-semibold">Name:</span> {clickedOrder.name}
							</p>
							<p>
								<span className="font-semibold">Email:</span>{" "}
								{clickedOrder.email}
							</p>
							<p>
								<span className="font-semibold">Phone:</span>{" "}
								{clickedOrder.phone}
							</p>

							<p>
								<span className="font-semibold">Address:</span>{" "}
								{clickedOrder.address}
							</p>
                            {/* total */}
                            <p>
								<span className="font-semibold">Total:</span>{" "}
								{clickedOrder.total.toLocaleString("en-US", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</p>
							<p>
								<span className="font-semibold">Status:</span>{" "}
								<span
									className={`capitalize px-2 py-1 rounded ${
										clickedOrder.status === "pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-green-100 text-green-700"
									}`}
								>
									{clickedOrder.status}
								</span>
                               <select
                                    className="ml-4 p-1 border rounded"
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
							</p>
                            <p>
								<span className="font-semibold">Notes:</span>{" "}
								{clickedOrder.notes}
							</p>
                            <textarea
                                className="w-full h-[50px] p-2 border rounded mt-2"
                                value={orderNotes}
                                onChange={(e) => setOrderNotes(e.target.value)}
                            ></textarea>
							<p>
								<span className="font-semibold">Date:</span>{" "}
								{new Date(clickedOrder.date).toLocaleString()}
							</p>
						</div>

						{/* Items */}
						<div>
							<h3 className="text-xl font-semibold mb-2">Items</h3>
							<div className="space-y-4 max-h-[200px] overflow-y-auto">
								{clickedOrder.items.map((item, index) => (
									<div
										key={item._id || index}
										className="flex items-center gap-4 border p-3 rounded-md"
									>
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-md border"
										/>
										<div className="flex-1">
											<p className="font-semibold">{item.name}</p>
											<p className="text-sm text-gray-600">Qty: {item.qty}</p>
											<p className="text-sm text-gray-600">
												Price: Rs. {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</p>
											<p className="text-sm font-medium">
												Subtotal: Rs. {(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

             </div>
            </div>
        )
      }
       <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
    </div>
)
    
 }



/*
1 - First, loading is true. Since it is true, axios.get runs and fetches the orders from the backend using the URL /api/orders1/10 (page 1, limit 10). Then setOrders(res.data.orders) saves the orders and displays them in the table. setTotalPages(res.data.totalPages) saves the total number of pages. After that, setLoading(false) runs — now loading is false. useEffect runs again but since loading is false, axios.get does not run. It stops.
When the admin clicks the next page button (which we will add later), setPage(2) runs — now page changes from 1 to 2. The value in the dependency array [loading, page, limit] changed, so useEffect runs again. Now it fetches /api/orders2/10 (page 2, limit 10). setOrders(res.data.orders) displays the new page of orders in the table. setTotalPages stays the same. Then setLoading(false) keeps loading as false. useEffect runs one more time but since nothing changed, axios.get does not run. It stops.
useEffect runs again when ANY of these change:

1. loading changes   → first time page loads / refresh
                     → true → axios.get runs → fetches orders ✅

2. page changes      → admin clicks next/previous page button
                     → page 1 → page 2 → axios.get runs again ✅
                     → fetches /api/orders2/10

3. limit changes     → admin changes orders per page
                     → 10 → 20 → axios.get runs again ✅
                     → fetches /api/orders1/20

                     useEffect runs on first load/refresh because loading starts as true, and runs again whenever page or limit changes — so every time the admin navigates to a new page or changes how many orders to show, it automatically fetches the new data from the backend! ✅


2 -   <Paginator 
    currentPage={page}          - sends current page number (1,2,3...)
    totalPages={totalPages}     - sends total pages (e.g. 6)
    setCurrentPage={setPage}    - sends function to change page
    limit={limit}               - sends current limit (10)
    setLimit={setLimit}         - sends function to change limit
    setLoading={setLoading}     - sends function to trigger refetch



 3.  without limit and page indepenecy array will run perfecly but why we add the depenecy array inside limit and page?
    page and limit are added to the dependency array because your useEffect uses them to build the fetch URL — "/api/orders/" + page + "/" + limit. If page or limit change, that URL becomes outdated, so React needs to know to re-run the fetch with the new values. The rule is simple: any variable your effect reads to do its job should be in the array, so React always re-runs when that variable changes.
 can "works" with just [loading] because your buttons always call setLoading(true) alongside setPage/setLimit. But that's a coincidence, not a guarantee — if someone later changes page or limit without also touching loading, the effect won't re-run, and the table will silently show wrong/old data. Adding page and limit to the array protects against that.


 *FULL PAGINATOR FUNCTION BACKEND(orderController) AND FRONT END(ordersPageAdmin.jsx,pagintor.jsx)*

1. Admin opens the Orders page. loading starts as true (useState(true)), page = 1, limit = 10.

2. Because loading is true, useEffect runs. It calls:
   GET /api/orders/1/10

3. This hits orderRouter.get("/:page/:limit", getOrders) — Express matches the URL 
   and pulls page=1, limit=10 out of the URL itself (req.params).

4. Inside getOrders, on the backend:
   - page = parseInt(req.params.page) || 1   → becomes 1
   - limit = parseInt(req.params.limit) || 10 → becomes 10
   - It checks req.user — if not logged in, sends back 401 "Please login".
   - If the user is "admin", it counts ALL orders in the database (orderCount), 
     then works out totalPages = orderCount ÷ limit, rounded up.
   - Then it fetches the actual orders: .skip((page-1)*limit).limit(limit)
     → skip((1-1)*10) = skip(0), limit(10) → gives the FIRST 10 orders.
   - Sends back { orders, totalPages } as JSON.

5. Back on the frontend, .then((res)=>{...}) receives this response:
   - setOrders(res.data.orders)       → table now shows those 10 orders
   - setTotalPages(res.data.totalPages) → e.g. 6 (if there are 60 orders total)
   - setLoading(false)                → stops the loop, useEffect won't refetch again yet

6. Now the admin clicks "Page 3" in the dropdown:
   - setLoading(true) → loading becomes true
   - setCurrentPage(3) → page becomes 3
   - useEffect sees loading/page changed → runs again → GET /api/orders/3/10

7. Backend receives page=3, limit=10:
   - skip((3-1)*10) = skip(20), limit(10) → skips the first 20 orders, 
     gives the NEXT 10 (orders 21-30) → this is "page 3"'s data.
   - Sends back { orders, totalPages } again.

8. Frontend updates the table with these new 10 orders, setLoading(false) again, and stops.

4.
1st - setOrderStatus(order.status)
In the order table, each row has a status (e.g. "completed"). This detail goes to the popup panel's status dropdown, so the dropdown shows the correct value for that specific order.

2nd - setOrderNotes(order.notes)
Notes aren't shown as a column in the order table, but they're still part of that order's data. This detail also goes to the popup panel's textarea.

3rd - setClikedOrder(order)
This is what sends all the order table details — OrderId, Email, Name, Address, Phone, Status, Date, Total, and other fields like items — from the table row into the popup panel, so the panel has everything it needs to display.

4th - setPopVisibile(true)
This is the one that actually makes the popup panel appear on screen, now that it's already loaded with that row's details.

Summary line, using your phrase: when the admin clicks a row, the order table details for that row go to the popup panel — setOrderStatus and setOrderNotes send the two editable pieces, setClikedOrder sends the full order object, and setPopVisibile(true) finally displays the panel with all of it already loaded in.


5. Before showing the popup, React checks: is popupVisibile true, AND is clickedOrder not empty? Only if both are true does it render. This stops the app from crashing (since the popup needs to read clickedOrder.name, clickedOrder.items, etc. — if clickedOrder were still empty, those would break).

6 - Displaying the order's details (read-only)
<h2>Order Details</h2>
<p>Order ID: {clickedOrder.orderID}</p>
<p>Name: {clickedOrder.name}</p>
<p>Email: {clickedOrder.email}</p>
<p>Phone: {clickedOrder.phone}</p>
<p>Address: {clickedOrder.address}</p>
<p>Total: {clickedOrder.total...}</p>
<p>Date: {clickedOrder.date...}</p>

All of these simply READ from clickedOrder — the full order object that was saved in step 4 (setClikedOrder(order)). Nothing here is editable; it's just displaying the order's table details inside the popup panel — Order ID, Name, Email, Phone, Address, Total, Date — exactly as they were in the table row the admin clicked.

7 - Editable status dropdown
<select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
    <option value="cancelled">Cancelled</option>
</select>

Opens already showing the order's real status (loaded in step 4). If admin picks a different one, setOrderStatus(e.target.value) updates orderStatus. 

8 - Editable notes textarea
<textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)}></textarea>
Opens already showing the order's real notes (loaded in step /4/). As admin types, setOrderNotes(e.target.value) updates orderNotes on every keystroke.

9 - Items list
{clickedOrder.items.map((item, index) => ( ...img, name, qty, price, subtotal... ))}
Reads clickedOrder.items — the list of products in that order — and displays each one's image, name, quantity, price, and subtotal. Read-only, just for viewing.


10 - "Save Changes" button only appears if something changed
{
  (orderStatus != clickedOrder.status || orderNotes != clickedOrder.notes) &&
  <button onClick={...}>Save Changes</button>
}

Compares the EDITED values (orderStatus, orderNotes) against the ORIGINAL values still in clickedOrder. If either is different, the button shows. If nothing changed, no button.

11 - Admin clicks "Save Changes" — step by step
onClick={async()=>{
    setPopVisibile(false)
    ...
}}

Step 1: setPopVisibile(false) → closes the popup immediately (admin sees it disappear right away).

Step 2: try block starts:
    await axios.put(".../api/orders/" + clickedOrder.orderID, {
        status: orderStatus,
        notes: orderNotes
    }, { headers: { Authorization: `Bearer ${token}` } })

This sends a PUT request to the backend. clickedOrder.orderID in the URL tells the backend WHICH order to update. The body sends the NEW status and notes (whatever the admin edited them to).

Step 3: If the request succeeds:
    toast.success("Order updated successfully")   → shows a green success message
    setLoading(true)                                → this is the key step! It flips loading back to true, which changes the useEffect dependency array [loading, page, limit] — so useEffect runs again and re-fetches the order list from the backend, refreshing the table with the updated status.

Step 4: If the request fails (catch block runs instead):
    console.error(err)                → logs the error to the browser console
    toast.error("Failed to update order")  → shows a red error message instead

    12 - Admin clicks the "x" close button
<button onClick={()=>{ setPopVisibile(false) }}>x</button>

Simply closes the popup by setting popupVisibile back to false — no save, no axios call, nothing else happens.


4 to 12 - Full popup flow, story style

First, the admin clicks a row, say CBC00226. Four things happen in order: setOrderStatus(order.status) loads that order's real status ("completed") into the dropdown. setOrderNotes(order.notes) loads its notes into the textarea. setClikedOrder(order) saves the whole order object. setPopVisibile(true) flips popupVisibile to true.

Now React re-renders. The safety check {popupVisibile && clickedOrder && (...)} passes, since both are now true, so the popup renders on screen.

Inside the popup, the read-only fields — Order ID, Name, Email, Phone, Address, Total, Date, and the Items list — simply display whatever is inside clickedOrder, exactly as it was in the table row that was clicked.

The status dropdown and notes textarea are different — they're editable. They open already showing the order's real status and notes (since they were loaded in step one), but if the admin picks a new status or types new notes, setOrderStatus and setOrderNotes update as the admin types or selects.

Because orderStatus and orderNotes are now different from clickedOrder.status and clickedOrder.notes, the "Save Changes" button appears — it only shows up when something has actually been edited.

When the admin clicks Save Changes: first, setPopVisibile(false) closes the popup immediately. Then axios.put sends a request to the backend, using clickedOrder.orderID to say which order to update, along with the new status and notes as the body. If it succeeds, toast.success shows a message, and setLoading(true) runs — this is the same trick from before, flipping loading in the [loading, page, limit] dependency array, so useEffect runs again and refetches the order list, refreshing the table with the updated status. If it fails instead, the catch block logs the error and shows an error toast.

If the admin clicks the "x" button instead of Save Changes, setPopVisibile(false) just closes the popup with no save, no axios call, nothing else.

Admin clicks the row for CBC00220
        ↓
setOrderStatus("pending"), setOrderNotes(...), setClikedOrder(order), setPopVisibile(true)
        ↓
Popup appears, showing CBC00226's details (name, email, items, current status)
        ↓
Admin changes the dropdown from "Pending" to "Completed"
        ↓
setOrderStatus("completed") → orderStatus is now different from clickedOrder.status
        ↓
"Save Changes" button appears (since orderStatus != clickedOrder.status)
        ↓
Admin clicks "Save Changes"
        ↓
Popup closes → axios.put sends the update to the backend
        ↓
Success → toast shows → setLoading(true) → useEffect refetches orders
        ↓
Table now shows CBC00220 as "completed"
/>                   
*/