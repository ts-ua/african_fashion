"use client";
import { ProductWithTotalPrice } from "@/helpers/product";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  numTotalItems: number;
  AddProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  numTotalItems: 0,
  AddProductsToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProductFromCart: () => { },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useLocalStorage<CartProduct[]>(
    "@fsw-store/cart-products",
    [],
  );
  const [uniqueProductIds, setUniqueProductIds] = useState<Set<string>>(
    new Set(),
  );
  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@iwufashion/cart-products") || "[]"),
    );
  }, [setProducts]);

  useEffect(() => {
    setUniqueProductIds(new Set(products.map((product) => product.id)));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("@iwufashion/cart-products", JSON.stringify(products));
  }, [products]);

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = useMemo(() => {
    return subtotal - total;
  }, [total, subtotal]);

  const AddProductsToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      toast.success(`Product added to cart!`, {
        style: { fontSize: "0.8rem" },
        duration: 700,
      });
    } else {
      setUniqueProductIds((prevIds) => new Set([...prevIds, product.id]));

      setProducts((prev) => [...prev, product]);
      toast.success(`Product added to cart!`, {
        style: { fontSize: "0.8rem" },
        duration: 700,
      });
    }
  };

  const numTotalItems = uniqueProductIds.size;

  const decreaseProductQuantity = (productId: string) => {
    let itemRemoved = false;
    setProducts((prev) => {
      const newProducts = prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            const newQuantity = cartProduct.quantity - 1;
            if (newQuantity === 0) {
              setUniqueProductIds((prevIds) => {
                const newIds = new Set(prevIds);
                newIds.delete(productId);
                return newIds;
              });
            }
            return {
              ...cartProduct,
              quantity: newQuantity,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0);

      if (!itemRemoved && newProducts.length < prev.length) {
        itemRemoved = true;
        toast.success(`Product removed from cart!`, {
          style: { fontSize: "0.8rem" },
          duration: 700,
        });
      }

      return newProducts;
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    toast.success(`Product removed!`, {
      style: { fontSize: "0.7rem" },
    });

    setProducts((prev) => {
      const productToRemove = prev.find(
        (cartProduct) => cartProduct.id === productId,
      );

      if (productToRemove) {
        setUniqueProductIds((prevIds) => {
          const newIds = new Set(prevIds);
          newIds.delete(productId);
          return newIds;
        });
      }
      return prev.filter((cartProduct) => cartProduct.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        AddProductsToCart,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0,
        total,
        subtotal,
        totalDiscount,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        numTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
