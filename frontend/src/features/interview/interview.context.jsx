import React, { createContext } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [report, setReport] = React.useState(null);
  const [ reports, setReports ] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
      {children}
    </InterviewContext.Provider>
  );
}