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
    const pathname = usePathname(); // Get the current pathname
    const [orders, setOrders] = useState<Order[]>([]);
    const openSidebar = React.useCallback(() => {
        setSidebarOpen(true);
    }, []);

    const closeSidebar = React.useCallback(() => {
        setSidebarOpen(false);
    }, []);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                    console.log("Orders fetched:", data);
                } else {
                    console.error("Failed to fetch orders:", response.status);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    React.useEffect(() => {
        if (sidebarOpen && window.innerWidth < 1024) {
            setSidebarOpen(true);
        }
    }, [pathname, sidebarOpen]); // Listen for pathname change

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
