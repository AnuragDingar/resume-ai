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



/**
 * @route GET /api/interview/:interviewId
 * @desc Get interview report by interview ID
 * @access Private
 */

interviewRouter.get('/:interviewId', authMiddleware, interviewController.getInterviewReportByIdController);


/** 
 * @route GET /api/interviews
 * @desc Get all interview reports of the authenticated user
 * @access Private
*/

interviewRouter.get('/', authMiddleware, interviewController.getAllInterviewReportsController);

/**
 * @routes GET /api/interviews/:interviewId/pdf
 * @desc Get the PDF version of the interview report by interview ID
 * @access Private      
 */

interviewRouter.get('/:interviewId/pdf', authMiddleware, interviewController.genrateResumePdfController);


module.exports = interviewRouter;