/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-multi-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController'; // Import the new controller

const router = Router();

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
router.post('/files', FilesController.postUpload);
router.get('/files/:id', FilesController.getShow); // Add endpoint for retrieving file by ID
router.get('/files', FilesController.getIndex); // Add endpoint for retrieving all files with pagination

export default router;
