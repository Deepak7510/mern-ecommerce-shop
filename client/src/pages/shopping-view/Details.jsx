import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { fetchProductDetails } from "@/store/shopping-product-slice";
import { Heart, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "@/components/shopping-view/review";
import { createWishlist, fetchAllWishlist } from "@/store/wishlist-slice";

const ShoppingDetails = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shoppingProduct);
  const { wishlistList } = useSelector((state) => state.shopWishlist);
  const { isLoading, cartItems } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
    dispatch(fetchProductDetails(id));
    dispatch(fetchAllWishlist(user?.id));
  }, [dispatch]);

  function handleAddToCart() {
    if (productDetails.size !== "" && size == null) {
      toast({ title: "Please select the size.", variant: "destructive" });
      return;
    }
    const getCartItems = cartItems.items || [];
    if (getCartItems.length > 0) {
      const indexofCurrentItem = getCartItems.findIndex((item) => {
        return item._id === productDetails?._id;
      });
      if (indexofCurrentItem > -1) {
        const getquantity = getCartItems[indexofCurrentItem].quantity;
        if (getquantity + 1 > productDetails?.stock) {
          toast({
            title: `Only ${productDetails?.stock} can be added for this items.`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: productDetails?._id,
        quantity: 1,
        size,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast({ description: data.payload.message });
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  }

  function handleWishlist() {
    dispatch(
      createWishlist({ userId: user?.id, productId: productDetails?._id })
    ).then((data) => {
      if (data.payload.success) {
        toast({ description: data.payload.message });
        dispatch(fetchAllWishlist(user?.id));
      }
    });
  }

  const checkWishlistOrNot =
    wishlistList && wishlistList.length > 0
      ? wishlistList.findIndex((item) => {
          return item._id == id;
        })
      : -1;

  return (
    <>
      {productDetails?._id ? (
        <div className="px-2 md:p-20 py-20 w-full flex flex-col lg:flex-row justify-center">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-1">
              {productDetails.images.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[230px] md:h-[450px] overflow-hidden"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URI}/${item}`}
                      className=" cursor-move h-full w-full object-cover hover:scale-110 transition-all duration-500"
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full px-2 md:px-10 space-y-1">
            <div className="text-base font-medium">
              {productDetails?.category.name}
            </div>
            <div className="font-medium text-lg md:text-xl">
              {productDetails?.brand?.name}/
              <span className="text-base">
                {productDetails?.subcategory?.name}
              </span>
            </div>
            <div className="text-lg md:text-xl">{productDetails?.title}</div>
            <div className="">
              {productDetails.stock === 0 ? (
                <Badge className={"bg-red-600"}>Out of stock</Badge>
              ) : productDetails.stock <= 10 ? (
                <Badge className={"bg-red-600"}>
                  left only {productDetails.stock}
                </Badge>
              ) : null}
            </div>
            <div className="text-sm font-medium text-green-600">
              Special price
            </div>
            <div className="flex items-center gap-3">
              <span className=" text-xl md:text-2xl font-bold">
                ₹{productDetails?.salePrice}
              </span>
              <span className="text-gray-500 font-bold text-lg md:text-xl line-through">
                ₹{productDetails?.price}
              </span>
              <span className="text-xl md:text-2xl font-bold">
                {(
                  ((productDetails?.price - productDetails?.salePrice) /
                    productDetails?.price) *
                  100
                ).toFixed(0)}
                % off
              </span>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Select Size</div>
              <div className="flex gap-3">
                {productDetails.size?.split(",").map((item) => {
                  return (
                    <Label
                      key={item}
                      onClick={(e) => setSize(e.target.innerText)}
                      className={` ${
                        size === item ? "border border-black" : null
                      } w-10 h-10 flex justify-center items-center bg-slate-200 rounded-full`}
                    >
                      {item}
                    </Label>
                  );
                })}
              </div>
            </div>
            <div className="py-3 flex gap-4">
              <Button
                variant="none"
                className={`${
                  checkWishlistOrNot == -1 ? "" : "bg-red-500"
                } border`}
                onClick={handleWishlist}
              >
                <Heart />
                WishList
              </Button>
              <Button
                disabled={
                  productDetails.stock === 0 ? true : false || isLoading
                }
                onClick={handleAddToCart}
                variant="outline"
              >
                <ShoppingCart />{" "}
                {productDetails.stock === 0 ? "Out of stock" : "Add to Cart"}
              </Button>
            </div>
            <div className="font-semibold">Description</div>
            <div className="text-md text-slate-800">
              {productDetails?.description}
            </div>
            <div className="py-5">
              <Review productDetails={productDetails} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShoppingDetails;
