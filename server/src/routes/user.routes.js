import { Router } from 'express';
import {
    getAllUsersController, 
    getUserController,
    deleteUserController,
    updateUserController,
} from '../controllers/user.controllers.js';

const router = Router();

router.get('/all-users', getAllUsersController);

router.get('/:id', getUserController);

router.put('/update/:id', updateUserController);

router.delete('/delete/:id', deleteUserController);

export default router;
