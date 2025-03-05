import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Heart, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory } from '@/store/category-slice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar } from '../ui/avatar'
import { AvatarFallback } from '../ui/avatar'
import { userLogout } from '@/store/auth-slice'
import { toast } from '@/hooks/use-toast'
import UserCartWrapper from './cart-warpper'
import { fetchCartItems } from '@/store/cart-slice'

import ShopLogo from '../../assets/shop-logo.svg'
import { Label } from '../ui/label'

const MenuItems = ({ setOpenNavbar }) => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector(state => state.adminCategory);
  const navigate = useNavigate();
  const location = useLocation(); // Fixed typo
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filter');
    const currentFilter = (section !== 'home' && section !== 'products')
      ? { [section]: [getCurrentItem] }
      : {}

    sessionStorage.setItem('filter', JSON.stringify(currentFilter));

    if (section === 'home') {
      navigate('/shop/home');
      setOpenNavbar ? setOpenNavbar(false) : null
      return;
    }

    // Products pe click karne pe pura listing show ho, bina kisi filter ke
    if (section === 'products') {
      navigate('/shop/listing');
      setOpenNavbar ? setOpenNavbar(false) : null
      return;
    }

    // Agar listing page pe ho aur category filter apply ho raha ho
    if (currentFilter !== null) {
      setSearchParams(new URLSearchParams({ category: getCurrentItem }));
    }
    navigate(`/shop/listing`);
    setOpenNavbar ? setOpenNavbar(false) : null
  }



  return (
    <nav className='flex gap-5 flex-col lg:flex-row'>
      <label className='font-medium' onClick={() => handleNavigateToListingPage(null, "home")}>
        Home
      </label>
      <label className='font-medium' onClick={() => handleNavigateToListingPage(null, "products")}>
        Products
      </label>
      {categoryList.slice(0, 5).map(item => (
        <label
          onClick={() => handleNavigateToListingPage(item._id, "category")}
          className='font-medium cursor-pointer'
          key={item._id}
        >
          {item.name}
        </label>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ setOpenNavbar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const { user } = useSelector(state => state.auth);
  const { isLoading, cartItems } = useSelector(state => state.shoppingCart);

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }))
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(userLogout()).then((data) => {
      if (data.payload.success) {
        toast({ description: data.payload.message })
        navigate('/login')
      }
    })
  }

  function handleNavigate() {
    setOpenNavbar ? setOpenNavbar(false) : null
    navigate('/shop/search')
  }

  return <div className='flex lg:items-center flex-col lg:flex-row gap-5'>
    <Label className='font-medium' onClick={handleNavigate}>Search</Label>
    <Sheet open={openCartSheet} onOpenChange={() => { setOpenCartSheet(false) }}>
      <Button className='w-fit border-none px-0' onClick={() => setOpenCartSheet(true)} variant='none' size='sm'>
        <span className='font-medium text-base'>Cart</span>
        <ShoppingCart className='w-6 h-6' />
      </Button>
      {/* cart  ------------ */}
      <UserCartWrapper setOpenCartSheet={setOpenCartSheet} isLoading={isLoading} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className='bg-black text-white font-bold'>{user?.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='left' className='w-56'>
        <DropdownMenuLabel>Welcome {user.userName}  😊</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/shop/wishlist')}><Heart className='h-4 w-4' />Wishlist</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/shop/orders')}><UserCog className='h-4 w-4' />Order</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHandler}><LogOut className='h-4 w-4' />Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}

const ShoppingHeader = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  return (
    <header className='bg-white z-50 fixed top-0 w-full border-b'>
      <div className='flex justify-between items-center h-16 px-4 md:px-8'>
        <Link to={'/shop/home'} className='flex items-start gap-2'>
          <img src={ShopLogo} alt={'Shop-logo'} className='h-14' />
        </Link>
        <Sheet open={openNavbar} onOpenChange={setOpenNavbar} >
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs' aria-describedby={undefined}>
            <div className='flex flex-col gap-5'>
              <MenuItems setOpenNavbar={setOpenNavbar} />
              <HeaderRightContent setOpenNavbar={setOpenNavbar} />
            </div>
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader