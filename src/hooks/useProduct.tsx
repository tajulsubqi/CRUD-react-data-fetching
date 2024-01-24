import API from "@/libs/axios"
import { Products } from "@/types"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"


const useProduct = () => {
  const [products, setProducts] = useState<Products[]>([])
  const [isloading, setIsloading] = useState(false)

  const fetchProducts = async () => {
    setIsloading(true)

    try {
      setTimeout(async () => {
        const productsResponse = await API.get("/products")
        setProducts(productsResponse.data)
        setIsloading(false)
        // console.log(productsResponse.data)
      }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line
  }, [])

  return {
    data: products,
    isloading,
    fetchProducts,
  }
}

export default useProduct
