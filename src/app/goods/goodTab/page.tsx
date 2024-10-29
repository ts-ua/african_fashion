'use client'

import React, { useEffect } from "react";
import GoodItem from "@/components/common/GoodItem";
import { Button } from "@nextui-org/react";

interface SelGoodsProps {
    text: string;
}

const SelGoods: React.FC<SelGoodsProps> = ({ text }) => {

    const [goods, setGoods] = React.useState<any[]>([]);
    const [visible, setVisible] = React.useState(12);
    useEffect(() => {
        const fetchGoods = async () => {
            const response = await fetch(
                `/api/goods?text=${text}`
            );
            const data = await response.json();
            setGoods(data);
        };
        fetchGoods();
    }, []);
    return (
        <section>

            <div className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
                {goods.slice(0, visible).map((good: any) => (
                    <GoodItem good={good} key={good.id} />
                ))}
            </div>
            {visible < goods.length && (
                <div className="w-full flex items-center justify-center"><Button className="bg-[#e74a77] px-8 my-8 text-white" radius="full" onClick={() => setVisible((prev) => prev + 8)}>
                    Load More
                </Button>
                </div>
            )}
        </section>
    );
};

export default SelGoods;
