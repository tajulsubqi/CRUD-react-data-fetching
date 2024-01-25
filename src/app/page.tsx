"use client"
import { useFetchProduct } from "@/hooks/useFetchProduct"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react"
import useCreateProduct from "@/hooks/useCreateProduct"
import { useFormik } from "formik"
import useDeleteProduct from "@/hooks/useDeleteProduct"
import useEditProduct from "@/hooks/useEditProduct"

const HomePage = () => {
  const toast = useToast()
  const { products, productIsLoading, error } = useFetchProduct()

  const { createProductIsLoading, mutateCreateProduct } = useCreateProduct()
  const { mutateDeleteProduct, deleteProductLoading } = useDeleteProduct()
  const { mutateEditProduct, editProductIsLoading } = useEditProduct()

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      id: 0,
    },
    onSubmit: () => {
      //melakukan post product
      const { name, price, description, image, id } = formik.values

      if (id) {
        //melakukan fetch products/{id}
        mutateEditProduct({
          name,
          price: parseInt(price),
          description,
          image,
          id,
        })

        //alert ketika succes
        toast({
          title: "Product Edited",
          status: "success",
        })
      } else {
        //melakukan POST /products
        mutateCreateProduct({
          name,
          price: parseInt(price),
          description,
          image,
        })

        //alert ketika succes
        toast({
          title: "Product Added",
          status: "success",
        })
      }

      // untuk mereset inputan
      formik.setFieldValue("name", "")
      formik.setFieldValue("price", "")
      formik.setFieldValue("description", "")
      formik.setFieldValue("image", "")
      formik.setFieldValue("id", "")
    },
  })

  // memunculkan alert untuk confirm delete
  const confirmDelete = (id: any) => {
    const deleteProduct = confirm("Are you sure ?")

    if (deleteProduct) {
      mutateDeleteProduct(id)

      toast({
        title: "Delete Success",
        status: "error",
      })
    }
  }

  const handleFormInput = (e: any) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }

  const onEditClick = (product: any) => {
    formik.setFieldValue("id", product.id)
    formik.setFieldValue("name", product.name)
    formik.setFieldValue("price", product.price)
    formik.setFieldValue("description", product.description)
    formik.setFieldValue("image", product.image)
  }

  const renderProducts = () => {
    return products?.data.map((item: any) => (
      <Tr key={item.id}>
        <Td>{item.name}</Td>
        <Td>{item.price}</Td>
        <Td>{item.description}</Td>
        <Td>{<img src={item.image} alt={item.name} />}</Td>
        <Td>
          {editProductIsLoading ? (
            <Spinner />
          ) : (
            <Button
              onClick={() => {
                onEditClick(item)
              }}
              colorScheme="cyan"
            >
              Edit
            </Button>
          )}
        </Td>

        <Td>
          {deleteProductLoading ? (
            <Spinner />
          ) : (
            <Button
              onClick={() => {
                confirmDelete(item.id)
              }}
              colorScheme="red"
            >
              Delete
            </Button>
          )}
        </Td>
      </Tr>
    ))
  }

  return (
    <>
      <Box>
        <Text align={"center"} my={4}>
          Home Page{" "}
        </Text>
        <Container>
          <Table mb={20}>
            <Thead>
              <Tr>
                <Th color={"white"} fontSize={22}>
                  Name
                </Th>
                <Th color={"white"} fontSize={22}>
                  Price
                </Th>
                <Th color={"white"} fontSize={22}>
                  Description
                </Th>
                <Th color={"white"} fontSize={22}>
                  Image
                </Th>
                <Th colSpan={2} color={"white"} fontSize={22}>
                  Action
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {renderProducts()}
              {productIsLoading && <Spinner width={50} height={50} />}
              {/* {!isLoading ? <Spinner/> : null} */}
            </Tbody>
          </Table>

          <form onSubmit={formik.handleSubmit} className="mb-5">
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Products Name</FormLabel>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={handleFormInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Product ID</FormLabel>
                <Input name="id" value={formik.values.id} onChange={handleFormInput} />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={formik.values.price}
                  type="number"
                  onChange={handleFormInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={handleFormInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  value={formik.values.image}
                  onChange={handleFormInput}
                />
              </FormControl>

              {createProductIsLoading || editProductIsLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" alignItems={"center"} colorScheme="whatsapp">
                  Submit Product
                </Button>
              )}
            </VStack>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default HomePage
