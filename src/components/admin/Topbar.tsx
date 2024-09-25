'use client'

import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import {
    Link,
    Dropdown,
    DropdownItem,
    DropdownTrigger,
    DropdownMenu,
    Avatar,
    Button,
} from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { TbSunMoon } from "react-icons/tb"
import { MdTravelExplore } from "react-icons/md"
import { CartContext } from "@/providers/cart"
import { ExtendedSession } from "@/type/sessionData"
import { CiMail } from "react-icons/ci";
import { PiBellRingingLight } from "react-icons/pi";
import { useDashboardContext } from "@/providers/admin"

export default function TopBar() {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        image: ''
    })
    const { status, data } = useSession() as { status: string; data: ExtendedSession | null }
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const storedDarkMode = localStorage.getItem("darkMode");
            return storedDarkMode === "true";
        }
        return false;
    })
    const router = useRouter();
    const handleLogoutClick = () => {
        localStorage.removeItem('user');
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

    useEffect(() => {
        const updatedUser = localStorage.getItem('user');
        setUser(updatedUser ? JSON.parse(updatedUser) : null);
    }, []);

    const { numTotalItems } = useContext(CartContext);
    const { openSidebar, orders } = useDashboardContext();


    return (
        <div className="h-16 w-full bg-transparent dark:bg-[#18181b] rounded-lg shadow-lg dark:border-b-1 dark:border-primaryHotefy-lighter lg:px-12 px-2 opacity-90">
            <div className="float-left h-full flex lg:hidden px-4">
                <button
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle sidenav"
                    className="text-[40px] text-gray-500 focus:outline-none"
                    onClick={openSidebar}
                >
                    &#8801;
                </button>
            </div>
            <div className="float-right flex h-full">
                {
                    status === 'loading' && !user?.id && (
                        <Button
                            variant="shadow"
                            color='secondary'
                            isLoading
                            isIconOnly
                        ></Button>
                    )
                }
                {status === 'unauthenticated' && !user?.id && (
                    <Dropdown placement="left-start">
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
                                onClick={() => router.push("/auth/login")}
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
                    status === 'authenticated' || user?.id && (
                        <div className="flex gap-4 items-center">
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <Button isIconOnly variant="light" className="relative" size="lg">
                                        <PiBellRingingLight size={28} />
                                        <div className="absolute top-1 right-2 pointer-events-none">
                                            <span className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                                                3
                                            </span>
                                        </div>
                                    </Button>

                                </DropdownTrigger>

                                <DropdownMenu aria-label="Pages" variant="shadow" color="secondary" disabledKeys={["pages"]}>
                                    <DropdownItem startContent={<MdTravelExplore />} onClick={() => router.push("/")}>
                                        Blog
                                    </DropdownItem>
                                    <DropdownItem startContent={<MdTravelExplore />} onClick={() => router.push("/")}>
                                        Shipping & Returns
                                    </DropdownItem>
                                    <DropdownItem startContent={<MdTravelExplore />} onClick={() => router.push("/")}>
                                        Privacy Policy
                                    </DropdownItem>
                                    <DropdownItem startContent={<MdTravelExplore />} onClick={() => router.push("/")}>
                                        About Us
                                    </DropdownItem>
                                    <DropdownItem startContent={<MdTravelExplore />} onClick={() => router.push("/")}>
                                        FAQ
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        className="relative"
                                        size="lg"
                                    >
                                        <CiMail size={28} />
                                        <div
                                            className={`${orders?.length ? "block" : "hidden"
                                                } cursor-default select-none`}
                                        >
                                            <div className="absolute top-1 left-7">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                                                    {orders?.length}
                                                </p>
                                            </div>
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Pages"
                                    variant="shadow"
                                    color="secondary"
                                    disabledKeys={["order-info"]}
                                >
                                    {
                                        orders?.length > 0 ? (
                                            orders.map((order) => (
                                                <DropdownItem key={order.id} className="flex items-center gap-2">
                                                    <div className="flex flex-col">
                                                        <p className="font-semibold">{order.user.name}</p>
                                                        <p className="text-xs text-gray-500">{order.status}</p>
                                                    </div>
                                                </DropdownItem>
                                            ))
                                        ) : (
                                            <DropdownItem>
                                                No orders found
                                            </DropdownItem>
                                        )}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown placement="bottom-end">
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
                                        <p className="font-semibold">{data?.user?.name || user?.name}</p>
                                        <p className="text-xs">{data?.user?.email || user?.email}</p>
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