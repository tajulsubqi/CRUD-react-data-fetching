import API from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
import { useFetchProduct } from "./useFetchProduct"

const useCreateProduct = () => {
  const { refetchProducts } = useFetchProduct()

  const { mutate: mutateCreateProduct, isLoading: createProductIsLoading }: any =
    useMutation({
      mutationFn: async (body) => {
        const response = await API.post("/products", body)
        console.log(response.data)

        return response
      },
      onSuccess: () => {
        refetchProducts()
      },
    })

  return {
    mutateCreateProduct,
    createProductIsLoading,
  }
}

export default useCreateProduct
