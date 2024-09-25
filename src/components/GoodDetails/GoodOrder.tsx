"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import React, { useContext, useState } from "react";
import {
    Button,
    Chip,
    Tooltip,
} from "@nextui-org/react";
import { BsArrowDownShort } from "react-icons/bs";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { HiShoppingCart } from "react-icons/hi2";
import { CartContext } from "@/providers/cart";

interface ProductInfoProps {
    product: ProductWithTotalPrice;
}

const GoodOrder = ({ product }: ProductInfoProps) => {
    const { status, data } = useSession();
    const [quantity, setQuantity] = useState(1);
    const { AddProductsToCart } = useContext(CartContext);

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev === 1 ? prev : prev - 1));
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleAddToCartClick = () => {
        AddProductsToCart({ ...product, quantity });
    };
    return (
        <div className="my-4 flex w-full flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center">
                <Button
                    isIconOnly
                    variant="shadow"
                    startContent={<BiSolidChevronLeft size={20} />}
                    size="sm"
                    className="dark:bg-primaryHotefy-neutral"
                    onClick={handleDecreaseQuantity}
                />
                <span className="px-4">{quantity}</span>
                <Button
                    isIconOnly
                    variant="shadow"
                    className="dark:bg-primaryHotefy-neutral"
                    startContent={<BiSolidChevronRight size={20} />}
                    size="sm"
                    onClick={handleIncreaseQuantity}
                />
            </div>

            <div className="w-full max-w-md">
                {status === "authenticated" && data?.user ? (
                    <Button
                        endContent={<HiShoppingCart size={20} />}
                        variant="shadow"
                        className="w-full font-bold dark:bg-primaryHotefy-neutral "
                        onClick={handleAddToCartClick}
                    >
                        Add to Cart
                    </Button>
                ) : (
                    <Tooltip
                        content={
                            <p className="cursor-default text-center font-bold">
                                Oops! To add this item to your cart you need to
                                log in.
                            </p>
                        }
                        delay={0}
                        closeDelay={0}
                        color="primary"
                        placement="bottom"
                        radius="sm"
                        className="w-full max-w-xs hidden lg:block"
                    >
                        <div className="w-full cursor-not-allowed">
                            <Button
                                endContent={<HiShoppingCart size={20} />}
                                variant="shadow"
                                color="primary"
                                className="w-full font-bold"
                                isDisabled
                            >
                                Add to Cart
                            </Button>
                            <p className="text-red-500 opacity-80 text-sm text-center mt-2 lg:hidden">
                                To add this item to your cart you must be logged in.
                            </p>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    )
}

export default GoodOrder;