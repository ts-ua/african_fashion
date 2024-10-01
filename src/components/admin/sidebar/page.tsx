
import { SidebarItems } from "./SidebarItems";
import { useContext } from "react";
import { AdminContext, useDashboardContext } from "@/providers/admin";


interface SidebarProps {
    mobileOrientation: "start" | "end";
}

const style = {
    mobileOrientation: {
        start: "left-0",
        end: "right-0",
    },
    container: "pb-32 lg:pb-6",
    close: "hidden lg:block lg:w-64 lg:z-auto",
    open: "w-8/12 absolute z-40 sm:w-5/12 lg:hidden",
    default: "bg-gray-100 min-h-screen overflow-y-auto top-0 lg:relative dark:bg-[#18181b]",
};

export function Sidebar(props: SidebarProps) {
    // const { sidebarOpen } = useDashboardContext();
    return (
        <aside
            className={`${style.default} 
        ${style.mobileOrientation[props.mobileOrientation]} 
         ${style.close} `}
        >
            <div className={style.container}>
                <SidebarItems />
            </div>
        </aside>
    );
}
