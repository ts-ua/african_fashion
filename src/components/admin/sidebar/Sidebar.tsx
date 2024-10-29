'use client'
import { useDashboardContext } from "@/providers/admin";
import { SidebarItems } from "./SidebarItems";
const style = {
    container: "pb-32 lg:pb-6",
    close: "w-0 ",
    open: " z-40 w-64",
    default: "absolute h-screen overflow-y-auto bg-gray-100  lg:top-0 top-16 lg:relative dark:bg-[#18181b] left-0 transition-width duration-300 ease-in-out",
};

export default function Sidebar() {
    const { sidebarOpen } = useDashboardContext();
    return (
        <aside
            className={`${style.default} 
         ${sidebarOpen ? style.close : style.open} `}
        >
            <div className={style.container}>
                <SidebarItems />
            </div>
        </aside>
    );
}
