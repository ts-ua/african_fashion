import { AdminProvider, useDashboardContext } from "@/providers/admin";
import TopBar from "@/components/admin/Topbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";

const style = {
    open: "lg:w-full",
    close: " lg:block lg:w-[calc(100%-16rem)]",
    mainContainer: "flex flex-col w-full min-h-screen px-4 lg:space-y-4",
    container: "bg-gray-100 h-screen overflow-hidden relative lg:p-4",
    main: "h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <AdminProvider>
            <TopBar />
            <div className="flex items-start">
                <Sidebar />
                <div
                    className={`${style.mainContainer} 
                    ${style.close}`}
                >
                    {children}
                </div>
            </div>

        </AdminProvider>
    );
}