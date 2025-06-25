/*
import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(cartCtrl.count());

  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
  }, []);

  const addCart = (game) => {
    cartCtrl.add(game);
    refreshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartCtrl.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };


  const deleteItem= (gameId) =>{
    cartCtrl.delete(gameId);
    refreshTotalCart();
  };

 const deleteAllItems= () => {
  cartCtrl.deleteAll();
  refreshTotalCart();
 };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
*/

import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔁 Cargar al montar
  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);
    setTotal(cartCtrl.count());
  }, []);

  // 🛒 Agregar
  const addCart = (game) => {
    cartCtrl.add(game);
    refreshTotalCart();
  };

  // 📝 Cambiar cantidad
  const changeQuantityItem = (gameId, quantity) => {
    cartCtrl.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };

  // ❌ Eliminar individual
  const deleteItem = (gameId) => {
    cartCtrl.delete(gameId);
    refreshTotalCart();
  };

  // ❌ Eliminar todo
  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart(); // ⚠️ Aquí actualiza el estado
  };

  // 🔄 Refrescar estados del carrito
  const refreshTotalCart = () => {
    const items = cartCtrl.getAll();
    setCart(items);                 // 👈 Asegura actualización del array
    setTotal(cartCtrl.count());     // 👈 Asegura actualización del contador
  };

  const data = {
    cart,
    total,
    addCart,
    changeQuantityItem,
    deleteItem,
    deleteAllItems,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}