import Lightbox from "react-awesome-lightbox";
import _ from "lodash";
import { useState } from "react";
import "./DetailQuiz.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
const Question = (props) => {
  const {
    dataQuiz,
    questionId,
    onClickCheckbox,
    finishedQuiz,
    dataResult,
    showAnswer,
  } = props;
  const [isPreview, setIsPreview] = useState(false);

  //check data empty
  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }

  const handleCheckBox = (event, answerId, questionId) => {
    onClickCheckbox(answerId, questionId);
  };

  if (finishedQuiz) {
    var elementDisable = document.querySelector(".question-answer");
    elementDisable.classList.add("none-choose-question");
  }

  return (
    <>
      <div className="question-image">
        {dataQuiz.image ? (
          <div>
            <img
              src={`data:image/png;base64, ${dataQuiz.image}`}
              onClick={() => setIsPreview(true)}
            />
          </div>
        ) : (
          <div className="no-image"></div>
        )}
      </div>
      <div className="question-question">
        Question {questionId + 1}: {dataQuiz.questionDescription} ?
      </div>
      <PerfectScrollbar>
        <div className="question-answer">
          {dataQuiz.answers.map((a, index) => (
            <div
              key={`question - ${index}`}
              className="a-child"
              id={`question-${a.id}`}
            >
              <div className="form-check">
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault-${index}`}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`flexCheckDefault-${index}`}
                    onChange={(event) =>
                      handleCheckBox(event, a.id, dataQuiz.questionId)
                    }
                    checked={a.isSelected}
                  />
                  {a.description}

                  {dataResult && showAnswer === true ? (
                    dataResult.systemAnswers.map((sysA) => {
                      sysA.id === a.id
                        ? (a.isCorrect = true)
                        : (a.isCorrect = false);
                    })
                  ) : (
                    <></>
                  )}

                  {dataResult &&
                  a.isSelected === true &&
                  showAnswer === true ? (
                    a.isCorrect === true ? (
                      <></>
                    ) : (
                      <IoMdClose className="iconError" />
                    )
                  ) : (
                    <></>
                  )}
                  {dataResult && showAnswer === true ? (
                    a.isCorrect === true ? (
                      <IoMdCheckmark className="iconCorrect" />
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
      </PerfectScrollbar>
      {isPreview && (
        <Lightbox
          image={`data:image/png;base64, ${dataQuiz.image}`}
          onClose={() => setIsPreview(false)}
        />
      )}
    </>
  );
};

export default Question;
