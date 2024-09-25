// src/app/ClientLayout.tsx (client component)
'use client';

import Header from '@/components/common/Header';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header />}
            {/* {isAdminRoute && <AdminNavbar />} */}
            <main className="flex-grow">{children}</main>
        </>
    );
}
