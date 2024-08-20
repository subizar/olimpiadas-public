import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { updateProduct } from "@/app/dashboard/actions";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({ params }: { params: { productId: string } }) {
  const { user, session } = await validateRequest();
  if (!session || user.role !== "sales") {
    return redirect("/");
  }

  const productId = params.productId;
  const product = (await db.select().from(productTable).where(eq(productTable.id, productId)))[0];

  if (!product) {
    return redirect("/dashboard");
  }

  return (
    <main className="min-h-screen p-4 bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Producto</h1>

        <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <form action={updateProduct} method="post" className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            
            <div>
              <label htmlFor="productname" className="block text-sm font-medium mb-1">Nombre</label>
              <input 
                name="productname" 
                id="productname" 
                className="w-full border rounded px-2 py-1 text-sm" 
                defaultValue={product.name}
              />
            </div>

            <div>
              <label htmlFor="desc" className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                name="desc"
                id="desc"   
                rows={4}
                className="w-full border rounded px-2 py-1 text-sm resize-vertical"
                defaultValue={product.description}
              />
            </div>

            <div>
              <label htmlFor="unitprice" className="block text-sm font-medium mb-1">Precio Unitario</label>
              <input 
                name="unitprice" 
                id="unitprice" 
                type="number"
                step="0.01"
                className="w-full border rounded px-2 py-1 text-sm" 
                defaultValue={product.unitPrice}
              />
            </div>

            <div className="flex justify-between items-center">
              <Link href="/c/dashboard">
                <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out">
                Actualizar Producto
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}