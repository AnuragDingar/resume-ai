import mongoose from "mongoose";

/**
 * - job description schema : String
 * resume text : String
 * self description : String
 * 
 * matchscore : Number
 * technical questions : [{ "question": "",
 *                           intension: "",
 *                           answer: "",}]
 * 
 * dehavioural questions : [{ "question": "",
 *                             intension: "",
 *                             answer: "",}]
 * 
 * skills gap : [
 *                  skill : "",
 *                  severity : {
 *                   type : String,
 *                   enum : ["low", "medium", "high"]
 *                  }}]
 *             
 * preparation plan : [{
 *                    day : Number, focus: String, tasks: [String]}]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Technical question is required"] },
    intension: { type: String , required: [true, "Intension behind the technical question is required"]},
    answer: { type: String , required: [true, "Answer to the technical question is required"] }
}, { _id: false }
);

const behaviouralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Behavioural question is required"] },
    intension: { type: String , required: [true, "Intension behind the behavioural question is required"]},
    answer: { type: String , required: [true, "Answer to the behavioural question is required"] }
}, { _id: false }
);

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, "Skill name is required"] },
    severity: { 
        type: String, 
        enum: ["low", "medium", "high"],
        required: [true, "Severity level is required"]
    }
}, { _id: false }
);

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, "Day number is required"] },
    focus: { type: String, required: [true, "Focus area is required"] },
    tasks: [{ type: String , required: [true, "At least one task is required"] }]
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: [true, "Job description is required"] },
    resumeText: { type: String},
    selfDescription: { type: String },
    matchScore: { type: Number, min : 0, max : 100 },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillsGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]
}, { timestamps: true });

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

export default interviewReportModel;