import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prisma"

async function getProducts(category: string) {

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}


type Params = Promise<{ category: string }>
export default async function OrderPage({ params }: { params: Params }) {
  const categoryparam = (await params).category
  const products = await getProducts(categoryparam)

  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuacion
      </Heading>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start"
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}

