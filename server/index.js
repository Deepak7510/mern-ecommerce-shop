import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/auth-route.js";
import connectDB from "./config/database.js";
import adminProductRouter from "./routes/admin/products-route.js";
import adminCategoryRouter from "./routes/admin/category-route.js";
import adminBrandRouter from "./routes/admin/brand-route.js";
import adminSubCategoryRouter from "./routes/admin/subcategory-route.js";
import shopProductRouter from "./routes/shop/shopping-product-route.js";
import shopCartRouter from "./routes/shop/cart-route.js";
import shopAddressRouter from "./routes/shop/address-route.js";
import shopOrderRouter from "./routes/shop/order-route.js";
import shopSearchRouter from "./routes/shop/search-route.js";
import AdminOrderRouter from "./routes/admin/order-route.js";
import shopReviewRouter from "./routes/shop/review-route.js";
import shopWishlistRouter from "./routes/shop/wishlist-route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const FROUNTED_URL = process.env.FROUNTED_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FROUNTED_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// for make image static
app.use("/uploads", express.static(path.join("./uploads")));

// all routes
app.use("/api/auth", authRouter);
app.use("/api/admin/product", adminProductRouter);
app.use("/api/admin/category", adminCategoryRouter);
app.use("/api/admin/brand", adminBrandRouter);
app.use("/api/admin/subcategory", adminSubCategoryRouter);
app.use("/api/admin/order", AdminOrderRouter);

app.use("/api/shopping/product", shopProductRouter);
app.use("/api/shopping/cart", shopCartRouter);
app.use("/api/shopping/address", shopAddressRouter);
app.use("/api/shopping/order", shopOrderRouter);
app.use("/api/shopping/search", shopSearchRouter);
app.use("/api/shopping/review", shopReviewRouter);
app.use("/api/shopping/wishlist", shopWishlistRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
