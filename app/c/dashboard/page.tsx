import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { addProduct, deleteProduct } from "./actions";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import Link from "next/link";
export default async function Page() {
  /* validar */

  const { user, session } = await validateRequest();

  if (!session) {
    return redirect("/");
  }
  if (user.role !== "sales") {
    return redirect("/")
  }
  const products = await db.select().from(productTable).all();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 space-y-3 bg-gradient-to-r from-gray-100 to-blue-100 text-black">
      <h1>Crear nuevo producto</h1>
      <form action={addProduct} className="space-y-2 space-x-2">
        <label htmlFor="productname">Nombre</label>
        <input name="productname" id="productname" className="text-black" />
        <br />
        <label htmlFor="desc">Descripción</label>
        <input name="desc" id="desc" className="text-black" />
        <br />
        <label htmlFor="unitprice">Precio Unitario</label>
        <input name="unitprice" id="unitprice" className="text-black" />
        <br />
        <button>Agregar</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id} className="col-span-1 flex shadow-sm rounded-md">
            <div className="flex-shrink-0 flex items-center justify-center w-16 bg-blue-500 text-white text-sm font-medium rounded-l-md">
              {product.name}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <p className="text-gray-900 truncate text-wrap max-w-xs">{product.description}</p>
              </div>
              <div className="flex-shrink-0 pr-2 justify-center items-center">
                <p className="text-sm font-medium text-gray-900 truncate">${product.unitPrice}</p>
              </div>
            </div>

            <div className="flex space-y-2 space-x-2 flex-col justify-center items-center">
              <Link href={`/c/dashboard/edit/${product.id}`}>
                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out">
                    Editar
                  </button>
                </div>
              </Link>
              {/*el usuario podría modificar este input y borrar el producto que quiera. no importa porque el admin tiene permisos para borrar todos los productos. puede ser un problema en el tema del usuario a la hora de borrar cosas del carrito*/}
              <form action={deleteProduct}>
                <input type="hidden" name="productId" id="productId" value={product.id} />
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out">
                  Eliminar
                </button>
              </form>
            </div>

          </li>
        ))}
      </ul>
    </main>
  );
}
