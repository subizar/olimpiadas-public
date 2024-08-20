import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { updateProduct } from "@/app/dashboard/actions";
import { db } from "@/db";
import { orderProductTable, orderTable, productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Item } from "@/components/UserProductCartView";
import EditCartView from "@/components/editOrderCartView"
import CartView from "@/components/UserProductCartView";

export default async function Page({ params }: { params: { orderId: string } }) {
  const { user, session } = await validateRequest();
  const orderOwner = await db.select().from(orderTable).where(eq(orderTable.id, params.orderId));
  if (orderOwner.length === 0) {
    return redirect("/");
  }
  if (!session || user.id !== orderOwner[0].userId) {
    return redirect("/");
  }

  let products = await (await db.select().from(productTable).all()).map((product) => {
    return product;
  });

  let existingOrder = await (await db.select().from(orderProductTable).where(eq(orderProductTable.orderId, params.orderId))).map((order) => {
    return order;
  });

  // Create a Set of product IDs from the existing order
  const existingProductIds = new Set(existingOrder.map(order => order.productId));

  // Filter products to exclude those in the existing order
  let productsData: Item[] = products
    .filter(product => !existingProductIds.has(product.id))
    .map((product) => ({
      id: product.id,
      productname: product.name,
      description: product.description,
      unitprice: product.unitPrice,
      quantity: 0,
    }));

  let existingOrderData: Item[] = existingOrder.map((order) => ({
    id: order.productId,
    productname: products.find((product) => product.id === order.productId)?.name || "NaN",
    description: products.find((product) => product.id === order.productId)?.description || "NaN",
    unitprice: products.find((product) => product.id === order.productId)?.unitPrice || 0,
    quantity: order.quantity,
  }));

  return (
    //<main className="min-h-screen p-4 bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800">
      <div>
        <EditCartView data={productsData} existingOrder={existingOrderData} orderId={params.orderId} />
      </div>
    //</main>
  );
}