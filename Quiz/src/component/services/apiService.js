import axios from "../../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, image) => {
  const dataSubmit = new FormData();
  dataSubmit.append("email", email);
  dataSubmit.append("password", password);
  dataSubmit.append("username", username);
  dataSubmit.append("role", role);
  dataSubmit.append("userImage", image);
  return axios.post("/api/v1/participant", dataSubmit);
};

const getAllUser = () => {
  return axios.get("/api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const dataUpdate = new FormData();
  dataUpdate.append("id", id);
  dataUpdate.append("username", username);
  dataUpdate.append("role", role);
  dataUpdate.append("userImage", image);
  return axios.put("/api/v1/participant", dataUpdate);
};

const deleteUser = (id) => {
  const dataDelete = new FormData();
  dataDelete.append("id", id);
  return axios.delete("/api/v1/participant", { data: dataDelete });
};

const paginationUser = (page, limit) => {
  const dataPaginationUser = new FormData();
  return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password, delay) => {
  return axios.post(`/api/v1/login`, { email, password, delay: 2000 });
};

const postSignup = (email, username, password, delay) => {
  return axios.post(`/api/v1/participant`, {
    email,
    username,
    password,
    delay: 2000,
  });
};

const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
};

const getDataQuizById = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (payload) => {
  return axios.post(`/api/v1/quiz-submit`, { ...payload });
};

const postNewQuiz = (description, name, difficulty, quizImage) => {
  const dataAddQuiz = new FormData();
  dataAddQuiz.append("description", description);
  dataAddQuiz.append("name", name);
  dataAddQuiz.append("difficulty", difficulty);
  dataAddQuiz.append("quizImage", quizImage);
  return axios.post(`/api/v1/quiz`, dataAddQuiz);
};

const getAllQuiz = () => {
  return axios.get(`/api/v1/quiz/all`);
};

const deleteQuiz = (id) => {
  return axios.delete(`/api/v1/quiz/${id}`);
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const dataUpdateQuiz = new FormData();
  dataUpdateQuiz.append("id", id);
  dataUpdateQuiz.append("description", description);
  dataUpdateQuiz.append("name", name);
  dataUpdateQuiz.append("difficulty", difficulty);
  dataUpdateQuiz.append("quizImage", quizImage);
  return axios.put(`/api/v1/quiz`, dataUpdateQuiz);
};

const postQuestion = (quiz_id, description, questionImage) => {
  const dataPostQuestion = new FormData();
  dataPostQuestion.append("quiz_id", quiz_id);
  dataPostQuestion.append("description", description);
  dataPostQuestion.append("questionImage", questionImage);
  return axios.post(`/api/v1/question`, dataPostQuestion);
};

const postAnswer = (question_id, description, correct_answer) => {
  return axios.post(`/api/v1/answer`, {
    question_id,
    description,
    correct_answer,
  });
};

const postQuizToUser = (quizId, userId) => {
  const assignQuiz = new FormData();
  assignQuiz.append("quizId", quizId);
  assignQuiz.append("userId", userId);
  return axios.post(`/api/v1/quiz-assign-to-user`, assignQuiz);
};

const getQuizWithQA = (quizId) => {
  return axios.get(`/api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQuizQA = (data) => {
  return axios.post(`/api/v1/quiz-upsert-qa`, { ...data });
};

const postLogOut = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, { email, refresh_token });
};

const getDashboardOveview = () => {
  return axios.get(`/api/v1/overview`);
};

const postChangePassword = (current_password, new_password) => {
  return axios.post(`/api/v1/change-password`, {
    current_password,
    new_password,
  });
};

const getHistoryQuiz = () => {
  return axios.get("/api/v1/history");
};

export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  paginationUser,
  postLogin,
  postSignup,
  getQuizByUser,
  getDataQuizById,
  postSubmitQuiz,
  postNewQuiz,
  getAllQuiz,
  deleteQuiz,
  putUpdateQuiz,
  postQuestion,
  postAnswer,
  postQuizToUser,
  getQuizWithQA,
  postUpsertQuizQA,
  postLogOut,
  getDashboardOveview,
  postChangePassword,
  getHistoryQuiz,
};
