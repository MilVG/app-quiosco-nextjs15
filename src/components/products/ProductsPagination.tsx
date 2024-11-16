import Link from "next/link";


type ProductsPaginationProps = {
  page: number
  totalPages: number
}
export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
  return (
    <nav className="flex justify-center py-10">

      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
        >&laquo;</Link>
      )}

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
        >&raquo;</Link>
      )}
    </nav>
  )
}

