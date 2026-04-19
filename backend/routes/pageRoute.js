import express from 'express';
import { createPage, getPages, updatePage, deletePage } from '../controllers/pageController.js';
import authUser from '../middlewares/auth.js';

const pageRouter = express.Router();

pageRouter.post('/create', authUser, createPage);
pageRouter.post('/list', authUser, getPages);
pageRouter.post('/update', authUser, updatePage);
pageRouter.post('/delete', authUser, deletePage);

export default pageRouter;