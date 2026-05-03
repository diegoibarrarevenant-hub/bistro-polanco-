"use client";

import { useState, useCallback } from "react";
import type { Cart, CartItem } from "@/types";

const EMPTY_CART: Cart = {
  items: [],
  orderType: "DINE_IN",
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => {
      const key = item.variantId ?? item.menuItemId ?? item.wineBottleId ?? item.tastingMenuId;
      const existingIdx = prev.items.findIndex(
        (i) => (i.variantId ?? i.menuItemId ?? i.wineBottleId ?? i.tastingMenuId) === key
      );
      if (existingIdx !== -1) {
        const updated = [...prev.items];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + item.quantity,
        };
        return { ...prev, items: updated };
      }
      return { ...prev, items: [...prev.items, item] };
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
      return;
    }
    setCart((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], quantity };
      return { ...prev, items: updated };
    });
  }, []);

  const clearCart = useCallback(() => setCart(EMPTY_CART), []);

  const updateMeta = useCallback((meta: Partial<Omit<Cart, "items">>) => {
    setCart((prev) => ({ ...prev, ...meta }));
  }, []);

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, updateMeta, subtotal, itemCount };
}
