import { prisma } from "@/lib/prisma"
import CategoryIcon from "./ui/CategoryIcon"

async function getCategorires() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categorires = await getCategorires()

  return (
    <aside
      className="md:w-72 md:h-screen bg-white"
    >
      <nav className="mt-10">
        {categorires.map(category => (
          <CategoryIcon />
        ))}
      </nav>
    </aside>
  )
}

