import { toast } from "react-toastify"
import SummaryApi from "../common"
import { useContext } from "react"
import context from "../context"

const AddToCart = async(e,productId)=>{
    e.preventDefault()
    e.stopPropagation()
    
    const response = await fetch(SummaryApi.addToCart.url,{
        method: SummaryApi.addToCart.method,
        credentials: 'include',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            productId: productId
        })
    })
    const dataResponse= await response.json()
    if(dataResponse.success){
        toast.success(dataResponse.message)
    }
     if(dataResponse.error){
        toast.error(dataResponse.message)
    }
   console.log('dataResp',dataResponse)
}



export default AddToCart