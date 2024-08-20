"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import QuantitySelect from "@/components/QuantitySelect";
import { createOrder } from "@/app/c/purchase/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export interface Item {
  id: string;
  productname: string;
  description: string;
  unitprice: number;
  quantity: number;
}

export interface orderitem {
  id: string;
  unitprice: number;
  quantity: number;
}

const carrito: orderitem[] = [];
const pedididosIniciales: Item[] = [];

export default function CartView({ data}: { data: Item[]}) {
  const [products, setProductos] = useState(data);
  const [pedidos, setPedidos] = useState(pedididosIniciales);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items =
        source.droppableId === "products"
          ? Array.from(products)
          : Array.from(pedidos);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      source.droppableId === "products"
        ? setProductos(items)
        : setPedidos(items);
    } else {
      const itemsFuente =
        source.droppableId === "products"
          ? Array.from(products)
          : Array.from(pedidos);
      const itemsDestino =
        destination.droppableId === "products"
          ? Array.from(products)
          : Array.from(pedidos);
      const [itemMovido] = itemsFuente.splice(source.index, 1);
      itemsDestino.splice(destination.index, 0, itemMovido);

      source.droppableId === "products"
        ? setProductos(itemsFuente)
        : setPedidos(itemsFuente);
      destination.droppableId === "products"
        ? setProductos(itemsDestino)
        : setPedidos(itemsDestino);

      if (destination.droppableId === "pedidos" && !itemMovido.quantity) {
        itemMovido.quantity = 1;
      }
    }
  };
  const handleQuantityChange = useCallback(
    (newQuantity: number, productId: string) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    },
    []
  );
  
  function sendOrder() {
    const order: orderitem[] = [];
    pedidos.forEach(({ id, unitprice }) => {
      order.push({ id, unitprice, quantity: quantities[id] });
    });
    createOrder(order);
  }
  const total = useMemo(() => {
    return pedidos.reduce((sum, { id, unitprice }) => {
      const quantity = quantities[id] || 1;
      return sum + unitprice * quantity;
    }, 0);
  }, [pedidos, quantities]);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <div className="flex space-x-4 max-h-120 overflow-y-auto">
          <Droppable droppableId="products">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-50 shadow-md rounded-lg p-6 w-full text-gray-800 "
              >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Lista de productos
                </h1>
                <ul className="space-y-2 max-h-96 overflow-y-auto">
                  {products.map(
                    ({ id, productname, unitprice, description }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 bg-white rounded shadow"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <h3>{productname}</h3>
                                <span>${unitprice}</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {description}
                              </span>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="pedidos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-50 shadow-md rounded-lg p-6 w-full text-gray-800 "
              >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Carrito de compra
                </h1>
                <ul className="space-y-2 max-h-96 overflow-y-auto">
                  {pedidos.map(
                    ({ id, productname, unitprice, quantity }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 bg-white rounded shadow"
                          >
                            <div className="flex items-center justify-between">
                              <span>{productname}</span>
                              <span>${unitprice}</span>
                            </div>

                            <QuantitySelect
                              onQuantityChange={handleQuantityChange}
                              productId={id}
                              initialQuantity={quantities[id] || 1}
                            />
                          </li>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </ul>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Total: ${total}
                  </h2>
                  <button onClick={sendOrder}>Comprar</button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
