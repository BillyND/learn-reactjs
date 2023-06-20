import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./component/Admin/Admin";
import Home from "./component/Home/Home";
import DashBoard from "./component/Admin/content/DashBoard";
import ManageUser from "./component/Admin/content/User/ManageUser";
import ManageQuiz from "./component/Admin/content/Quizzes/ManageQuiz";
import ManageQuestion from "./component/Admin/content/Questions/ManageQuestion";
import Login from "./component/Auth/Login";
import Signup from "./component/Auth/Signup";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import ListQuiz from "./component/User/ListQuiz";
import DetailtQuiz from "./component/User/DetailQuiz";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import PrivateRoute from "./component/Admin/content/PrivateRoute";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div class="page_404 container">
      <div class="four_zero_four_bg">
        <h1>404</h1>
      </div>
      <div class="contant_box_404">
        <h3 class="h2">Look like you're lost</h3>
        <p>the page you are looking for not avaible!</p>
        <button
          class="link_404"
          onClick={() => {
            navigate("./");
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />

          <Route path="/admin/manage-user" element={<ManageUser />} />
          <Route path="/admin/manage-quiz" element={<ManageQuiz />} />
          <Route path="/admin/manage-question" element={<ManageQuestion />} />
        </Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/quiz/:id"
          element={
            <PrivateRoute>
              <DetailtQuiz />
            </PrivateRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
