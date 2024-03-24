import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const routerApi = Router();

routerApi.use('/auth', authRoutes);

routerApi.use('/user', userRoutes);

export default routerApi;