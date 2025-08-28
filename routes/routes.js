import { Router } from "express";
import healthController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import privacyController from "../controllers/privacy.js";
// import isAuth
// import listTodos
// import createTodos
// import viewTodo
// import updateTodo
// import deleteTodo

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/public", privacyController.publicPath);
// privatePath

//  NESTED ROUTES
//  todo routes
const todoRouter = Router();

// nested /todo to parent routes
// todos/todo...

// middleware to all /todos routes
// ...isAuth...

// /todos router
// listTodos
// createTodo
// viewTodo
// updateTodo
// deleteTodo

export default router;
