import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { addProduct, deleteProduct } from "@/app/dashboard/actions";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import Link from "next/link";

export default async function Page() {
  const { user, session } = await validateRequest();
  if (!session || user.role !== "sales") {
    return redirect("/");
  }

  const products = await db.select().from(productTable).all();

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Productos</h1>
        
        <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3">Crear nuevo producto</h2>
          <form action={addProduct} className="grid grid-cols-1 gap-3">
            <div>
              <label htmlFor="productname" className="block text-sm font-medium mb-1">Nombre</label>
              <input name="productname" id="productname" className="w-full border rounded px-2 py-1 text-sm" />
            </div>
            <div>
              <label htmlFor="desc" className="block text-sm font-medium mb-1">Descripción</label>
              <textarea 
                name="desc" 
                id="desc" 
                rows={3}
                className="w-full border rounded px-2 py-1 text-sm resize-vertical"
              ></textarea>
            </div>
            <div>
              <label htmlFor="unitprice" className="block text-sm font-medium mb-1">Precio Unitario</label>
              <input name="unitprice" id="unitprice" className="w-full border rounded px-2 py-1 text-sm" type="number" step="0.01" />
            </div>
            <div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out">
                Agregar Producto
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Lista de Productos</h2>
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center p-2">
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <p className="text-sm font-semibold whitespace-nowrap">${product.unitPrice.toFixed(2)}</p>
                    <Link href={`/dashboard/edit/${product.id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-300 ease-in-out">
                        Editar
                      </button>
                    </Link>
                    <form action={deleteProduct} className="inline">
                      <input type="hidden" name="productId" value={product.id} />
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-300 ease-in-out">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}