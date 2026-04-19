import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx"; // add .jsx ?

function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;