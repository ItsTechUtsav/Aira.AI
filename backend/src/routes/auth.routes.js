const express = require('express');
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser); 
router.get("/me", authController.getMe);

router.put(
  '/change-username',
  authMiddleware,
  authController.changeUsername
);

router.post(
  '/verify-password',
  authMiddleware,
  authController.verifyPassword
);

router.put(
  '/change-password',
  authMiddleware,
  authController.changePassword
);

router.delete(
  '/delete-account',
  authMiddleware,
  authController.deleteAccount
);


module.exports = router;