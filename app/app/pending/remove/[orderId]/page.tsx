import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orderProductTable, orderTable, productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { orderId: string } }) {
    const { user, session } = await validateRequest();

    const orderOwner = await db.select().from(orderTable).where(eq(orderTable.id, params.orderId));
    if (orderOwner.length === 0) {
        return redirect("/");
      }
    if (!session || user.id !== orderOwner[0].userId) {
        return redirect("/");
    }
    try {
        await db
        .delete(orderProductTable)
        .where(eq(orderProductTable.orderId, params.orderId));
  
      // Delete the order from orderTable
      await db
        .delete(orderTable)
        .where(eq(orderTable.id, params.orderId));

    } catch (e) {
        console.log(e);
        return {
            error: "error al eliminar producto"
        };
    }
    return redirect(`/app/pending?timestamp=${Date.now()}`);
}