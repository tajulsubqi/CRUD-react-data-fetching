import API from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
import { useFetchProduct } from "./useFetchProduct"

const useDeleteProduct = () => {
  const { refetchProducts } = useFetchProduct()

  const { mutate: mutateDeleteProduct } = useMutation({
    mutationFn: async (id) => {
      const response = await API.delete(`/products/${id}`)
      console.log(response)

      return response
    },
    onSuccess: () => {
      refetchProducts()
    },
  })

  return {
    mutateDeleteProduct,
  }
}

export default useDeleteProduct
