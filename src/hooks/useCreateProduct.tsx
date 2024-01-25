import API from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
import { useFetchProduct } from "./useFetchProduct"
import { useToast } from "@chakra-ui/react"

const useCreateProduct = () => {
  const { refetchProducts } = useFetchProduct()

  const toast = useToast()

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
      onError: () => {
        toast({
          title: "Created Failed",
          status: "error",
        })
      },
    })

  return {
    mutateCreateProduct,
    createProductIsLoading,
  }
}

export default useCreateProduct
