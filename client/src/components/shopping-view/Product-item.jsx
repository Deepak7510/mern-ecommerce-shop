import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";

function ShoppingProductItem({ product, handleDelete }) {
  const productTitle = product.title.split(" ").slice(0, 3).join(" ") + "...";
  const discount = (
    ((product.price - product.salePrice) / product.price) *
    100
  ).toFixed(0);

  return (
    <Card className="shadow-lg relative h-fit hover:shadow-xl transition-shadow duration-300">
      {handleDelete ? (
        <div
          onClick={() => handleDelete(product._id)}
          className="cursor-pointer absolute top-3 right-3"
        >
          <XIcon />
        </div>
      ) : null}
      <a href={`/shop/details/${product._id}`}>
        <CardContent className="p-2 lg:p-3">
          <div className="absolute top-3 left-3">
            {product.stock === 0 ? (
              <Badge className={"bg-red-600"}>Out of stock</Badge>
            ) : product.stock <= 10 ? (
              <Badge className={"bg-red-600"}>left only {product.stock}</Badge>
            ) : null}
          </div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URI}/${product.images[0]}`}
            alt={product.title}
            className="w-full h-48 lg:h-64 object-cover rounded-sm"
          />
          <div className="flex justify-between items-center text-sm font-semibold mt-1">
            <div className="text-sm">{product.brand.name}</div>
            <div className="text-slate-500">{product.subcategory.name}</div>
          </div>
          <div className="text-gray-600 text-sm lg:text-base">
            {productTitle}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-md lg:text-lg font-bold">
              ₹{product.salePrice}
            </span>
            <span className="text-gray-500 line-through text-sm lg:text:md">
              ₹{product.price}
            </span>
            <span>{discount}% off</span>
          </div>
          <div className="text-gray-600 text-xs lg:text-sm">
            Size-{product.size}
          </div>
        </CardContent>
      </a>
    </Card>
  );
}

export default ShoppingProductItem;
