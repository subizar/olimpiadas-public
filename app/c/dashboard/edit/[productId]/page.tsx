import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import {updateProduct } from "@/app/c/dashboard/actions";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({params}: {params: {productId: string}}) {
    const { user, session } = await validateRequest();
    if (!session) {
        return redirect("/");
      }
      if (user.role !== "sales") {
        return redirect("/")
      }

    const productId = await params.productId;
    const product = (await db.select().from(productTable).where(eq(productTable.id, productId)))[0];
    return (
        <div className="flex space-x-2 space-y-2 text-white flex-col justify-center items-center min-h-screen">
            <form action={updateProduct} method="post" className="text-white space-y-1 space-x-1">
                <input type="hidden" name="productId" value={product.id} />
                <label htmlFor="productname">Nombre</label>
                <input name="productname" id="productname" className="text-black" defaultValue={product.name} />
                <div className=" flex flex-row min-h-full justify-center items-center">
                    <label htmlFor="desc">Descripción</label>
                    <textarea 
                        name="desc" 
                        id="desc" 
                        className="text-black resize-none min-h-40 max-w-xs"
                        defaultValue={product.description}
                    />
                </div>
                <label htmlFor="unitprice">Precio Unitario</label>
                <input name="unitprice" id="unitprice" className="text-black" defaultValue={product.unitPrice} />
                <br />
                <button>Actualizar</button>
            </form>
        </div>
    )
}