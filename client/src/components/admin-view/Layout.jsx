import AdminHeader from '@/components/admin-view/Header'
import AdminSidebar from '@/components/admin-view/Sidebar'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className='flex min-h-screen w-full relative'>
            {/* Admin Sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className='flex flex-1 relative overflow-auto h-screen'>
                <AdminHeader setOpen={setOpenSidebar} />
                <main className='flex flex-1 flex-col p-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
