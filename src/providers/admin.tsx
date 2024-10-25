'use client'

import React, { useState } from "react";
import { usePathname } from 'next/navigation';  // For detecting route changes

interface User {
    id: string;
    email: string;
    emailVerified: string | null;
    name: string;
    image: string | null;
    password: string;
}

interface Order {
    id: string;
    user: {
        id: string;
        email: string;
        name: string;
        // other user fields
    };
    orderProducts: OrderProduct[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface OrderProduct {
    id: string;
    orderId: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
    };
    quantity: number;
    basePrice: number;
}

interface ProviderValues {
    sidebarOpen?: boolean;
    openSidebar?: () => void;
    closeSidebar?: () => void;
    orders?: Order[];  // Added orders to the ProviderValues interface
}

// create new context
export const AdminContext = React.createContext<ProviderValues>({});

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const pathname = usePathname();
    const [orders, setOrders] = useState<Order[]>([]);
    const openSidebar = React.useCallback(() => {
        setSidebarOpen(!sidebarOpen);
    }, [sidebarOpen]);

    const closeSidebar = React.useCallback(() => {
        setSidebarOpen(false);
    }, []);
    const checkWindowWidth = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(true);
        } else {
            setSidebarOpen(false);
        }
    };
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error("Failed to fetch orders:", response.status);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        // const intervalId = setInterval(fetchOrders, 3000);

        fetchOrders();

        // return () => clearInterval(intervalId);
    }, []);


    React.useEffect(() => {
        checkWindowWidth();
        window.addEventListener('resize', checkWindowWidth);
        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        };
    }, []);

    return (
        <AdminContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar, orders }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useDashboardContext() {
    const context = React.useContext(AdminContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within an AdminProvider");
    }
    return context;
}
