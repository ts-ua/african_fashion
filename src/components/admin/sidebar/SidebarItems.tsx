'use client'

import Link from "next/link";
import { data } from "../data";
import { usePathname } from 'next/navigation';

const style = {
    title: "font-normal mx-4 text-sm uppercase",
    active:
        "bg-gradient-to-r border-r-4 border-blue-500 border-r-4 from-[#18181b] to-zinc-700  w-full flexStart my-2 p-4 ",
    link: `duration-200  flexStart my-2 p-4 transition-colors text-foreground  w-full lg:hover:text-blue-500`,
};

export function SidebarItems() {
    const pathname = usePathname();

    return (
        <ul>
            {data.map((item) => (
                <li key={item.title}>
                    <Link href={item.link}>
                        <span
                            className={`${item.link === pathname ? style.active : style.link}`}
                        >
                            <span>{item.icon}</span>
                            <span className={style.title}>{item.title}</span>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
