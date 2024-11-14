import { create } from "zustand"
import { OrderItem } from "../types"
import { Product } from "@prisma/client"

interface Store {
  order: OrderItem[]
  addToCard: (product: Product) => void
}
export const useStoreQuiosco = create<Store>((set) => ({
  order: [],
  addToCard: (product) => {

    const { categoryId, image, ...data } = product
    set((state) => ({

      order: [...state.order, {
        ...data,
        quantity: 1,
        subtotal: 1 * product.price
      }]
    }))
  }
}))
