import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import eventRoutes from './event.routes.js';
import commentRoutes from './comments.routes.js';

const routerApi = Router();

routerApi.use('/auth', authRoutes);

routerApi.use('/user', userRoutes);

routerApi.use('/event', eventRoutes);

routerApi.use('/comment', commentRoutes);

export default routerApi;