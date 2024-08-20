"use client";

import React, { useEffect } from "react";

interface QuantitySelectProps {
  onQuantityChange: (quantity: number, productId: string) => void;
  productId: string;
  initialQuantity: number;
}

export default function QuantitySelect({ onQuantityChange, productId, initialQuantity }: QuantitySelectProps) {
  const [quantity, setQuantity] = React.useState(initialQuantity);


  function addQuantity() {
    setQuantity(prevQuantity => prevQuantity + 1);
  }

  function removeQuantity() {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }

  useEffect(() => {
    onQuantityChange(quantity, productId);
  }, [quantity, productId, onQuantityChange]);

  return (
    <div className="bg-background rounded-lg border p-1 flex items-center justify-between max-w-xs space-x-3 w-40 pr-3 pl-3">
      <label htmlFor="number-picker" className="text-sm font-medium">
        Cantidad
      </label>
      <div className="flex items-center space-x-4">
        <button
          className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          onClick={removeQuantity}
        >
          <h3>-</h3>
          <span className="sr-only">Decrement</span>
        </button>
        <div className="text-m font-bold">{quantity}</div>
        <button
          className="text-muted-foreground hover:bg-muted hover:text-muted-foreground"
          onClick={addQuantity}
        >
          <h3>+</h3>
          <span className="sr-only">Increment</span>
        </button>
      </div>
    </div>
  );
}