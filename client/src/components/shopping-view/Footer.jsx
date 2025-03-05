import { Facebook, Twitter, Instagram, ShoppingBag } from "lucide-react";
import ShopLogo from '../../assets/shop-logo.svg'
export default function Footer() {
  return (
    <footer className=" bg-slate-50 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        {/* Logo and Description */}
        <div>
          <img src={ShopLogo} alt={'Shop-logo'} className='h-14' />
          <p className="text-gray-400">Your one-stop shop for premium products online.</p>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-black"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-black"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-black"><Instagram /></a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Luxora Mart. All rights reserved.
      </div>
    </footer>
  );
}
