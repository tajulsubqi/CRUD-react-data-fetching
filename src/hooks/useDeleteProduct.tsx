import API from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
import { useFetchProduct } from "./useFetchProduct"
import { useToast } from "@chakra-ui/react"

const useDeleteProduct = () => {
  const { refetchProducts } = useFetchProduct()

  const toast = useToast()

  const { mutate: mutateDeleteProduct, isLoading: deleteProductLoading }: any =
    useMutation({
      mutationFn: async (id) => {
        const response = await API.delete(`/products/${id}`)
        console.log(response)

        return response
      },
      onSuccess: () => {
        refetchProducts()
      },
      onError: () => {
        toast({
          title: "Deleted Failed",
          status: "error",
        })
      },
    })

  return {
    mutateDeleteProduct,
    deleteProductLoading,
  }
}

export default useDeleteProduct
