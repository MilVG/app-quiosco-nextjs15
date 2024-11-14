"use client"
import { useStoreQuiosco } from "@/stores/store"
import ProductDetails from "./order/ProductDetails"
export default function OrderSummary() {
  const order = useStoreQuiosco((state) => state.order)
  return (
    <aside
      className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5"
    >
      <h1 className="text-4xl text-center text-black">Mi Pedido</h1>

      {order.length === 0 ? <p className="text-center my-10 text-black">El carrito está vacio</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </aside>
  )
}


