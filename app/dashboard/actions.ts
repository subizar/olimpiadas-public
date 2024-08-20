import { redirect } from "next/navigation";
import { productTable, orderProductTable, orderTable } from "@/db/schema";
import { db } from "@/db";
import { generateIdFromEntropySize } from "lucia";
import { eq } from "drizzle-orm";

export default async function Page() { }

export async function addProduct(formData: FormData) {
	"use server";
	const productname = formData.get("productname");
	if (
		typeof productname !== "string" ||
		productname.length < 3 ||
		productname.length > 63 ||
		!/^[a-zA-Z0-9_\- áéíóúñ]+$/.test(productname.toLowerCase())
	) {
		return {
			error: "Invalid product name"
		};
	}
	const desc = formData.get("desc");
	if (typeof desc !== "string" || desc.length > 1023) {
		return {
			error: "Invalid description"
		};
	}
	const unitprice = formData.get("unitprice");
	if (
		typeof unitprice !== "string" ||
		!/^[0-9]+$/.test(unitprice)
	) {
		return {
			error: "Invalid price"
		};
	}
	const productId = generateIdFromEntropySize(10);
	try {
		await db.insert(productTable).values({
			id: productId,
			name: productname,
			description: desc,
			unitPrice: Number(unitprice),
		});
		console.log("product created");
	} catch (e) {
		console.log(e);
		return {
			error: "error al agregar producto"
		};
	}

	return redirect("/dashboard");
}

export async function deleteProduct(formData: FormData) {
	"use server";
	const productId = formData.get("productId") as string;
	console.log(productId);
	try {
		const ordersToDelete = await db
		.select({ orderId: orderProductTable.orderId })
		.from(orderProductTable)
		.where(eq(orderProductTable.productId, productId));
		const orderIds = ordersToDelete.map(order => order.orderId);

		if (orderIds.length > 0) {
		  await db
			.delete(orderProductTable)
			.where(eq(orderProductTable.orderId, orderIds[0]));

		  await db
			.delete(orderTable)
			.where(eq(orderTable.id, orderIds[0]));
		}

	} catch (e) {
		console.log(e);
		return {
			error: "error al eliminar producto"
		};
	}

	try {
		await db.delete(productTable).where(eq(productTable.id, productId));
		console.log("product deleted");

	} catch (e) {
		console.log(e);
		return {
			error: "error al eliminar producto"
		};
	}
	return redirect("/dashboard");
}

export async function updateProduct(formData: FormData) {
	"use server";
	const productId = formData.get("productId") as string;
	const productname = formData.get("productname");
	if (
		typeof productname !== "string" ||
		productname.length < 3 ||
		productname.length > 63 ||
		!/^[a-z0-9_\- ]+$/.test(productname.toLowerCase())
	) {
		return {
			error: "Invalid product name"
		};
	}
	const desc = formData.get("desc");
	if (typeof desc !== "string" || desc.length > 1023) {
		return {
			error: "Invalid description"
		};
	}
	const unitprice = formData.get("unitprice");
	if (
		typeof unitprice !== "string" ||
		!/^[0-9]+$/.test(unitprice)
	) {
		return {
			error: "Invalid price"
		};
	}

	try {
		await db.update(productTable).set({
			name: productname,
			description: desc,
			unitPrice: Number(unitprice),
		}).where(eq(productTable.id, productId));
		console.log("product updated");
	} catch (e) {
		console.log(e);
		return {
			error: "error al actualizar producto"
		};
	}
	return redirect("/dashboard");
}