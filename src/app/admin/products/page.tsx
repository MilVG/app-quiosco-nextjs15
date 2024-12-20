import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";


async function productCount() {
  return await prisma.product.count()
}
async function getProducts(page: number, pageSize: number) {

  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true
    }
  })

  return products
}
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

type Params = Promise<{ page: string }>
export default async function ProductsPage({ searchParams }: { searchParams: Params }) {
  const pageparam = (await searchParams).page
  const pageParam = pageparam || "1"
  const page = Number(pageParam)
  const pageSize = 10

  if (isNaN(page) || page < 1) {

    redirect('/admin/products')
  }

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) {

    redirect('/admin/products')
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={`/admin/products/new`}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
      />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}

