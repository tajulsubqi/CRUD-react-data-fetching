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

const HomePage = () => {
  const { products, productIsLoading, refetchProducts } = useFetchProduct()
  const { createProductIsLoading, mutateCreateProduct } = useCreateProduct()
  const { mutateDeleteProduct } = useDeleteProduct()

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
    onSubmit: () => {
      //melakukan post product
      const { name, price, description, image } = formik.values
      mutateCreateProduct({
        name,
        price: parseInt(price),
        description,
        image,
      })

      // untuk mereset inputan
      formik.setFieldValue("name", "")
      formik.setFieldValue("price", "")
      formik.setFieldValue("description", "")
      formik.setFieldValue("image", "")

      //alert ketika succes
      toast({
        title: "Product Added",
        status: "success",
      })
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

  const renderProducts = () => {
    return products?.data.map((item: any) => (
      <Tr key={item.id}>
        <Td>{item.name}</Td>
        <Td>{item.price}</Td>
        <Td>{item.description}</Td>
        <Td>{<img src={item.image} alt={item.name} />}</Td>
        <Td>
          <Button
            onClick={() => {
              confirmDelete(item.id)
            }}
            colorScheme="red"
          >
            Delete
          </Button>
          {/* <img src={item.image} alt={item.name} /> */}
          {/* <Image src={item.image} alt={item.name} width={40} height={40} /> */}
        </Td>
      </Tr>
    ))
  }

  return (
    <>
      <Box>
        <Text align={"center"} my={4}>
          {" "}
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
                <Th color={"white"} fontSize={22}>
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

              {createProductIsLoading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  alignItems={"center"}
                  _hover={{
                    bgColor: "skyblue",
                    color: "white",
                    transitionDuration: "300ms",
                  }}
                  _active={{ bgColor: "blue", color: "white" }}
                >
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
