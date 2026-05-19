import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
  generateResumePdf,
} from "../services/interview.api";
import { createContext, useContext, useState } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    try {
      setLoading(true);
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume: resumeFile,
      });
      setReport(data.report);
      return data;
    } catch (error) {
      console.error("Error generating interview report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    try {
      setLoading(true);
      const data = await getInterviewReportById(interviewId);
      setReport(data.report);
      return data;
    } catch (error) {
      console.error("Error fetching interview report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllReports = async () => {
    try {
      setLoading(true);
      const data = await getAllInterviewReports();
      setReports(data.reports);
      return data.reports;
    } catch (error) {
      console.error("Error fetching interview reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  const getResumePdf = async (interviewId) => {
    try {
      setPdfLoading(true);
      setPdfError(null);
      const pdfBlob = await generateResumePdf(interviewId);

      // Create a download link
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `resume-${interviewId}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfError("Failed to download. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
    getResumePdf,
    pdfLoading,
    pdfError,
  };
};
