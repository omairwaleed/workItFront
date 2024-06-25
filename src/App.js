import MainRoute from "./navigation/routes/mainRoute";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <MainRoute />;
      <ToastContainer />
    </>
  );
}

export default App;
