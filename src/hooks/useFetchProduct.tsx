import API from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchProduct = () => {
  const {
    data: products,
    isLoading: productIsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryFn: async () => {
      const productResponse = await API.get("/products")

      return productResponse
    },
    queryKey: ["prodcuts"],
  })

  return {
    products,
    productIsLoading,
    refetchProducts,
  }
}
