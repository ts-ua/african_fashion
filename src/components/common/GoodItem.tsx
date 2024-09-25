"use client";

import React, { useContext, useEffect, useState } from "react";
import { IoBasketSharp } from "react-icons/io5";
import NextImage from "next/image";

import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { CartContext, CartProduct } from "@/providers/cart";
import { computeProductTotalPrice } from "@/helpers/product";
import { useLocalStorage } from "@/hooks/useLocalStorage";


const GoodItem = ({ good }: any) => {
    const [quantity, setQuantity] = useState(0);
    const price = good.price.toString();
    const product = computeProductTotalPrice(good);
    const storedData = localStorage.getItem("@iwufashion/cart-products");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    useEffect(() => {
        const foundItem = parsedData.find((item: any) => item.id === good.id);
        if (foundItem) {
            setQuantity(foundItem.quantity);
        } else {
            setQuantity(0)
        }
    }, [product]);
    const { AddProductsToCart } = useContext(CartContext);
    const handleDecreaseQuantity = () => {
        AddProductsToCart({ ...product, quantity: -1 });
    };
    const handleIncreaseQuantity = () => {
        AddProductsToCart({ ...product, quantity: 1 });
    };

    return (
        <Card
            isPressable
            radius="md"
            className="border-none shadow-none select-none"
        >
            <Link href={`/goods/${good.id}`}>
                <Image
                    className="w-full h-full object-cover aspect-square transform transition duration-300 ease-in-out hover:scale-105"
                    as={NextImage}
                    src={good.coverImage}
                    alt={good.name}
                    width={350}
                    height={350}
                />
            </Link>
            <CardFooter className="flex justify-between bg-primaryHotefy-neutral border-white/20 border-1 overflow-hidden absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 py-2">
                <div className="flex flex-col gap-1 text-xs font-semibold z-50 text-white">
                    <p>{good.name}</p>
                    <p>
                        {parseFloat(price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </p>
                </div>
                <div
                    className={` rounded-full  text-xs font-semibold text-white ${!quantity ? "hover:bg-white hover:text-green-500 bg-[#e74a77]" : "bg-white text-green-700"} duration-200`}
                >
                    {!quantity ? (
                        <div
                            onClick={handleIncreaseQuantity}
                            className="flex gap-6 items-center py-2 px-4">
                            <IoBasketSharp size={25} /><span> Cart</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-foreground ">
                            <div
                                onClick={handleDecreaseQuantity}
                                className="py-3 px-2 bg-[#e74a77] hover:bg-[#e70042] rounded-tl-full rounded-bl-full duration-300">
                                <FaMinus size={16} />
                            </div>
                            <div className="py-3 px-4  bg-[#e74a77] text-[15px] ">
                                {quantity}
                            </div>
                            <div
                                onClick={handleIncreaseQuantity}
                                className="py-3 px-2 bg-[#e74a77] hover:bg-[#e70042] rounded-tr-full rounded-br-full duration-300">
                                <FaPlus size={16} />
                            </div>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>

    );
};

export default GoodItem;
