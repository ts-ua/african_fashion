import { Good } from "@prisma/client";

export interface ProductWithTotalPrice extends Good {
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Good,
): ProductWithTotalPrice => {
  return {
    ...product,
    totalPrice: Number(product.price),
  };
};
