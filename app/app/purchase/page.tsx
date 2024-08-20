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
    //<main className="flex max-w-xxxxl w-full flex-col items-center justify-center p-6 space-x-8 bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 max-w-xxl w-full space-y-4">
        <CartView data={productsData} />
      </div>
    //</main>
  );
}
