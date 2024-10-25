'use client'
import { useDashboardContext } from "@/providers/admin";
import { SidebarItems } from "./SidebarItems";
const style = {
    container: "pb-32 lg:pb-6",
    close: "hidden ",
    open: "lg:top-0 top-16  z-40 w-64",
    default: "absolute bg-gray-100 min-h-screen overflow-y-auto top-0 lg:relative dark:bg-[#18181b] left-0",
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
