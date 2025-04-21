import express from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../../controllers/admin/subCategory-controller.js";

const route = express.Router();
route.post("/add", addSubCategory);
route.put("/update/:id", updateSubCategory);
route.delete("/delete/:id", deleteSubCategory);
route.get("/list", getSubCategory);

export default route;
