import express from "express"
import { version_api } from "../helpers/version.api.helper"
import { BrandController } from "../controllers/brand.controller"
import { ProductController } from "../controllers/product.controller";
import { SummaryController } from "../controllers/summary.controller";

export const router = express.Router()
// Brand
router.post(`/${version_api}/brand`, BrandController.create);
router.put(`/${version_api}/brand/:id`, BrandController.update);
router.get(`/${version_api}/brands`, BrandController.getBrands);
router.delete(`/${version_api}/brand/:id`, BrandController.delete);
router.get(`/${version_api}/brand/:id`, BrandController.getBrand);

// Product
router.post(`/${version_api}/product`, ProductController.create)
router.put(`/${version_api}/product/:id`, ProductController.update)
router.delete(`/${version_api}/product/:id`, ProductController.delete)
router.get(`/${version_api}/products`, ProductController.getBrands)
router.get(`/${version_api}/product/:id`, ProductController.getBrand)

// Summary
router.get(`/${version_api}/summary`, SummaryController.get)