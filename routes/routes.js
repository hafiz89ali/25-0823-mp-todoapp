import { Router } from "express";
import healthController from "../controllers/health.js";
// impurt auth controller
// import privacy controller
// import isAuth
// import listTodos
// import createTodos
// import viewTodo
// import updateTodo
// import deleteTodo

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
// registerUser
// loginUser
// publicPath
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
