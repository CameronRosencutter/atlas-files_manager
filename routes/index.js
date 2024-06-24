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
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);
router.put('/files/:id/publish', FilesController.putPublish); // Add endpoint for publishing file
router.put('/files/:id/unpublish', FilesController.putUnpublish); // Add endpoint for unpublishing file

export default router;
