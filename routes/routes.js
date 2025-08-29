import { Router } from "express";
import healthController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import privacyController from "../controllers/privacy.js";
import isAuth from "../middlewares/isAuth.js";
import createTodo from "../controllers/todos/create.js";
import viewTodo from "../controllers/todos/view.js";
import listTodos from "../controllers/todos/list.js";
import updateTodo from "../controllers/todos/update.js";
import deleteTodo from "../controllers/todos/delete.js";

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/public", privacyController.publicPath);
router.get("/private", isAuth, privacyController.privatePath);

//  NESTED ROUTES
//  todo routes
const todoRouter = Router();

// nested /todo to parent routes
router.use("/todo", todoRouter);

// middleware to all /todos routes
todoRouter.use(isAuth);

// /todos router
todoRouter.get("/", listTodos);
todoRouter.post("/", createTodo);
todoRouter.get("/:id", viewTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default router;
