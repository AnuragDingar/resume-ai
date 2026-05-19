const Anthropic = require("@anthropic-ai/sdk");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { zodOutputFormat } = require("@anthropic-ai/sdk/helpers/zod");
const puppeteer = require("puppeteer");
// const { resume, jobDescription, selfDescription } = require("./temp");
const client = new Anthropic();

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job requirements",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked in the interview"),
        intension: z
          .string()
          .describe("The reason why this question is asked in the interview"),
        answer: z
          .string()
          .describe("The ideal approach & answer to this question"),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intentions and ideal answers ",
    ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioural question asked in the interview"),
        intension: z
          .string()
          .describe("The reason why this question is asked in the interview"),
        answer: z
          .string()
          .describe("The ideal approach & answer to this question"),
      }),
    )
    .describe(
      "Behavioural questions that can be asked in the interview along with their intentions and ideal answers ",
    ),
  skillsGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill gap identified for the candidate"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity level of the skill gap"),
      }),
    )
    .describe("The skill gaps identified for the candidate"),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The focus area for that day"),
        tasks: z
          .array(z.string())
          .describe("The specific tasks to be completed on that day"),
      }),
    )
    .describe("The preparation plan for the candidate"),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function generateInterviewReport(
  jobDescription,
  resume,
  selfDescription,
) {
  try {
    const msg = await client.messages.parse({
      model: "claude-haiku-4-5",
      max_tokens: 10000,
      messages: [
        {
          role: "user",
          content:
            "Genrate an interview report for a candidate based on the following information: \n\n" +
            "Job Description: " +
            jobDescription +
            "\n\n" +
            "Resume: " +
            resume +
            "\n\n" +
            "Self Description: " +
            selfDescription +
            "\n\n" +
            "The report should include the following sections: \n" +
            "1. Match Score: A score between 0 and 100 indicating how well the candidate matches the job requirements. \n" +
            "2. Technical Questions: A list of technical questions that can be asked in the interview along with their intentions and ideal answers. \n" +
            "3. Behavioural Questions: A list of behavioural questions that can be asked in the interview along with their intentions and ideal answers. \n" +
            "4. Skills Gap: A list of skill gaps identified for the candidate along with their severity levels (low, medium, high). \n" +
            "5. Preparation Plan: A day-wise preparation plan for the candidate to improve their chances of success in the interview, including specific tasks to be completed each day. \n\n" +
            "Please provide the report in a structured format that can be easily parsed and displayed in a user-friendly manner.",
        },
      ],
      output_config: {
        format: zodOutputFormat(interviewReportSchema, "interviewReport"),
      },
    });
    //  console.log("Generated interview report:", msg.parsed_output);
    return msg.parsed_output;
  } catch (error) {
    console.error("Error generating interview report:", error);
    throw new Error("Failed to generate interview report");
  }
}

async function generatePdfFromHtml(htmlContent) {
  try {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    // Saves the PDF to hn.pdf.
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF from HTML:", error);
    throw new Error(`Failed to generate PDF from HTML: ${error.message}`);
  }
}
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  try {
    const resumePdf = z.object({
      html: z
        .string()
        .describe(
          "The HTML content of the resume which can be converted to PDF format",
        ),
    });

    const prompt = `Generate version of the resume based on the following information:
          Resume: ${resume}
          Self Description: ${selfDescription}
          Job Description: ${jobDescription}
          Please provide the resume content in JSON object with a single field 'html' which contains the HTML content of the resume. The HTML should be well-structured and formatted in a way that it can be easily converted to PDF format.
          The content of the resume should not sound like AI generated and should be as close to human-written as possible.
          You can highlights the important sections of the resume such as skills, experience and education in a visually appealing way. Using html tags like <b>, <i>, <u>, <h1>, <h2>, <h3>, <ul>, <li> to format the content appropriately.
          The content should be ATS friendly and should not include any information that is not present in the original resume, self description or job description.
          It should not be vey long idealy within 2 pages when converted to PDF format.`;

    const msg = await client.messages.parse({
      model: "claude-haiku-4-5",
      max_tokens: 10000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      output_config: {
        format: zodOutputFormat(resumePdf, "resumePdf"),
      },
    });

    if (!msg.parsed_output || !msg.parsed_output.html) {
      throw new Error("Invalid response format from AI model");
    }

    console.log("Generated resume html:", msg.parsed_output);

    const pdfBuffer = await generatePdfFromHtml(msg.parsed_output.html);
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    throw new Error(`Failed to generate resume PDF: ${error.message}`);
  }
}

module.exports = {
  generateInterviewReport,
  generateResumePdf,
};
