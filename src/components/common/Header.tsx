'use client'

import React, { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
    Link,
    Dropdown,
    DropdownItem,
    DropdownTrigger,
    DropdownMenu,
    Avatar,
    Button,
    Select,
    SelectItem,
    Chip
} from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { TbSunMoon } from "react-icons/tb"
import { MdTravelExplore } from "react-icons/md"
import { FaCaretDown } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import localFont from 'next/font/local';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet"
import { CartContext } from "@/providers/cart"
import Cart from "./cart"
const myFont = localFont({ src: '../../app/fonts/SpicyRice-Regular.ttf' })

export default function Header() {
    const { status } = useSession() as { status: string; }
    const { data } = useSession()
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const storedDarkMode = localStorage.getItem("darkMode");
            return storedDarkMode === "true";
        }
        return false;
    })
    const router = useRouter();
    const handleLogoutClick = () => {
        signOut();
    }

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (typeof window !== "undefined") {
            localStorage.setItem("darkMode", newDarkMode.toString());
            const htmlElement = document.querySelector("html");
            if (htmlElement) {
                if (newDarkMode) {
                    htmlElement.classList.add("dark");
                } else {
                    htmlElement.classList.remove("dark");
                }
            }
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const htmlElement = document.querySelector("html");
            if (htmlElement) {
                if (isDarkMode) {
                    htmlElement.classList.add("dark");
                } else {
                    htmlElement.classList.remove("dark");
                }
            }
        }
    }, [isDarkMode]);

    const { numTotalItems } = useContext(CartContext);

    return (
        <div className="h-16 fixed w-full z-50 bg-transparent dark:bg-[#18181b] shadow-lg dark:border-b-1 dark:border-primaryHotefy-lighter flex items-center justify-between lg:px-12 px-2 opacity-90">
            <div className=" flex items-center lg:gap-12 md:gap-8 gap-0">
                <div onClick={() => router.push("/")} className="sm:px-12 px-0 flex items-center cursor-pointer">
                    <span className={`${myFont.className} text-[24px] text-primaryHotefy-neutral dark:text-primaryHotefy-lighter md:block hidden`}>AfricanFashion</span>
                    <Image
                        src="/images/logo.png"
                        alt="fashion"
                        width={80}
                        height={0}
                        style={{ height: "auto", borderRadius: "50%" }}
                    />
                </div>
            </div>

            <div className="flex justify-between" >
                {
                    status === 'loading' && (
                        <Button
                            variant="shadow"
                            color='secondary'
                            isLoading
                            isIconOnly
                        ></Button>
                    )
                }
                {status === 'unauthenticated' && (
                    <Dropdown placement="right-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as='button'
                                className="transition-transform"
                                color="secondary"
                                name=""
                                size="sm"
                                src=""
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Login Actions"
                            variant="shadow"
                            color="secondary"
                        >
                            <DropdownItem
                                startContent={<LuLogIn />}
                                key="login"
                                onClick={() => router.push("/auth/login")}
                            >
                                <Link href={`/auth/login`}>Login</Link>
                            </DropdownItem>
                            <DropdownItem
                                startContent={<TbSunMoon />}
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? 'light' : 'dark'}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
                {
                    status === 'authenticated' && (
                        <div className="flex gap-4 items-center">
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <Button
                                        value="pages"
                                        variant="light"
                                    >
                                        Pages
                                        <FaCaretDown />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Pages"
                                    variant="shadow"
                                    color="secondary"
                                    disabledKeys={["pages"]}
                                >
                                    <DropdownItem startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}>
                                        Blog
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}
                                    >
                                        Shipping & Returns
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}
                                    >
                                        Privacy Policy
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}
                                    >
                                        About Us
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}
                                    >
                                        FAQ
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Sheet>
                                <div className="relative">
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="light"
                                            isIconOnly
                                            startContent={<HiShoppingCart size={28} />}
                                        />
                                    </SheetTrigger>
                                    <div
                                        className={`${numTotalItems >= 1 ? "block" : "hidden"
                                            } cursor-default select-none`}
                                    >
                                        <div className="absolute -top-1 left-6">
                                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                                                {numTotalItems}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <SheetContent side={"right"} className="overflow-y-auto">
                                    <SheetHeader className="flex items-center">
                                        <Chip
                                            startContent={<HiShoppingCart size={20} />}
                                            color="primary"
                                            variant="bordered"
                                            className="cursor-default p-[1.125rem] text-black dark:text-white"
                                            radius="lg"
                                        >
                                            <span className="font-bold uppercase">Cart</span>
                                        </Chip>
                                    </SheetHeader>

                                    <Cart userId={data?.user?.id} />
                                </SheetContent>
                            </Sheet>

                            <p className="font-semibold">
                                {subtotal
                                    .toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })
                                    .replace("R$", "$")}
                            </p>
                            <Dropdown placement="right-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name={data?.user?.name!}
                                        size="sm"
                                        src={data?.user?.image!}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Profile Actions"
                                    variant="shadow"
                                    color="secondary"
                                    disabledKeys={["user-info"]}
                                >
                                    <DropdownItem className="h-14 gap-2" key="user-info">
                                        <p className="font-semibold">{data?.user?.name}</p>
                                        <p className="text-xs">{data?.user?.email}</p>
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<TbSunMoon />}
                                        onClick={toggleDarkMode}
                                    >
                                        {isDarkMode ? 'light' : 'dark'}
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<LuLogOut />}
                                        key="logout"
                                        color="secondary"
                                        onClick={handleLogoutClick}
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    )
                }
            </div>
        </div>
    )
}