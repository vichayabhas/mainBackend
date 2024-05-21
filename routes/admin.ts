import express from "express";
import { getCampNames } from "../controllers/admin";

const router=express.Router()
router.get('/getCampNames/',getCampNames)
export default router