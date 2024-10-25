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
import { FaUserCircle } from "react-icons/fa";
import localFont from 'next/font/local';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet"
import { CartContext } from "@/providers/cart"
import Cart from "./cart"
import { User } from "next-auth"
const myFont = localFont({ src: '../../app/fonts/SpicyRice-Regular.ttf' })

interface ExtendedUser extends User {
    id: any;
}


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
    const handleLogoutClick = async () => {
        await signOut();
        window.location.assign("/");
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
                        height={80}
                        style={{ width: '100%', height: "auto", borderRadius: "50%" }}
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
                                onClick={() => router.push("/user/login")}
                            >
                                Login
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
                                    <DropdownItem
                                        startContent={<MdTravelExplore />}
                                        onClick={() => router.push("/")}
                                    >
                                        About Us
                                    </DropdownItem>



                                </DropdownMenu>
                            </Dropdown>
                            {
                                data?.user?.role === "admin" && (
                                    <Button onClick={() => router.push('/admin')}>admin</Button>
                                )
                            }

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

                                    <Cart userId={data?.user ? (data.user as ExtendedUser).id : undefined} />
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
                            <Dropdown >
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
                                    <DropdownItem startContent={<FaUserCircle />} onClick={() => router.push("/user/editProfile")}>
                                        Profile
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