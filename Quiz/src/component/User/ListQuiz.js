import { useEffect, useState } from "react";
import { getQuizByUser } from "../services/apiService";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/login");
    } else {
      getQUizData();
    }
  }, []);

  const getQUizData = async () => {
    const quizData = await getQuizByUser();
    if (quizData && quizData.EC == 0) {
      setArrQuiz(quizData.DT);
    }
  };

  return (
    <PerfectScrollbar>
      <div className="arr-quiz container">
        {arrQuiz ? (
          arrQuiz.map((quiz, index) => {
            return (
              <div key={index + "quiz"} className="quiz-card card mb-5">
                <img
                  className="card-img-top"
                  src={`data:image/jpeg;base64, ${quiz.image}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{quiz.name}</h5>
                  <p className="card-text">{quiz.description}</p>
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/quiz/${quiz.id}`, { state: quiz.description });
                    }}
                  >
                    Start now
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div>There are no quizzes, please add more...</div>
        )}
      </div>
    </PerfectScrollbar>
  );
};

export default ListQuiz;
