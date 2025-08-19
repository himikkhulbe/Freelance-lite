import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {uploadServices, getMyServices, getServices, getservice, deleteService, updateService, getAllServices, UploadOrder, getOrders, editOrder, cancelOrder} from "../controller/serviceController.js";

const router = express.Router();

router.post("/service", protect, uploadServices); // Endpoint to create a new service
router.get("/services/my", protect, getMyServices); // Endpoint to get services of the logged-in user
router.get("/services/:id", getServices); // Endpoint to get services of a specific user by ID
router.get("/service/:id", getservice); // Endpoint to get a specific service by ID
router.put("/service/:id", protect, updateService); // Endpoint to update a specific service by ID
router.delete("/service/:id", protect, deleteService); // Endpoint to delete a specific service by ID
router.get("/services", getAllServices); // Endpoint to get all services
router.post("/service/:id/order", protect, UploadOrder);
router.get("/myorders", protect, getOrders);
router.put("/editorder/:id", protect, editOrder);
router.put("/cancelorder/:id", protect, cancelOrder);
export default router;
