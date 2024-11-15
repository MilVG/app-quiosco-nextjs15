import { prisma } from "@/lib/prisma"
import CategoryIcon from "./ui/CategoryIcon"
import Logo from "./ui/Logo"

async function getCategorires() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categorires = await getCategorires()

  return (
    <aside
      className="md:w-72 md:h-screen bg-white"
    >
      <Logo />
      <nav className="mt-10">
        {categorires.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}

