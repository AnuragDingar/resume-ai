
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


/**
 * @name registerUserController
 * @description Controller function to handle user registration, expects username, email, and password in the request body.
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUserController(req, res) {  
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    const existingUser = await userModel.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: newUser._id , username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(201).json({ 
        message: 'User registered successfully',
        newUser: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
     });

}

/**
 * @name loginUserController
 * @description Controller function to handle user login, expects email and password in the request body.
 * @route POST /api/auth/login 
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );      

    res.cookie('token', token);
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


/** * @name logoutUserController
 * @description Controller function to handle user logout, clears the token cookie and adds the token to the blacklist collection.
 * @route POST /api/auth/logout
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token;
    
    if (token) {
        await tokenBlacklistModel.create({ token });
    } 
    
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}

/**
 * @name getMeController
 * @description Controller function to get the authenticated user's information based on the provided JWT token in the Authorization header. This route is protected and requires a valid token to access.
 * @route GET /api/auth/get-me
 * @access Private ( requires authentication )
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);
    res.status(200).json({ 
        message: 'User information retrieved successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
     });
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
