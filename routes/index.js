/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-multi-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions

import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';  // Import AuthController
import UsersController from '../controllers/UsersController'; // Import UsersController

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);  // Add connect endpoint
router.get('/disconnect', AuthController.getDisconnect);  // Add disconnect endpoint
router.get('/users/me', UsersController.getMe);  // Add getMe endpoint

export default router;