import { Good } from "@prisma/client";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface GoodHeaderProps {
    good: Good;
}

const GoodHeader = async ({ good }: GoodHeaderProps) => {
    return (
        <div className="text-primaryHotefy-darker dark:text-white flex flex-col md:flex-row items-center justify-between px-4 ">
            <div className="flex flex-col gap-1 items-center justify-center md:items-start">
                <h1 className="font-semibold text-3xl">{good.name}</h1>
            </div>
            <p className="text-lg font-medium mt-2 md:mt-0">
                <span className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter font-bold">
                    {
                        ' $ ' + good.price + ' / ' + good.set.toString() + ' yds'
                    }
                </span>{" "}
            </p>
        </div>
    );
};

export default GoodHeader;
