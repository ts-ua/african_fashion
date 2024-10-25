import { CartContext } from "@/providers/cart";
import React, { useContext, useEffect } from "react";
import CartItem from "../cart/cartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Button, Link, Tooltip } from "@nextui-org/react";
import { TbCategory2 } from "react-icons/tb";
import { Separator } from "../ui/separator";
import { AiOutlineSafety } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { ScrollArea } from "../ui/scroll-area";
import { createOrder } from "@/actions/order";
import { createCheckout } from "@/actions/checkout";
import { SheetClose, SheetFooter } from "../ui/sheet";

const Cart = ({ userId }: { userId: string }) => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const { status, data } = useSession();
  const handleFinishPurchaseClick = async () => {
    const order = await createOrder(products, userId);

    const checkout = await createCheckout(products, order.id);
    console.log("checkout:", checkout)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    console.log("stripe:", stripe)
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="relative">
      <div className="my-5 flex flex-col gap-2 overflow-hidden">
        <ScrollArea type="always" style={{ height: 580 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem
                key={product.id}
                product={computeProductTotalPrice(product as any) as any}
              />
            ))
          ) : (
            <div className="my-5 flex flex-col items-center justify-center text-center">
              <h4 className="font-semibold">
                You don't have any products in your cart yet!
              </h4>
              <p>How about taking a look at the options?</p>

              <Link href="/" className="mx-auto mt-4 w-full">
                <Button
                  endContent={<TbCategory2 size={20} />}
                  className="w-full font-semibold"
                  variant="shadow"
                  color="primary"
                >
                  View product catalog
                </Button>
              </Link>
            </div>
          )}
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <p className="font-semibold">Subtotal</p>
            <p>
              {subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="font-semibold">Discounts</p>
            <p className="line-through opacity-80">
              {totalDiscount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="font-semibold">Freight</p>
            <p className="uppercase">Free</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-base">
            <p className="font-semibold">Total</p>
            <p className="font-bold text-gamtech">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <SheetFooter>

            <div className="w-full max-w-xl">
              {userId || data?.user ? (
                <SheetClose asChild>

                  <Button
                    variant="shadow"
                    color="primary"
                    radius="sm"
                    className="w-full font-bold uppercase"
                    endContent={<AiOutlineSafety size={24} />}
                    onClick={handleFinishPurchaseClick}
                  >
                    Checkout
                  </Button>
                </SheetClose>
              ) : (
                <Tooltip
                  content={
                    <p className="cursor-default text-center font-bold">
                      Oops! You need to log in to complete your purchase.
                    </p>
                  }
                  delay={0}
                  closeDelay={0}
                  color="primary"
                  placement="top"
                  radius="sm"
                  className="hidden w-full max-w-xs lg:block"
                >
                  <div className="w-full cursor-not-allowed">
                    <Button
                      variant="shadow"
                      color="primary"
                      radius="sm"
                      className="w-full font-bold uppercase"
                      endContent={<AiOutlineSafety size={24} />}
                      isDisabled
                    >
                      Checkout
                    </Button>
                    <p className="mt-2 text-center text-sm text-red-500 opacity-80 lg:hidden">
                      To complete the purchase you must log in.
                    </p>
                  </div>
                </Tooltip>
              )}
            </div>
          </SheetFooter>
        </div>
      )}
    </div>
  );
};

export default Cart;
