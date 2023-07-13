import express from "express";
import {
  adminLoginController,
  adminSignUpController,
  addQuestionController,
  updateQuestionController,
  deleteQuestionController,
  addTestCaseController
} from "../controller/admin.controller";
import { isAdmin } from "../middelware/isAdminMiddelware";
import { isAuthenticated } from "../middelware/authMiddelware";

const router = express.Router();

router.post("/login", adminLoginController);
router.post("/signup", adminSignUpController);

// add  question
router.post("/problem", isAuthenticated, isAdmin, addQuestionController);

// update question
router.put("/problem/:id", isAuthenticated, isAdmin, updateQuestionController);

// delete question
router.delete("/problem/:id", isAuthenticated, isAdmin, deleteQuestionController);

// Add test case to the problem with problem id ID
router.post("/add-test-case/:id", isAuthenticated, isAdmin, addTestCaseController) 

export default router;
