import React from 'react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { TableCell, TableRow } from "@/components/ui/table"
import { deleteSubCategory, fetchAllSubCategory } from '@/store/subcategory-slice'
import { EditIcon, TrashIcon } from 'lucide-react'

const SubCategoryItem = ({ srNo, subCategory, setOpenCreateSubCategory, setFormData, setEditValueId }) => {
    const dispatch = useDispatch()
    const deleteHandler = (id) => {
        dispatch(deleteSubCategory(id)).then((data) => {
            if (data?.payload?.success) {
                toast({ description: data.payload.message })
                dispatch(fetchAllSubCategory());
            } else {
                toast({ variant: "destructive", description: data.payload.message })
            }
        })
    }
    return (
        <TableRow>
            <TableCell >{srNo + 1}</TableCell>
            <TableCell>{subCategory?.category?.name}</TableCell>
            <TableCell>{subCategory.name}</TableCell>
            <TableCell className='flex gap-4' > <Button onClick={() => {
                setOpenCreateSubCategory(true)
                setFormData({ category: subCategory.category._id, name: subCategory.name })
                setEditValueId(subCategory._id)
            }
            } className={'h-8 px-3 py-1 text-sm bg-yellow-600'}>Edit <EditIcon /></Button>
                <Button onClick={() => deleteHandler(subCategory._id)} className={'h-8 px-3 bg-red-600 py-1 text-sm'}>Delete<TrashIcon /></Button></TableCell>
        </TableRow>
    )
}

export default SubCategoryItem;
