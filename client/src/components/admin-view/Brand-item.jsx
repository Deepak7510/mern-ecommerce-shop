import React from 'react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { TableCell, TableRow } from "@/components/ui/table"
import { deleteBrand, fetchAllBrand } from '@/store/brand-slice'
import { EditIcon, TrashIcon } from 'lucide-react'


const BrandItem = ({ srNo, brand, setOpenCreateBrand, setFormData, setEditValueId }) => {
    const dispatch = useDispatch()
    const deleteHandler = (id) => {
        dispatch(deleteBrand(id)).then((data) => {
            if (data?.payload?.success) {
                toast({ description: data.payload.message })
                dispatch(fetchAllBrand());
            } else {
                toast({ variant: "destructive", description: data.payload.message })
            }
        })
    }
    return (
        <TableRow>
            <TableCell >{srNo + 1}</TableCell>
            <TableCell>{brand.name}</TableCell>
            <TableCell className='flex gap-4' >
                <Button onClick={() => {
                    setOpenCreateBrand(true)
                    setFormData({ name: brand.name })
                    setEditValueId(brand._id)
                }
                } className={'h-8 px-3 py-1 text-sm bg-yellow-600'}>Edit<EditIcon/></Button>
                <Button onClick={() => deleteHandler(brand._id)} className={'h-8 px-3 bg-red-600 py-1 text-sm'}>Delete<TrashIcon/></Button>
            </TableCell>
        </TableRow>
    )
}

export default BrandItem
