import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import MainHome from "./MainHome";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import MalwareScanner from "./components/MalwareScanner/MalwareScanner";
import Chatbot from "./components/Chatbot";
import FileUpload from "./components/FileUpload";
import { ToastProvider } from "./components/Toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/scanner" element={<MalwareScanner />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
