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

const router = Router();

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

export default router;
