import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })
  return products
}

type Params = Promise<{ search: string }>
export default async function SearchPage({ searchParams }: { searchParams: Params }) {

  const searchparam = (await searchParams).search
  const products = await searchProducts(searchparam)
  return (
    <>
      <Heading>Resultados de búsqueda {searchparam}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

        <ProductSearchForm />
      </div>

      {products.length ? (

        <ProductTable
          products={products}
        />
      ) : <p className="text-center text-lg">No hay resultados</p>}
    </>
  )
}

