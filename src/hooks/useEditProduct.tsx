import { useMutation } from "@tanstack/react-query"
import { useFetchProduct } from "./useFetchProduct"
import API from "@/libs/axios"
import { useToast } from "@chakra-ui/react"

interface EditProductMutationFn {
  id: number
}

const useEditProduct = () => {
  const { refetchProducts } = useFetchProduct()

  const toast = useToast()

  const { mutate: mutateEditProduct, isLoading: editProductIsLoading }: any = useMutation(
    {
      mutationFn: async (body: EditProductMutationFn) => {
        const response = await API.patch(`/products/${body.id}`, body)

        return response
      },
      onSuccess: () => {
        refetchProducts()
      },
      onError: () => {
        toast({
          title: "Edited Failed",
          status: "error",
        })
      },
    },
  )

  return {
    mutateEditProduct,
    editProductIsLoading,
  }
}

export default useEditProduct
