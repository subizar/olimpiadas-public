import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import CartView from "@/components/UserProductCartView";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { Item } from "@/components/UserProductCartView";
export default async function Page() {
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
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 max-w-xxl w-full space-y-4">
        <CartView data={productsData} />
      </div>
  );
}
