import { TableCell, TableRow } from "@/components/ui/table"
import React from 'react'
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { deleteProduct, fetchAllProducts } from "@/store/product-slice"
import { toast } from "@/hooks/use-toast"
import { EditIcon, TrashIcon } from "lucide-react"

const ProducItem = ({ srNo, product, setFormData, setEditIdAndImages, setOpenCreateProduct }) => {
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id)).then(data => {
            if (data?.payload?.success) {
                toast({ title: data.payload.message })
                dispatch(fetchAllProducts())
            } else {
                toast({ variant: "destructive", title: data.payload.message })
            }
        })
    }

    return (
        <TableRow>
            <TableCell >{srNo + 1}</TableCell>
            <TableCell>{product['title'].split(' ').slice(0, 2).join(' ').concat('...')}</TableCell>
            <TableCell>{product['description'].split(' ').slice(0, 3).join(' ').concat('...')}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.salePrice}</TableCell>
            <TableCell>{product.brand.name}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{product.subcategory.name}</TableCell>
            <TableCell>{product.size}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell >
                <div className="flex gap-4">
                    {product.images.map((path, index) => {
                        return (
                            <div className="relative w-[50px] h-[50px] " key={index} >
                                <img src={`http://localhost:8000/${path}`} alt={`ProductImage${index + 1}`} className="h-full w-full  object-cover rounded-lg" />
                            </div>
                        )
                    })}
                </div>
            </TableCell>
            <TableCell className='flex gap-2' > <Button onClick={() => {
                setOpenCreateProduct(true);
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    salePrice: product.salePrice,
                    brand: product.brand._id,
                    category: product.category._id,
                    subcategory: product.subcategory._id,
                    size: product.size,
                    stock: product.stock,
                    images: []
                });
                setEditIdAndImages({ id: product._id, images: product.images })
            }
            } className={'h-8 px-3 py-1 text-sm bg-yellow-600'}>Edit <EditIcon/> </Button>
                <Button onClick={() =>
                    deleteHandler(product._id)
                } className={'h-8 px-3 bg-red-600 py-1 text-sm'}>Delete<TrashIcon/></Button></TableCell>
        </TableRow>
    )
}

export default ProducItem