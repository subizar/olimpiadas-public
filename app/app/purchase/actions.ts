"use server";

import {
  orderProductTable,
  orderTable,
  productTable,
  sessionTable,
} from "@/db/schema";
import { db } from "@/db";
import { orderitem } from "@/components/UserProductCartView";
import { generateIdFromEntropySize } from "lucia";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { get } from "http";
import { redirect } from "next/navigation";

export async function createOrder(product: orderitem[]) {
  const { user, session } = await validateRequest();
  if (session && user && session.userId !== null) {
    const orderid = generateIdFromEntropySize(10);
    if (db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, session.userId))
      .all() === null) {
      return { error: "No existe sesión" }
    }
    const totalPrice = product.reduce((acc, curr) => acc + curr.quantity * curr.unitprice, 0);
    const order = await db.insert(orderTable).values({
      id: orderid,
      userId: session.userId,
      orderDate: (new Date()).getTime(),
      totalPrice: totalPrice,
    });
    const purchase = product.map(({ id, quantity }) => {
      return db.insert(orderProductTable).values({
        orderId: orderid,
        productId: id,
        quantity: quantity,
      });
    });
    await Promise.all(purchase);
    redirect("/app/pending");
  }
}

export async function editOrder(product: orderitem[], orderId: string) {
  const { user, session } = await validateRequest();
  if (session && user && session.userId !== null) {
    await db
      .delete(orderProductTable)
      .where(eq(orderProductTable.orderId, orderId));

    // 2. Insert new order items
    const newOrderItems = product.map(({ id, quantity }) => {
      return db.insert(orderProductTable).values({
        orderId: orderId,
        productId: id,
        quantity: quantity,
      });
    });
    await Promise.all(newOrderItems);

    // 3. Update total price in the order table
    const totalPrice = product.reduce(
      (acc, curr) => acc + curr.quantity * curr.unitprice, 0);
    await db
      .update(orderTable)
      .set({ totalPrice: totalPrice })
      .where(eq(orderTable.id, orderId));

    redirect("/app/pending");


  }

}
