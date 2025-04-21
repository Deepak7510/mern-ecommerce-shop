import React from "react";
import { Button } from "../ui/button";
import { deleteCategory, fetchAllCategory } from "@/store/category-slice";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { TableCell, TableRow } from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";

const CategoryItems = ({
  srNo,
  category,
  setOpenCreateCategory,
  setFormData,
  setEditedIdAndOldLogo,
}) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        dispatch(fetchAllCategory());
      } else {
        toast({ variant: "destructive", title: data.payload.message });
      }
    });
  };
  return (
    <TableRow>
      <TableCell>{srNo + 1}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <div>
          <div className="relative w-[50px] h-[50px] ">
            <img
              src={`${import.meta.env.VITE_BACKEND_URI}/${category.logo}`}
              alt={category?.name}
              className="h-full w-full  object-cover rounded-lg"
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="flex gap-4">
        {" "}
        <Button
          onClick={() => {
            setOpenCreateCategory(true);
            setFormData({ name: category.name });
            setEditedIdAndOldLogo({ id: category._id, oldLogo: category.logo });
          }}
          className={"h-8 px-3 py-1 text-sm bg-yellow-600"}
        >
          Edit
          <EditIcon />
        </Button>
        <Button
          onClick={() => deleteHandler(category._id)}
          className={"h-8 px-3 bg-red-600 py-1 text-sm"}
        >
          Delete
          <TrashIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CategoryItems;
