'use server'

import { CartProduct } from "@/providers/cart";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const createOrder = async (cartProducts: CartProduct[], userId: string) => {
    const order = await prisma.order.create({
        data: {
            userId: userId,
            orderProducts: {
                createMany: {
                    data: cartProducts.map((product) => ({
                        basePrice: product.price,
                        productId: product.id,
                        quantity: product.quantity,
                    })),
                },
            },
        },
    });

    return order;
};
