export default function Paginator(props){
/*1*/    const{currentPage,totalPages,setCurrentPage,limit,setLimit,setLoading} = props

    return(
        <div className="w-full h-[50px] flex flex-row justify-center items-center gap-[20px]">
          <select className="w-[100px] h-[40px] border border-gray-300 rounded-md p-[10px]" 
/*2*/         value={currentPage} onChange={(e)=>{
            setLoading(true)          //triggers useEffect to run again ✅
            setCurrentPage(parseInt(e.target.value))   // changes page number
          }} >
            {
             
               Array.from({ length: totalPages }, (_, index) => (
                        <option key={index} value={index + 1}>
                            Page {index + 1}
                        </option>
                    ))
                   
            }
          </select>

          <select className="w-[100px] h-[40px]  border-gray-300 rounded-md p-[10px] " value={limit} onChange={(e)=>{
            setLimit(parseInt(e.target.value))
            setLoading(true)
          }}>

            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>

          </select>

          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>
    )
}

/*
1- const { currentPage, totalPages, setCurrentPage, limit, setLimit, setLoading } = props
opens the bag and takes out everything OrdersPageAdmin sent

2. First, the page loads currentPage is 1 and totalPages is 6. Array.from runs and creates 6 options — Page 1, Page 2, Page 3, Page 4, Page 5, Page 6 — and they show up inside the select dropdown.
When the admin clicks the dropdown and selects "Page 3", the onChange function runs. Inside it, two things happen in order:
First, setLoading(true) runs. This changes loading from false to true.
Second, setCurrentPage(parseInt(e.target.value)) runs. e.target.value is "3" (a string, because HTML always gives strings), so parseInt converts it to the number 3. This changes page from 1 to 3.
Now, back in OrdersPageAdmin, the value in the dependency array [loading, page, limit] changed — loading became true AND page became 3. So useEffect runs again.
Since loading is true, axios.get runs and fetches /api/orders/3/10 (page 3, limit 10). setOrders(res.data.orders) displays the page 3 orders in the table. setTotalPages stays the same (still 6 total pages). Then setLoading(false) runs — loading goes from true back to false.
useEffect runs one more time, but since loading is false, axios.get does not run. It stops.
The select's value={currentPage} also updates to 3, so the dropdown now visually shows "Page 3" as selected — matching what's displayed in the table.

First, the page loads. limit is 10 (the default from useState(10)), and the limit dropdown shows fixed options — 5, 10, 20, 50 — hardcoded directly in the JSX (not created by Array.from like the page dropdown). Right now, the dropdown visually shows "10" as selected, since value={limit} is 10.

When the admin clicks the dropdown and selects "20", the onChange function runs. Inside it, two things happen in order:

2 -  First, the page loads. limit is 10 (the default from useState(10)), and the limit dropdown shows fixed options — 5, 10, 20, 50 — hardcoded directly in the JSX (not created by Array.from like the page dropdown). Right now, the dropdown visually shows "10" as selected, since value={limit} is 10.

When the admin clicks the dropdown and selects "20", the onChange function runs. Inside it, two things happen in order:
First, setLimit(parseInt(e.target.value)) runs. e.target.value is "20" (a string, because HTML always gives strings), so parseInt converts it to the number 20. This changes limit from 10 to 20.
Second, setLoading(true) runs. This changes loading from false to true.
Now, back in OrdersPageAdmin, the value in the dependency array [loading, page, limit] changed — loading became true AND limit became 20. So useEffect runs again.
Since loading is true, axios.get runs and fetches /api/orders/1/20 (page 1, but now limit 20 instead of 10). setOrders(res.data.orders) displays 20 orders in the table instead of 10. setTotalPages also updates — since each page now holds more orders (20 instead of 10), fewer pages are needed to show all the data, so this number goes down (for example, from 6 total pages down to 3). Then setLoading(false) runs — loading goes from true back to false.

useEffect runs one more time, but since loading is false, axios.get does not run. It stops.
The select's value={limit} also updates to 20, so the dropdown now visually shows "20" as selected — matching the 20 orders now displayed in the table.

*/