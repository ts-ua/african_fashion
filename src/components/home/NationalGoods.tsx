import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from "react";
// import { Good } from "@prisma/client";
import GoodItem from "../common/GoodItem";
import { computeProductTotalPrice } from "@/helpers/product";

const fetchTrips = async () => {
    const goods = await prisma.good.findMany();
    return goods;
};

const GeorgeGoods = async () => {
    const data = await fetchTrips();

    await prisma.$disconnect();

    const africanGoods = data.filter((good: any) => good.name === "BR");

    return (
        <section className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
            {africanGoods.map((good: any) => (
                <GoodItem good={good} key={good.id} product={computeProductTotalPrice(good)} />
            ))}
        </section>
    );
};

export default GeorgeGoods;
