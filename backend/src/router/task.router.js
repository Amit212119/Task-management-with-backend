// src/router/task.router.js
import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controller/task.controller.js';

const router = Router();

router.route('/').get(verifyJWT, getTasks);
router.route('/').post(verifyJWT, createTask);

router.route('/:id').delete(verifyJWT, deleteTask);
router.route('/:id').put(verifyJWT, updateTask);

export default router;
