import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orderTable, orderProductTable, productTable } from "@/db/schema";
import { eq, NotNull } from "drizzle-orm";

// Define types for our data structures
type Product = {
  id: string;
  name: string | null;
  quantity: number | null;
  unitPrice: number | null;
};

type Order = {
  id: string;
  orderDate: number;
  fullfiledDate: number | null;
  totalPrice: number;
  products: Product[];
};

export default async function Page() {
  const { session } = await validateRequest();

  if (!session) {
    return redirect("/");
  }

  const ordersRaw = await db
    .select({
      id: orderTable.id,
      orderDate: orderTable.orderDate,
      fullfiledDate: orderTable.fullfiledDate,
      totalPrice: orderTable.totalPrice,
      productId: productTable.id,
      productName: productTable.name,
      quantity: orderProductTable.quantity,
      unitPrice: productTable.unitPrice,
    })
    .from(orderTable)
    .leftJoin(orderProductTable, eq(orderTable.id, orderProductTable.orderId))
    .leftJoin(productTable, eq(orderProductTable.productId, productTable.id))
    .where(eq(orderTable.userId, session.userId));

  // Group products by order
  const groupedOrders: Record<string, Order> = {};

  ordersRaw.forEach((row) => {
    if (!groupedOrders[row.id]) {
      groupedOrders[row.id] = {
        id: row.id,
        orderDate: row.orderDate,
        fullfiledDate: row.fullfiledDate,
        totalPrice: row.totalPrice,
        products: [],
      };
    }
    if (row.productId) {
      groupedOrders[row.id].products.push({
        id: row.productId,
        name: row.productName,
        quantity: row.quantity,
        unitPrice: row.unitPrice,
      });
    }
  });

  const orders = Object.values(groupedOrders);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
              {order.fullfiledDate && (
                <p>
                  Fulfilled Date:{" "}
                  {new Date(order.fullfiledDate).toLocaleDateString()}
                </p>
              )}
              <h4>Products:</h4>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name || "Unnamed Product"} - Quantity:{" "}
                    {product.quantity ?? "N/A"} - Unit Price:{" "}
                    {product.unitPrice
                      ? `$${product.unitPrice.toFixed(2)}`
                      : "N/A"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
