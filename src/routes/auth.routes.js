const { Router } = require('express');
const authRouter = Router();
const User = require('../models/user.model');
const authController = require('../controller/auth.controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */

// Register a new user
authRouter.post('/register', authController.registerUserController);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user with email and password, returns a JWT token on successful authentication
 * @access  Public
 */

// Login a user
authRouter.post('/login', authController.loginUserController);

/**
 * @route   GET /api/auth/logout ( can be post as well, but get is more common for logout )
 * @desc    clear token from user cookie and add the token in blacklist collection to invalidate the token for future use
 * @access  Public ( sometimes token is not there then we can just clear the cookie and send response, so we can keep it public )
 */

// Logout a user
authRouter.get('/logout', authController.logoutUserController);

/**
 *  @route GET  /api/auth/get-me
 * * @desc Get the authenticated user's information based on the provided JWT token in the Authorization header. This route is protected and requires a valid token to access.  
 * * @access Private ( requires authentication )
 * 
 */

authRouter.get('/get-me', authController.getMeController);

module.exports = authRouter;