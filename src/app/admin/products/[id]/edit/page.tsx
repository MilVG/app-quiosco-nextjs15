import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  if (!product) {
    notFound()
  }
  return product
}

type Params = Promise<{ id: string }>
export default async function EditProductPage({ params }: { params: Params }) {
  const idprm = (await params).id
  const product = await getProductById(+idprm)
  console.log(product)
  return (
    <div>EditProductPage</div>
  )
}

