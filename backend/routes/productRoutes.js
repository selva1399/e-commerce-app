import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  releatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// Routes

// Create Product Router
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// Update Product Router
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// Get All Products Router
router.get("/get-product", getProductController);

// Get Single Prouduct Router
router.get("/get-product/:slug", getSingleProductController);

// Get Photo Router
router.get("/product-photo/:pid", getProductPhotoController);

// Delete Product Router
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// Filter Product
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

// Product per page
router.get("/product-list/:page", productListController);

// Search product
router.get("/search/:keyword", searchProductController);

// Similar product
router.get("/releated-product/:pid/:cid", releatedProductController);

// Category wise product
router.get("/product-category/:slug", productCategoryController);

// ------------------------------- PAYMENT GATEWAY ROUTES -------------------------------------------//
// Payments Routes

// Token
router.get("/braintree/token", braintreeTokenController);

// Payment
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
