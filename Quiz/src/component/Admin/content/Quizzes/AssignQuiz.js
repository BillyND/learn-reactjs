import "./ManageQuiz.css";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import { async } from "q";
import { postQuizToUser } from "../../../services/apiService";
import { useState } from "react";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const { listQuizzes, listUsers } = props;
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isWaitingRes, setIsWaitingRes] = useState(false);

  const handleAssignQuiz = async () => {
    if (selectedQuiz === undefined || selectedUser === undefined) {
      toast.error("Please select quiz or user");
      console.log(selectedQuiz);
      console.log(selectedUser);
      return;
    }
    setIsWaitingRes(true);
    const res = await postQuizToUser(+selectedQuiz.value, +selectedUser.value);
    if (res && res.DT && res.EC === 0) {
      setIsWaitingRes(false);
      toast.success(res.EM);
    } else {
      setIsWaitingRes(false);
      toast.error(res.EM);
    }
  };

  return (
    <Accordion defaultActiveKey="1" className="mt-2 mb-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h5>Add quiz to User</h5>
        </Accordion.Header>
        <Accordion.Body>
          <div className="assign-quiz">
            <div className="select-question col-md-6 ">
              <label>Select Quiz:</label>
              <Select
                isDisabled={isWaitingRes}
                options={listQuizzes}
                onChange={(event) => setSelectedQuiz(event)}
              />
            </div>
            <div className="select-question col-md-6 mx-2">
              <label>Select User:</label>
              <Select
                isDisabled={isWaitingRes}
                options={listUsers}
                onChange={(event) => setSelectedUser(event)}
              />
            </div>
          </div>

          <button
            className="btn btn-success"
            disabled={
              isWaitingRes ||
              selectedQuiz === undefined ||
              selectedUser === undefined
            }
            onClick={() => handleAssignQuiz()}
          >
            Save
          </button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AssignQuiz;
