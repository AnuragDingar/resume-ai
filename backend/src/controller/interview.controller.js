const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service"); // service for handling interview report generation logic
const interviewReportModel = require("../models/interviewReport.model"); // mongoose model for interview reports

const generateInterviewReportController = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;
    const resumeFile = req.file; // Access the uploaded file

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    if (!selfDescription || !jobDescription) {
      return res
        .status(400)
        .json({ message: "Self description and job description are required" });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(resumeFile.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only PDF and Word documents are allowed" });
    }

    let resumeContent;

    try {
      resumeContent = (
        await new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))
      ).text; // Parse the PDF content
    } catch (err) {
      console.error("Error parsing resume file:", err);
      return res.status(400).json({ message: "Failed to parse resume file" });
    }

    // Here you would typically call a service function to process the resume and generate the interview report
    // For example:
    // const report = await interviewService.generateReport(resumeFile.path, selfDescription, jobDescription);

    const interviewReportByAi = await generateInterviewReport(
      jobDescription,
      resumeContent,
      selfDescription,
    );

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const interviewReport = await interviewReportModel.create({
      ...interviewReportByAi,
      jobDescription, // from req.body
      resumeText: resumeContent, // parsed PDF text
      selfDescription,
      user: req.user.id, // Associate the report with the authenticated user
    });

    res.status(201).json({
      report: interviewReport,
      message: "Interview report generated successfully",
    });
  } catch (error) {
    console.error("Error generating interview report:", error);
    res.status(500).json({ message: "Failed to generate interview report" });
  }
};

const getInterviewReportByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id, // Ensure the report belongs to the authenticated user
    });

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    res.status(200).json({ report: interviewReport });
  } catch (error) {
    console.error("Error fetching interview report:", error);
    res.status(500).json({ message: "Failed to fetch interview report" });
  }
};

const getAllInterviewReportsController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const interviewReports = await interviewReportModel
      .find({
        user: req.user.id, // Fetch only reports belonging to the authenticated user
      })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillsGap -preparationPlan",
      ); // Sort by most recent

    res.status(200).json({ reports: interviewReports });
  } catch (error) {
    console.error("Error fetching interview reports:", error);
    res.status(500).json({ message: "Failed to fetch interview reports" });
  }
};

const genrateResumePdfController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    const { resumeText, selfDescription, jobDescription } = interviewReport;

    const resumePdfBuffer = await generateResumePdf({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=resume_${interviewId}.pdf`,
    ); // doubt when is this needed. It is needed when we want to send the PDF file as a response to the client. By setting this header, we inform the client that the content being sent is a PDF file, which allows the client to handle it appropriately (e.g., display it in a PDF viewer or prompt the user to download it). If we don't set this header, the client might not recognize the content as a PDF and could try to display it as plain text or in some other incorrect format.
    res.send(resumePdfBuffer);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    res.status(500).json({ message: "Failed to generate resume PDF" });
  }
};

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  genrateResumePdfController,
};
