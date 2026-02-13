import express from 'express'
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo
} from '../controller/todo.controller.js';


const router = express.Router();


router.post('/', createTodo)
router.get('/', getTodos)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)

export default router;