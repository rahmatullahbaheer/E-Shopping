const express = require("express");
const router = express.Router();
const categoryValidations = require("../validations/categoryValidatons");
const Category = require("../controllers/Category");
const Authorization = require("../services/Authorization");
router.post("/create-category", Category.create);
router.get("/categories/:page", Category.categories);
router.get(
  "/fetch-category/:id",
  Category.fetchCategory
);
router.put(
  "/update-category/:id",
  [categoryValidations, Authorization.authorized],
  Category.updateCategory
);
router.put(
  "/update-category-image",
  Category.imageUpdate
);
router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  Category.deleteCategory
);
router.get("/allcategories", Category.allCategories);
router.get("/random-categories", Category.randomCategories);
module.exports = router;
