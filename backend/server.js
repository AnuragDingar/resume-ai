require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const generateInterviewReport = require('./src/services/ai.service');
const { jobDescription, resume, selfDescription } = require('./src/services/temp');

// Connect to the database
connectDB();
generateInterviewReport(jobDescription, resume, selfDescription).catch(console.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
