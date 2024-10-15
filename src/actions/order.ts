'use server'

import { CartProduct } from "@/providers/cart";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Function to create an order
export const createOrder = async (cartProducts: CartProduct[], userId: string) => {
    const order = await prisma.orders.create({
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

// Function to create trigger and notify function
export const createTriggerAndNotifyFunction = async () => {
    try {
        // Create the notify_new_order function
        await prisma.$executeRawUnsafe(`
            CREATE OR REPLACE FUNCTION notify_new_order()
            RETURNS trigger AS $$
            BEGIN
                PERFORM pg_notify('new_order', row_to_json(NEW)::text);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        // Create the new_order_trigger trigger
        await prisma.$executeRawUnsafe(`
            CREATE TRIGGER new_order_trigger
            AFTER INSERT ON orders
            FOR EACH ROW
            EXECUTE FUNCTION notify_new_order();
        `);

        console.log('Trigger and notification function have been created!');
    } catch (error) {
        console.error('Error creating trigger:', error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the trigger creation function when your server starts
createTriggerAndNotifyFunction()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
