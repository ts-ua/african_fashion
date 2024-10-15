'use client';
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ScrollArea } from "../ui/scroll-area";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

const buttonData = [
    {
        text: "Georges",
        items: [
            {
                title: "Plain George",
                itemLists: [],
            },
            {
                title: "Silk George",
                itemLists: ["Medium Silk George", "Medium Silk Stoned George"],
            },
            {
                title: "Beaded George",
                itemLists: ["Heavy Beaded George", "Heavy Beaded Silk George"],
            },
            {
                title: "French George",
                itemLists: [],
            },
            {
                title: "Intorica George",
                itemLists: [],
            }, {
                title: "Stoned George",
                itemLists: []
            },
            {
                title: "Net George",
                itemLists: []
            }
        ]
    },
    {
        text: "Laces",
        items: [
            {
                title: "Net Lace",
                itemLists: ["Net White Laces"],
            },
            {
                title: 'Velvet Lace',
                itemLists: []
            },
            {
                title: "Cord Lace",
                itemLists: [],
            },
            {
                title: "Tulle Lace",
                itemLists: ["Tulle Lace", "Medium Tulle Lace"],
            },
            {
                title: "French Lace",
                itemLists: []
            },

            {
                title: "Regular Lace",
                itemLists: [],
            },
            {
                title: "Vole Lace",
                itemLists: [],
            }]
    },
    {
        text: "Waxes",
        items: [
            {
                title: "Super Wax",
                itemLists: []
            },
            {
                title: "Hollandiaise",
                itemLists: ['Vlisco Dutch Hollandaise', 'Vlisco Hollandaise Dutch', 'Vlisco Hollandaise Wax', 'White and Black Vlisco Hollandaise']
            },
            {
                title: "High Tek",
                itemLists: []
            },
            {
                title: "Davita Wax",
                itemLists: []
            },
            {
                title: "Embroidery Lace Wax",
                itemLists: []
            },
        ]
    },
    {
        text: "Headties",
        items: [
            {
                title: "Regular Headties",
                itemLists: []
            },
            {
                title: "Auto Gele Asoke",
                itemLists: [],
            },
            {
                title: "Sego",
                itemLists: [],
            },
            {
                title: "Sego Auto Gele",
                itemLists: [],
            },
            {
                title: "Regular Asoke",
                itemLists: [],
            }]
    },
    {
        text: "Ready to Wear",
        items: [
            {
                title: "Women Full Beaded Kaftans",
                itemLists: [],
            },
            {
                title: "Women Half Beaded Kaftans",
                itemLists: [],
            },
            {
                title: "Skirt and Blouse",
                itemLists: [],
            },
            {
                title: "Isi Agwu",
                itemLists: [],
            },
            {
                title: "Men and Women Wax",
                itemLists: []
            }]
    },
    {
        text: "Accessories",
        items: [
            {
                title: "Coral Beads",
                itemLists: [],
            },
            {
                title: "Fashion Beads",
                itemLists: [],
            },
            {
                title: "Mens Traditional Hats",
                itemLists: [],
            },
            {
                title: "Women's Matching Shoe and Bag",
                itemLists: [],
            },
            {
                title: "Women Slippers",
                itemLists: [],
            },
            {
                title: "Men's Shoes",
                itemLists: [],
            },
            {
                title: "Men Slippers",
                itemLists: [],
            }]
    },
];

export function Sidebar({ className }: SidebarProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [openSubIndex, setOpenSubIndex] = useState<number | null>(null);
    const [isFixed, setIsFixed] = useState<boolean>(false);
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSubToggle = (index: number) => {
        setOpenSubIndex(openSubIndex === index ? null : index);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 940) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        <div className=" py-4 overflow-hidden lg:block hidden " >
            <ScrollArea type="always" style={{ height: 580 }}>
                <div className={`${isFixed ? " top-20 z-50 translate-y-0" : "translate-y-[-20px]"} transition-transform duration-1000 ease-in-out transform`}>
                    <h2 className="mb-2 p-4 text-lg font-semibold tracking-tight">
                        Products
                    </h2>
                    <div className="px-4">
                        {buttonData.map((item, index) => (
                            <div key={index} className="relative inline-block text-left w-full border hoverEvent rounded-xl my-2">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="flexStart   p-4 "
                                    aria-haspopup="true"
                                    aria-expanded={openIndex === index}
                                >
                                    <span className="mr-2">{item.text}</span>
                                    <FaAngleDown className={`ml-auto transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openIndex === index && (
                                    <div className="relative right-0 mt-2 w-full">
                                        <div className="py-1 z-60 bg-background">
                                            {item.items.map((subItem, subIndex) => (
                                                <div key={subIndex} className="relative w-full">
                                                    <button
                                                        onClick={() => handleSubToggle(subIndex)}
                                                        className="flexStart hoverEvent p-4 text-sm"
                                                        aria-haspopup="true"
                                                        aria-expanded={openSubIndex === subIndex}
                                                    >
                                                        {
                                                            !subItem.itemLists.length ?
                                                                <Link key={index} className="gap-2 flexStart text-sm" href={`/goods/search?text=${subItem.title}`}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                                : <>
                                                                    <span>{subItem.title}</span>
                                                                    <FaAngleDown className={`ml-auto transition-transform ${openSubIndex === subIndex ? 'rotate-180' : ''}`} />
                                                                </>
                                                        }
                                                    </button>
                                                    {
                                                        openSubIndex === subIndex && (
                                                            <div className="relative right-0 mt-2 w-full">
                                                                {
                                                                    subItem.itemLists.map((item, index) => (
                                                                        <div className="block px-8 py-4 hoverEvent">
                                                                            <Link key={index} className="gap-2 flexStart text-sm" href={`/goods/search?text=${item}`}>
                                                                                {item}
                                                                            </Link>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>

    );
}
