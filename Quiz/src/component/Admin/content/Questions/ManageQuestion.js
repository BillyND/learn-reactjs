import React, { useState } from "react";
import Select from "react-select";
import "./Question.css";
import {
  FiMinusCircle,
  FiPlusCircle,
  FiPlusSquare,
  FiPlus,
  FiMinus,
  FiMinusSquare,
} from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { VscDebugBreakpointData, VscMention } from "react-icons/vsc";
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import {
  getAllQuiz,
  postAnswer,
  postQuestion,
} from "../../../services/apiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImSpinner } from "react-icons/im";

const ManageQuestion = () => {
  const navigate = useNavigate();
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [imagePreviewName, setImagePreviewName] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [dataQuiz, setDataQuiz] = useState({});
  const [listQuizzes, setListQuizzes] = useState([]);
  const [isDelayLogin, setIsDelayLogin] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];

  const handleAddRemoveQuestion = (type, idQuestion) => {
    let cloneQuestions = _.cloneDeep(questions);
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      cloneQuestions.push(newQuestion);
      setQuestions(cloneQuestions);
    }
    if (type === "REMOVE") {
      cloneQuestions = cloneQuestions.filter((item) => item.id !== idQuestion);
      setQuestions(cloneQuestions);
    }
  };

  const handleAddRemoveAnswer = (type, idQuestion, idAnswer) => {
    let cloneQuestions = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = cloneQuestions.findIndex((item) => item.id === idQuestion);
      if (index > -1) {
        cloneQuestions[index].answers.push(newAnswer);
        setQuestions(cloneQuestions);
      }
    }
    if (type === "REMOVE") {
      let index = cloneQuestions.findIndex((item) => item.id === idQuestion);
      if (index > -1) {
        let answerDelete = cloneQuestions[index].answers.filter(
          (item) => item.id !== idAnswer
        );
        cloneQuestions[index].answers = answerDelete;
        setQuestions(cloneQuestions);
      }
    }
  };

  const handleOnchange = (type, idQuestion, value) => {
    let cloneQuestions = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = cloneQuestions.findIndex((item) => item.id === idQuestion);
      cloneQuestions[index].description = value;
      setQuestions(cloneQuestions);
    }
  };

  const handleChangeFileImage = (event, idQuestion) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === idQuestion);
    if (event.target && event.target.files && event.target.files[0]) {
      cloneQuestions[index].imageFile = event.target.files[0];

      //limit file name if length more than 20
      var filePath = event.target.files[0].name;
      var name;

      name = filePath.replace(/^.*[\\\/]/, "");

      var ext = filePath.substring(filePath.lastIndexOf(".") + 1); //getting file extension

      var fileName = name.substring(0, name.length - 4); // storing 0th position till extension begining

      var fileNameNew = "";
      if (fileName.length > 20) {
        var fileNameFst = fileName.substring(0, 10); //first part of file
        var fileNameLst = fileName.substring(
          fileName.length - 3,
          fileName.length
        ); //last part of file
        fileNameNew = fileNameFst + "....." + fileNameLst + "." + ext; //combine all parts
      } else {
        fileNameNew = fileName + "." + ext; //if length less than 20
      }
      cloneQuestions[index].imageName = fileNameNew;
      setQuestions(cloneQuestions);
    } else {
      cloneQuestions[index].imageName = "0 file is uploaded";
    }
  };

  const handleChangeAnswer = (type, idQuestion, idAnswer, event) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === idQuestion);
    cloneQuestions[index].answers = cloneQuestions[index].answers.map(
      (item) => {
        if (type === "ANSWER" && item.id === idAnswer) {
          item.description = event;
        }
        if (type === "CHECKBOX" && item.id === idAnswer) {
          item.isCorrect = event;
        }
        return item;
      }
    );
    setQuestions(cloneQuestions);
  };

  const handlePreviewImageQuestion = (image, name) => {
    if (image) {
      setShowPreviewImage(URL.createObjectURL(image));
      setImagePreviewName(name);
      setIsPreview(true);
    } else {
      setShowPreviewImage("");
    }
  };

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuiz();
    if (res.EM === "Not authenticated the user") {
      navigate("/login");
    } else {
      const newQuiz = await res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.description}`,
        };
      });
      setListQuizzes(newQuiz);
    }
  };

  const handleSaveQuestions = async () => {
    //validate selected quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Invalid Select Quiz");
      setIsDelayLogin(false);
      return;
    }
    let indexQues = 0;
    for (const question of questions) {
      indexQues++;
      var countIsCorrect = 0;

      //validate description question
      if (question.description.length === 0) {
        toast.error(`Description is empty in question ${indexQues}`);
        return;
      }

      //validate number of answers
      if (question.answers.length < 2) {
        toast.error(
          `The number of answers must be more than 1 in question ${indexQues}`
        );
        return;
      }

      let indexAns = 0;
      for (const answer of question.answers) {
        indexAns++;
        //validate description answer
        if (answer.description.length === 0) {
          toast.error(
            `Description is empty in in question ${indexQues}, answer ${indexAns}`
          );
          return;
        }
        if (answer.isCorrect === true) {
          countIsCorrect++;
        }
      }

      //validate number of correct answers
      if (countIsCorrect == 0) {
        toast.error(`There must be 1 correct answer in question ${indexQues}`);
        return;
      }
    }

    //submit api question, answers
    for (const question of questions) {
      setIsDelayLogin(true);
      var resQues = await postQuestion(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        var resAns = await postAnswer(
          resQues.DT.id,
          answer.description,
          answer.isCorrect
        );
      }
    }

    if (resQues && resAns) {
      setIsDelayLogin(false);
    }

    if (resQues && resQues.EC === 0 && resAns && resAns.EC === 0) {
      setQuestions(initQuestion);
      toast.success("Create questions and answers succeeded");
    }
  };

  return (
    <div className="managerPage question">
      <h4>Manage Question</h4>
      <hr />
      <div className="select-question col-md-6">
        <label>Select Quiz:</label>
        <Select
          options={listQuizzes}
          onChange={(event) => setSelectedQuiz(event)}
        />
      </div>

      {/* add new question */}
      <label>Add question:</label>
      {questions.map((question, index) => {
        return (
          <div key={question.id} className="add-question-answer">
            <div className="add-question">
              <div className="icon-list-question">
                {" "}
                <VscDebugBreakpointData />
              </div>
              <div className="form-floating col-md-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Question's Description"
                  required
                  value={question.description}
                  onChange={(event) =>
                    handleOnchange("QUESTION", question.id, event.target.value)
                  }
                />
                <label>Description question {index + 1}</label>
              </div>

              <div className="btn-add-question mx-4">
                {/* upload File image */}
                <div className="btn-upload-image-question">
                  <label htmlFor={question.id}>
                    {" "}
                    <RiImageAddFill
                      htmlFor={question.id}
                      className="btn-upload-image-question"
                    />
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    className="form-control"
                    hidden
                    id={question.id}
                    placeholder="Username"
                    onChange={(event) =>
                      handleChangeFileImage(event, question.id)
                    }
                  />
                </div>

                {/* image name */}
                <div>
                  <span
                    className="image-question-name mx-2"
                    onClick={() =>
                      handlePreviewImageQuestion(
                        question.imageFile,
                        question.imageName
                      )
                    }
                  >
                    {question.imageName || `0 file is uploaded`}
                  </span>
                  <BsFillPatchPlusFill
                    className="iconPlusQuestion mx-2"
                    onClick={() => handleAddRemoveQuestion("ADD", question.id)}
                  />
                  {questions.length > 1 && (
                    <BsPatchMinusFill
                      className="iconMinusQuestion mx-2"
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            {/* list answers */}
            {question.answers.map((answer, index) => {
              return (
                <div className="add-new-answer mx-5" key={answer.id}>
                  {/* onchange check box */}
                  <input
                    type="checkbox"
                    className="form-check-input mt-3 mx-3"
                    onChange={(event) =>
                      handleChangeAnswer(
                        "CHECKBOX",
                        question.id,
                        answer.id,
                        event.target.checked
                      )
                    }
                    checked={answer.isCorrect}
                  />

                  {/* onchange answer */}
                  <div className="form-floating mt-3 col-md-6 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Answer"
                      onChange={(event) =>
                        handleChangeAnswer(
                          "ANSWER",
                          question.id,
                          answer.id,
                          event.target.value
                        )
                      }
                      value={answer.description}
                    />
                    <label>Answer {index + 1}</label>
                  </div>
                  <div>
                    <FiPlusCircle
                      className="iconPlusAnswer mx-2"
                      onClick={() => handleAddRemoveAnswer("ADD", question.id)}
                    />
                    {question.answers.length > 1 && (
                      <FiMinusCircle
                        className="iconMinusAnswer mx-2"
                        onClick={() =>
                          handleAddRemoveAnswer(
                            "REMOVE",
                            question.id,
                            answer.id
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <hr className="mt-5" />
          </div>
        );
      })}

      <button
        className="btn save-questionAnswer btn-success mb-5"
        onClick={() => handleSaveQuestions()}
        disabled={isDelayLogin}
      >
        {isDelayLogin && <ImSpinner className="iconLoading" />}
        <span hidden={isDelayLogin}> Save </span>
      </button>
      {isPreview && (
        <Lightbox
          image={showPreviewImage}
          title={imagePreviewName}
          onClose={() => setIsPreview(false)}
        />
      )}
    </div>
  );
};

export default ManageQuestion;
