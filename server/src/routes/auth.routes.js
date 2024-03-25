import express from 'express';
import { signInController, signUpController } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/sign-up', signUpController);

router.post('/sign-in', signInController);

export default router;