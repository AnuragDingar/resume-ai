const { zod } = require("zod");
const Anthropic = require("@anthropic-ai/sdk");
const { z } = require("zod");
const { zodOutputFormat } = require("@anthropic-ai/sdk/helpers/zod");
const { resume, jobDescription, selfDescription } = require("./temp");
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
          .describe(
            "The reason why this question is asked in the interview",
          ),
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
          .describe(
            "The reason why this question is asked in the interview",
          ),
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
});



async function generateInterviewReport(
  jobDescription,
  resume,
  selfDescription,
) {
  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
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
    output_config: { format: zodOutputFormat(interviewReportSchema) },
  });

  console.log("Generated interview report:", msg);
}

generateInterviewReport(jobDescription, resume, selfDescription).catch(
  console.error,
);

module.exports = generateInterviewReport;
