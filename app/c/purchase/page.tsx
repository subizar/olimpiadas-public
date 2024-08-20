import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import CartView from "@/components/UserProductCartView";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { Item } from "@/components/UserProductCartView";
export default async function Page() {
  /* validar */
  const { session } = await validateRequest();

  if (!session) {
    return redirect("/");
  }
  let products = await (await db.select().from(productTable).all()).map((product) => {
    return product;
  });
  let productsData: Item[] = [];
  products.forEach((product) => {
    productsData.push({
      id: product.id,
      productname: product.name,
      description: product.description,
      unitprice: product.unitPrice,
      quantity: 0,
    });
  });
  return (
    <main className="flex max-w-xxxxl w-full flex-col items-center justify-center p-6 space-x-8 bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xxl w-full space-y-4">
        <CartView data={productsData} />
        <div className="flex flex-col space-y-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out">
            Registrar compra
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out">
            Pedidos pendientes
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out">
            Cargar producto
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out">
            Estado de cuenta
          </button>
        </div>
      </div>

    </main>


  );
}
