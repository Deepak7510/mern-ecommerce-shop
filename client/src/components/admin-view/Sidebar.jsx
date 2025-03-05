import { ChartNoAxesCombined, Gitlab, Shapes, Shirt } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';


export const adminSidebarMenuItem = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'brand',
    label: 'Brand',
    path: '/admin/brand',
    icon: <Gitlab />
  },
  {
    id: 'category',
    label: 'Category',
    path: '/admin/category',
    icon: <Shapes />
  },
  {
    id: 'subCategory',
    label: 'Sub-Category',
    path: '/admin/subCategory',
    icon: <Shirt />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <BadgeCheck />
  },
  
]

export function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return <nav className='mx-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItem.map(menuItem => <div key={menuItem.id} onClick={() => {
        navigate(menuItem.path);
          setOpen? setOpen(false):null  }} className='flex text-lg items-center cursor-pointer gap-2 rounded-md px-3 py-2 text-slate-700 hover:text-black hover:bg-slate-300'>{menuItem.icon}<span>{menuItem.label}</span></div>)
    }
  </nav>
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={()=>setOpen(false)}>
        <SheetContent side="left" className='w-1/2' aria-describedby={undefined}>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 my-5'>
                <ChartNoAxesCombined size={30} />
                <span className='text-2xl font-extrabold'>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}  />
          </div>
        </SheetContent>
      </Sheet>
      <aside  className='hidden w-64 flex-col gap-3 border-r px-2 py-6 lg:flex'>
        <div onClick={() => { navigate('/admin/dashboard') }} className='flex cursor-pointer items-center gap-2'>
          <ChartNoAxesCombined size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <div>
          <MenuItems />
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
