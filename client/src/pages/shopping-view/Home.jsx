import { ChevronLeftIcon, ChevronRightIcon, Slice } from 'lucide-react';
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingProduct } from '@/store/shopping-product-slice';
import ShoppingProductItem from '@/components/shopping-view/Product-item';
import { fetchAllCategory } from '@/store/category-slice';
import CategoryCard from '@/components/shopping-view/category-card';
import { Skeleton } from '@/components/ui/skeleton';
import Footer from '@/components/shopping-view/Footer';
function ShoppingHome() {
    const dispatch = useDispatch()
    const [currentSlide, setCurrentSlide] = useState(0)
    let sildes = [bannerOne, bannerTwo, bannerThree];
    const { isLoading, shoppingProductList } = useSelector(state => state.shoppingProduct)
    const { categoryList } = useSelector(state => state.adminCategory);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(preSlide => (preSlide + 1) % sildes.length);
        }, 5000)

        return () => {
            clearInterval(timer)
        }
    }, []);

    useEffect(() => {
        dispatch(getShoppingProduct({ filterParams: {}, sortParams: null }))
        dispatch(fetchAllCategory());
    }, [dispatch])


    return <div className="flex flex-col min-h-screen overflow-hidden">
        <div className="relative w-full h-[280px] lg:h-[650px]">
            {sildes.map((slide, index) => {
                return <img src={slide} key={index} className={`${index === currentSlide ? ' opacity-100' : ' opacity-0'} absolute left-0 top-0 w-full h-full object-cover transition duration-200`} />
            })}
            <Button onClick={() => setCurrentSlide(preSlide => (preSlide - 1 + sildes.length) % sildes.length)} variant='outline' size='icon' className=' absolute top-1/2 left-4 transform  translate-y-1/2 bg-white/80'>
                <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button onClick={() => setCurrentSlide(preSlide => (preSlide + 1) % sildes.length)} variant='outline' size='icon' className=' absolute top-1/2 right-4 transform  translate-y-1/2 bg-white/80'>
                <ChevronRightIcon className='h-4 w-4' />
            </Button>
        </div>

        {/* category section  */}

        <section className='py-6 lg:py-12 bg-slate-300'>
            <div className='container mx-auto px-4 lg:px-20'>
                <h2 className='text-xl lg:text-3xl font-extrabold text-center mb-6'>Shop by category</h2>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4'>
                    {categoryList && categoryList.length > 0 ? categoryList.map(item => {
                        return <CategoryCard category={(item)} key={item._id} />
                    }) : null}
                </div>
            </div>
        </section>
        
        {/* feature section  */}
        <section className='py-6 lg:py-12'>
            <div className='container mx-auto px-1 lg:px-20'>
                <h2 className='text-3xl font-extrabold text-center mb-6'>Feature Product</h2>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 lg:gap-4'>
                    {isLoading ? (
                        Array(10).fill(null).map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[300px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full]" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        ))) :
                        shoppingProductList && shoppingProductList.length > 0 ? shoppingProductList.slice(0, 30)?.map(item => {
                            return (<ShoppingProductItem key={item._id} product={item} />)
                        }) : <p className="text-gray-600 text-xl font-semibold my-3">No Product Found</p>
                    }
                </div>
            </div>
        </section>
        <Footer />
    </div>
}

export default ShoppingHome;