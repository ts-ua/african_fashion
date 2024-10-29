'use server'

const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";
import { CartProduct } from "@/providers/cart";
import Stripe from "stripe";
const prisma = new PrismaClient();

export async function GET(req: Request) {

  const url = new URL(req.url); // Convert the request URL to a URL object
  const checkoutId = url.searchParams.get("checkoutId"); // Get the query parameter 'checkoutId'

  console.log("checkoutId:", checkoutId);
}
export async function POST(request: Request) {
  const body = await request.json();
  const { products, orderId } = body;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-09-30.acacia",
    });

    if (!Array.isArray(products)) {
      throw new Error('Expected products to be an array');
    }

    const checkout = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://192.168.21.5:3000/orders",
      cancel_url: "http://192.168.21.5:3000/",
      metadata: {
        orderId,
      },
      line_items: products.map((product) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.totalPrice * 100), // Convert to integer cents
        },
        quantity: product.quantity,
      })),
    });

    return NextResponse.json(checkout, { status: 200 });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
