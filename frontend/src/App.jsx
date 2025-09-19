import "./App.css";
import "./normalize.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Questions } from "./pages/Questions";
import { QuestionDetail } from "./pages/QuestionDetail";
import { StackOverflow } from "./pages/StackOverflow";
import { Interviews } from "./pages/Interviews";
import { RequestInterview } from "./pages/RequestInterview";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Profile } from "./pages/Profile";
import { ProfileOverivew } from "./pages/ProfileOverview";
import { ProfileInterviews } from "./pages/ProfileInterviews";
import { About } from "./pages/About";
import { EmailSent } from "./pages/email/EmailSent";
import { EmailConfirmed } from "./pages/email/EmailConfirmed";
import { GoogleAuthFail } from "./pages/GoogleAuthFail";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/questions"
                element={<Questions></Questions>}
              ></Route>
              <Route
                path="/interviews"
                element={<Interviews></Interviews>}
              ></Route>
              <Route
                path="/interviews/new"
                element={
                  <ProtectedRoute>
                    <RequestInterview></RequestInterview>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile></Profile>
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<ProfileOverivew></ProfileOverivew>}
                ></Route>
                <Route
                  path="interviews"
                  element={<ProfileInterviews></ProfileInterviews>}
                ></Route>
              </Route>
              <Route
                path="/stackoverflow"
                element={<StackOverflow></StackOverflow>}
              ></Route>
              <Route
                path="/questions/:questionId"
                element={<QuestionDetail></QuestionDetail>}
              ></Route>
              <Route path="/about" element={<About></About>}></Route>
              <Route
                path="/auth/email-sent"
                element={<EmailSent></EmailSent>}
              ></Route>
              <Route
                path="/auth/confirm-email"
                element={<EmailConfirmed></EmailConfirmed>}
              ></Route>
              <Route
                path="/auth/google/error"
                element={<GoogleAuthFail></GoogleAuthFail>}
              ></Route>
            </Routes>
          </main>
          <Footer></Footer>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
