import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orderTable, orderProductTable, productTable } from "@/db/schema";
import { eq, NotNull } from "drizzle-orm";
import Link from "next/link";

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
  status: string;
  totalPrice: number;
  products: Product[];
};

type OrderStatus = 'pending' | 'fulfilled' | 'cancelled';
const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
const statusOptions: Record<string, string> = {
  pending: "Pendiente",
  fulfilled: "Completado",
  cancelled: "Cancelado",
}

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
      status: orderTable.status,
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

  const groupedOrders: Record<string, Order> = {};

  ordersRaw.forEach((row) => {
    if (!groupedOrders[row.id]) {
      groupedOrders[row.id] = {
        id: row.id,
        orderDate: row.orderDate,
        fullfiledDate: row.fullfiledDate,
        status: row.status,
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-6 p-4">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Mis pedidos</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No hay pedidos.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="bg-white shadow-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    ID de pedido: {order.id}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status as OrderStatus] || "bg-gray-100 text-gray-800"}`}>
                    {statusOptions[order.status]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-sm">
                  <p className="text-gray-700">
                    Fecha de pedido: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                  {order.fullfiledDate && (
                    <p className="text-gray-700">
                      Completada: {new Date(order.fullfiledDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <h4 className="text-md font-semibold mb-1 text-gray-800">Productos:</h4>
                <ul className="divide-y divide-gray-100">
                  {order.products.map((product) => (
                    <li key={product.id} className="py-2 flex justify-between text-sm">
                    <span className="font-medium text-gray-800">
                    {product.name} <span className="text-gray-500">x{product.quantity ?? "N/A"}</span>
                    </span>
                    <div className="text-gray-600">
                      
                      <span>
                        Precio por unidad: {product.unitPrice ? `$${product.unitPrice.toFixed(2)}` : "N/A"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {order.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <Link href={`pending/edit/${order.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Modificar
                  </Link>
                  <Link href={`pending/remove/${order.id}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Eliminar
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}