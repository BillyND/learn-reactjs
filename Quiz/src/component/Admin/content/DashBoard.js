import { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { getDashboardOveview } from "../../services/apiService";
const DashBoard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const fetchDashboard = async () => {
    const resDashboard = await getDashboardOveview();
    console.log(resDashboard);
    setTotalUsers(resDashboard.DT.users.total);
    setTotalQuizzes(resDashboard.DT.others.countQuiz);
    setTotalAnswers(resDashboard.DT.others.countAnswers);
    setTotalQuestions(resDashboard.DT.others.countQuestions);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const data = [
    {
      name: "Quizzes",
      QZ: totalQuizzes,
    },
    {
      name: "Questions",
      QS: totalQuestions,
    },
    {
      name: "Answers",
      AS: totalAnswers,
    },
  ];
  // const data = [
  //     {
  //         "name": "Page A",
  //         "U": 100,
  //         "QZ": 200,
  //         "QS": 300,
  //         "AS": 400,

  //     }
  // ]
  return (
    <div className="managerPage dashboard">
      <h3>Analytics DashBoard</h3>
      <div className="dashboard-content mt-5">
        <div className="dashboard-left text-center">
          <div className="total users">
            <div>
              <h6> Total User</h6>
              {totalUsers}
            </div>
          </div>
          <div className="total quizzes">
            <div>
              <h6>Total Quizzes</h6>
              {totalQuizzes}
            </div>
          </div>
          <div className="total questions">
            <div>
              <h6>Total Questions</h6>
              {totalQuestions}
            </div>
          </div>
          <div className="total answers">
            <div>
              <h6>Total Answers</h6>
              {totalAnswers}
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          <BarChart width={300} height={250} data={data} className="barchart">
            <CartesianGrid strokeDasharray="4 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="QZ" fill="#82ca9d" />
            <Bar dataKey="QS" fill="#FFA500" />
            <Bar dataKey="AS" fill="#00BFFF" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
