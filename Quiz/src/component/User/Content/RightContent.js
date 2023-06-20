import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import PerfectScrollbar from "react-perfect-scrollbar";

const RightContent = (props) => {
  const { quizDatas, timeOutSubmit, ClickQuestion, questionId, stopCount } =
    props;
  const [indexClick, setIndexClick] = useState();
  const handleClickQuestion = (event) => {
    ClickQuestion(event);
    setIndexClick(event);
  };

  useEffect(() => {
    handleClickQuestion(questionId);
  }, [questionId]);

  const handleTimeOutSubmit = () => {
    timeOutSubmit();
  };

  const getClassName = (item, index) => {
    // console.log(indexClick)
    // console.log("array", index)
    if (item && item.answers.length > 0) {
      let checkSelected = item.answers.find(
        (answer) => answer.isSelected === true
      );
      if (checkSelected) {
        if (indexClick === index) {
          return `right-content-question selected clicked`;
        } else {
          return `right-content-question selected`;
        }
      }
    }
    if (indexClick === index) {
      return `right-content-question clicked`;
    } else {
      return `right-content-question`;
    }
  };

  return (
    <div>
      <div className="right-content-header text-center">
        <b>
          <CountDown
            timeOutSubmit={handleTimeOutSubmit}
            stopCount={stopCount}
          />
        </b>
      </div>
      <PerfectScrollbar>
        <div className="right-content-content mt-3">
          {quizDatas.map((item, index) => {
            return (
              <div key={`question-${item.questionId}`}>
                <div
                  className={getClassName(item, index)}
                  onClick={() => handleClickQuestion(index)}
                >
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default RightContent;
