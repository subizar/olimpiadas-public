"use server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function cancelOrder(formData: FormData) {
  const orderId = formData.get('orderId') as string;

  await db.update(orderTable).set({
    status: "cancelled",
    fullfiledDate: new Date().getTime(),
  }).where(eq(orderTable.id, orderId));
  return redirect("/dashboard/pending");
}

export async function completeOrder(formData: FormData) {
  const orderId = formData.get('orderId') as string;
  await db.update(orderTable).set({
    status: "fulfilled",
    fullfiledDate: new Date().getTime(),
  }).where(eq(orderTable.id, orderId));
  return redirect("/dashboard/pending");
}