import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { productSchema } from '@/config/validationSechma'
import { fetchAllBrand } from '@/store/brand-slice'
import { fetchAllCategory } from '@/store/category-slice'
import { addProduct, fetchAllProducts, updateProduct } from '@/store/product-slice'
import { fetchAllSubCategory } from '@/store/subcategory-slice'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProducItem from '@/components/admin-view/Product-item'
import { toast } from '@/hooks/use-toast'
import { PlusCircleIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [editIdAndImages, setEditIdAndImages] = useState({ id: '', images: [] })
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [errors, setErrors] = useState({})
  const [subCategory, setSubCategory] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    salePrice: '',
    brand: '',
    category: '',
    subcategory: '',
    size: '',
    stock: '',
    images: []
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllBrand());
    dispatch(fetchAllCategory());
    dispatch(fetchAllSubCategory());
  }, [dispatch])

  const { brandList } = useSelector(state => state.adminBrand);
  const { categoryList } = useSelector(state => state.adminCategory);
  const { subCategoryList } = useSelector(state => state.adminSubCategory);
  const { isLoading, productList } = useSelector(state => state.adminProduct);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.name === 'images' ? Array.from(e.target?.files) : e.target.value })
  }

  const resetData = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      salePrice: '',
      brand: '',
      category: '',
      subcategory: '',
      size: '',
      stock: '',
      images: []
    })
    setOpenCreateProduct(false)
    setErrors({})
    setEditIdAndImages({ id: '', images: [] })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkValidation = productSchema.safeParse(formData);
    if (!checkValidation.success) {
      setErrors(checkValidation.error.formErrors.fieldErrors);
      return;
    }

    const newFormData = new FormData();
    newFormData.append('title', formData.title);
    newFormData.append('description', formData.description);
    newFormData.append('price', formData.price);
    newFormData.append('salePrice', formData.salePrice);
    newFormData.append('brand', formData.brand);
    newFormData.append('category', formData.category);
    newFormData.append('subcategory', formData.subcategory);
    newFormData.append('size', formData.size);
    newFormData.append('stock', formData.stock);
    for (let image of formData.images) {
      newFormData.append('images', image)
    }

    const action = editIdAndImages.id ? updateProduct({ newFormData, id: editIdAndImages.id }) : addProduct(newFormData);
    dispatch(action).then(data => {
      console.log(data)
      if (data?.payload?.success) {
        toast({ description: data.payload.message })
        resetData();
        dispatch(fetchAllProducts());
      } else {
        toast({ variant: "destructive", description: data?.payload?.message, });
      }
    })

  }


  useEffect(() => {
    if (formData.category) {
      if (!editIdAndImages.id) {
        setFormData({ ...formData, subcategory: '' })
      }
      const filterSubCategory = subCategoryList.filter(item => {
        return item.category._id === formData.category
      })
      setSubCategory(filterSubCategory)
    }
  }, [formData.category])



  return (
    <>
      <div className='mt-14 mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProduct(true)}>Add New Product<PlusCircleIcon/></Button>
      </div>
      {!isLoading ? (
        <Table className='text-[1rem]'>
          <TableHeader>
            <TableRow>
              <TableHead>SR.No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SalePrice</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SabCategory</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.length > 0 ? productList.map((item, index) => (
              <ProducItem
                key={item._id}
                srNo={index}
                product={item}
                setFormData={setFormData}
                setEditIdAndImages={setEditIdAndImages}
                setOpenCreateProduct={setOpenCreateProduct}
              />
            )) : (
              <TableRow className='font-semibold'>
                <TableCell>No Category</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) :  Array(10).fill(null).map((_, index) => {
        return <div key={index} className="space-y-1 mb-3">
          <Skeleton className="h-12 w-full]" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      })}
      <Sheet open={openCreateProduct} onOpenChange={() => resetData()}>
        <SheetContent side="right" className="overflow-auto" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>{editIdAndImages.id ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                  Title
                </Label>
                <Input type='text' id='title' name='title' value={formData.title} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter product name' />
                {errors?.title && <p className='text-red-600'>{errors.title[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Description
                </Label>
                <textarea id='description' name='description' value={formData.description} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter product description'></textarea>
                {errors?.description && <p className='text-red-600'>{errors.description[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                  Price
                </Label>
                <Input type='number' id='price' name='price' value={formData.price} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter price' />
                {errors?.price && <p className='text-red-600'>{errors.price[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='salePrice' className='block text-sm font-medium text-gray-700'>
                  Sale price
                </Label>
                <Input type='number' id='salePrice' name='salePrice' value={formData.salePrice} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter salePrice' />
                {errors?.salePrice && <p className='text-red-600'>{errors.salePrice[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='brand' className='block text-sm font-medium text-gray-700'>Brand</Label>
                <Select id='breand' onValueChange={value => {
                  setFormData({ ...formData, brand: value })
                }} value={formData.brand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandList.length > 0 ? brandList.map(item => {
                      return <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                    }) : null}
                  </SelectContent>
                </Select>
                {errors?.brand && <p className='text-red-600'>{errors.brand[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor={'category'}>Category</Label>
                <Select id='category' onValueChange={value => {
                  setFormData({ ...formData, category: value });
                }} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.length > 0 ? categoryList.map(item => {
                      return <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                    }) : null}
                  </SelectContent>
                </Select>
                {errors?.category && <p className='text-red-600'>{errors.category[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='brand' className='block text-sm font-medium text-gray-700'>Sub Category</Label>
                <Select id='breand' onValueChange={value => {
                  setFormData({ ...formData, subcategory: value })
                }} value={formData.subcategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategory.length > 0 ? subCategory.map(item => {
                      return <SelectItem key={item.name} value={item._id}>{item.name}</SelectItem>
                    }) : null}
                  </SelectContent>
                </Select>
                {errors?.subcategory && <p className='text-red-600'>{errors.subcategory[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='stock' className='block text-sm font-medium text-gray-700'>
                  Stock
                </Label>
                <Input type='number' id='stock' name='stock' value={formData.stock} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter stock' />
                {errors?.stock && <p className='text-red-600'>{errors.stock[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='size' className='block text-sm font-medium text-gray-700'>
                  Size
                </Label>
                <Input type='text' id='size' name='size' value={formData.size} onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter product Size (S,M,L,XL,XLL)' />
                {errors?.size && <p className='text-red-600'>{errors.size[0]}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='images' className='block text-sm font-medium text-gray-700'>
                  Multiple images
                </Label>
                <Input multiple type='file' id='images' name='images' onChange={handleChange} className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='Enter product images (S,M,L,XL,XLL)' />
                {errors?.images && <p className='text-red-600'>{errors.images[0]}</p>}
              </div>

              {editIdAndImages?.id !== '' ? (<div className='space-y-2'>
                <div className='block text-sm font-medium text-gray-700'>Old Images</div>
                <div className='flex gap-2'>
                  {editIdAndImages.images.map((image, index) => {
                    return (
                      <div className="relative w-[50px] h-[50px]" key={index} >
                        <img src={`http://localhost:8000/${image}`} alt={`ProductImage${index + 1}`} className="h-full w-full  object-cover rounded-lg" />
                      </div>
                    )
                  })}
                </div>
              </div>) : null}



              <div>
                <Button className='w-full'>{editIdAndImages.id ? 'Update' : 'Save'}</Button>
              </div>

            </div>
          </form>


        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
