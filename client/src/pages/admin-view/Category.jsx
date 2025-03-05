import CategoryItems from '@/components/admin-view/category-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { categorySchema } from '@/config/validationSechma'
import { toast } from '@/hooks/use-toast'
import { addNewCategory, fetchAllCategory, updateCategory } from '@/store/category-slice'
import { Label } from '@radix-ui/react-label'
import { PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminCategory = () => {
    const [openCreateCategory, setOpenCreateCategory] = useState(false);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [editedIdAndOldLogo, setEditedIdAndOldLogo] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        logo: null
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.name === 'logo' ? e.target.files[0] : e.target.value });
    }

    const resetForm = () => {
        setFormData({ name: '', logo: null });
        setErrors({});
        setEditedIdAndOldLogo({});
        setOpenCreateCategory(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const checkValidation = categorySchema.safeParse(formData);
        if (!checkValidation.success) {
            setErrors(checkValidation.error.formErrors.fieldErrors);
            return;
        }

        let newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('logo', formData.logo);

        const action = editedIdAndOldLogo.id
            ? updateCategory({ newFormData, id: editedIdAndOldLogo.id })
            : addNewCategory(newFormData);

        dispatch(action).then((data) => {
            toast({
                title: data?.payload?.message,
                variant: data?.payload?.success ? 'default' : 'destructive'
            });
            if (data?.payload?.success) {
                resetForm();
                dispatch(fetchAllCategory());
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    const { isLoading, categoryList } = useSelector(state => state.adminCategory);

    return (
        <>
            <div className='mt-14 mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateCategory(true)}>Add New Category<PlusCircleIcon/></Button>
            </div>
            <div className='w-full'>
                {!isLoading ? (
                    <Table className='text-[1rem]'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SR No.</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryList.length > 0 ? categoryList.map((item, index) => (
                                <CategoryItems
                                    key={item.name}
                                    srNo={index}
                                    category={item}
                                    setFormData={setFormData}
                                    setEditedIdAndOldLogo={setEditedIdAndOldLogo}
                                    setOpenCreateCategory={setOpenCreateCategory}
                                />
                            )) : (
                                <TableRow className='font-semibold'>
                                    <TableCell>No Category</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                ) : Array(10).fill(null).map((_, index) => {
                    return <div key={index} className="space-y-1 mb-3">
                      <Skeleton className="h-12 w-full]" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  })}
            </div>
            <Sheet open={openCreateCategory} onOpenChange={resetForm}>
                <SheetContent side="right" className="overflow-auto" aria-describedby={undefined}>
                    <SheetHeader>
                        <SheetTitle>{editedIdAndOldLogo.id ? 'Edit Category' : 'Add New Category'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={onSubmit}>
                        <div className='mt-10 space-y-2'>
                            <div className='space-y-1'>
                                <Label htmlFor="name" className='text-md'>Name</Label>
                                <Input onChange={handleChange} value={formData.name} id="name" name="name" type="text" placeholder="Enter the name" />
                                {errors.name && <p className='text-red-700'>{errors.name[0]}</p>}
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor="logo" className='text-md'>Logo</Label>
                                <Input onChange={handleChange} id="logo" name="logo" type="file" />
                                {errors.logo && <p className='text-red-700'>{errors.logo[0]}</p>}
                            </div>
                            {editedIdAndOldLogo.id && (
                                <div className="relative">
                                    <h1>Old Image</h1>
                                    <img src={`http://localhost:8000/${editedIdAndOldLogo.oldLogo}`} className="w-1/2 h-[150px] object-cover rounded-t-lg" />
                                </div>
                            )}
                            <Button className='w-full'>Save</Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default AdminCategory;
