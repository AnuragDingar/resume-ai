import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx"; // add .jsx ?
import { AuthProvider } from "./features/auth/auth.context.jsx";
import Interview from "./features/interview/pages/Interview.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
//doubt: do we need to wrap the entire app with InterviewProvider or just the Interview page ?