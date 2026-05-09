const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware'); // used for authentication and authorization as api is private
const interviewController = require('../controller/interview.controller'); // controller for handling interview related logic
const interviewRouter = express.Router();
const upload = require('../middlewares/file.middleware'); // middleware for handling file uploads

/**
 * @route POST /api/interviews
 * @desc Generate new interview report on basis of resume, self description and job description
 * @access Private
 */


// upload after authentication as api is private and only authenticated users can upload their resume and generate interview report
interviewRouter.post('/', authMiddleware, upload.single('resume'), interviewController.generateInterviewReportController);
module.exports = interviewRouter;