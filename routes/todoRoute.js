import express from 'express';
import { createTodo } from '../controllers/todoController.js';
import { getAllTodos, getTodoById } from '../controllers/todoController.js';
import { deleteAllTodos,deleteTodoById } from '../controllers/todoController.js';
import { updateTodoById } from '../controllers/todoController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();
// create todos
router.post('/create', authenticateUser, createTodo);


//get todos
router.get('/get', authenticateUser, getAllTodos);
router.get('/get/:id', authenticateUser, getTodoById);


//delete todos
router.delete('/delete', authenticateUser, deleteAllTodos);
router.delete('/delete/:id', authenticateUser, deleteTodoById);

//update Todo
router.put('/update/:id', authenticateUser, updateTodoById);

export default router;
