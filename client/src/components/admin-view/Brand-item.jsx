import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteBrand, fetchAllBrand } from "@/store/brand-slice";
import { EditIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DeleteButton({ getBrandId }) {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteBrand(id)).then((data) => {
      if (data?.payload?.success) {
        toast({ description: data.payload.message });
        dispatch(fetchAllBrand());
      } else {
        toast({ variant: "destructive", description: data.payload.message });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-red-500" size={"sm"} variant={"outline"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteHandler(getBrandId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const BrandItem = ({
  srNo,
  brand,
  setOpenCreateBrand,
  setFormData,
  setEditValueId,
}) => {
  return (
    <TableRow>
      <TableCell>{srNo + 1}</TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell className="flex gap-4">
        <Button
          onClick={() => {
            setOpenCreateBrand(true);
            setFormData({ name: brand.name });
            setEditValueId(brand._id);
          }}
          size={"sm"}
          variant={"outline"}
        >
          <EditIcon />
        </Button>

        <DeleteButton getBrandId={brand._id} />
      </TableCell>
    </TableRow>
  );
};

export default BrandItem;
