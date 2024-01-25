import API from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchProduct = () => {
  const {
    data: products,
    isLoading: productIsLoading,
    error,
    refetch: refetchProducts, //supaya  fungsinya berjalan tanpa harus di refresh
  } = useQuery({
    queryFn: async () => {
      const productResponse = await API.get("/products")
      return productResponse
    },
    queryKey: ["fecth.products"],
  })

  return {
    products,
    productIsLoading,
    refetchProducts,
    error,
  }
}
