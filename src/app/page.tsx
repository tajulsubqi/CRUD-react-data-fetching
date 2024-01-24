"use client"
import {
  Box,
  Container,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import API from "@/libs/axios"

const HomePage = () => {
  // const { data: products, isloading } = useProduct()

  const { data: product, isloading } = useQuery({
    queryFn: async () => {
      const productResponse = await API.get("/products")

      return productResponse
    },
    queryKey: ["prodcuts"],
  })

  console.log(isloading)

  const renderProducts = () => {
    return (
      <>
        {product?.data.map((item: any) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.price}</Td>
            <Td>{item.description}</Td>
            <Td>
              {" "}
              <img src={item.image} alt={item.name} />
              {/* <Image src={item.image} alt={item.name} width={40} height={40} /> */}
            </Td>
          </Tr>
        ))}
      </>
    )
  }

  return (
    <>
      <Box>
        <h2 className="flex justify-center my-3">hello</h2>
        <Container>
          <Table>
            <Thead>
              <Tr>
                <Th fontSize={22}>Name</Th>
                <Th fontSize={22}>Price</Th>
                <Th fontSize={22}>Description</Th>
                <Th fontSize={22}>Image</Th>
              </Tr>
            </Thead>
            <Tbody>
              {renderProducts()}
              {!isloading && <Spinner width={90} height={90} />}
            </Tbody>
          </Table>
        </Container>
      </Box>
    </>
  )
}

export default HomePage
