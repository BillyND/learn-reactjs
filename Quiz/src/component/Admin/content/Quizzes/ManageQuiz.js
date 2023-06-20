import "./ManageQuiz.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import { postNewQuiz } from "../../../services/apiService";
import { getAllQuiz } from "../../../services/apiService";
import { getAllUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useNavigate } from "react-router-dom";
import AssignQuiz from "./AssignQuiz";
import QuizQA from "./QuizQA";
import { async } from "q";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState({ value: "EASY" });
  const [previewImage, setPreviewImage] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [dataQuiz, setDataQuiz] = useState({});
  const [dataAddQuiz, setDataAddQuiz] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [inforDeleteQuiz, setInforDeleteQuiz] = useState("");
  const [inforUpdateQuiz, setInforUpdateQuiz] = useState("");
  const [listQuizzes, setListQuizzes] = useState({});
  const [listUsers, setListUsers] = useState({});

  //up preview image
  const handleUpImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    } else {
      setPreviewImage("");
      setQuizImage("");
    }
  };

  //handle post quiz to api
  const handleAddNewQuiz = async () => {
    if (!name || !description || !quizImage) {
      toast.error("Name/Description/Type/Image is required!");
    } else {
      const res = await postNewQuiz(
        description,
        name,
        quizType?.value,
        quizImage
      );
      if (res && res.EC == 0) {
        toast.success(res.EM);
        setName("");
        setDescription("");
        setPreviewImage("");
        setQuizImage("");
        setDataAddQuiz(res);
      } else {
        toast.error(res.EM);
      }
    }
  };

  // useEffect(() => {
  //     fetchAllQuiz()
  // }, [])

  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
  }, [dataAddQuiz]);

  const fetchAllQuiz = async () => {
    const res = await getAllQuiz();
    if (res.EM == "Not authenticated the user") {
      navigate("/login");
    } else {
      setDataQuiz(res.DT);
      const newQuiz = await res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.description}`,
        };
      });

      setListQuizzes(newQuiz);
    }
  };

  const fetchAllUser = async () => {
    const res = await getAllUser();
    if (res.EM == "Not authenticated the user") {
      navigate("/login");
    } else {
      const allUser = await res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUsers(allUser);
    }
  };

  const handleDelete = (quiz) => {
    setInforDeleteQuiz(quiz);
    setShowModalDelete(true);
  };
  const handleCloseDelete = () => {
    setShowModalDelete(false);
  };
  const handleUpdate = (quiz) => {
    setInforUpdateQuiz(quiz);
    setShowModalUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowModalUpdate(false);
  };

  const handleResetDataUpdate = () => {
    setInforUpdateQuiz({});
  };

  return (
    <div className="managerPage quiz">
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>Manage Quiz</h5>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-quiz">
              <hr />
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="mt-3">
                  <Select
                    options={options}
                    placeholder="Quiz Type"
                    defaultValue={{ label: "EASY", value: "EASY" }}
                    onChange={setQuizType}
                  />
                </div>

                <div className="handle-choose-image mt-3">
                  <label htmlFor="upload-image" className="btn-upload-image">
                    Upload Quiz Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="upload-image"
                    hidden
                    onChange={(event) => handleUpImage(event)}
                  />
                </div>

                {/* image preview */}
                <div className="preview-image">
                  {previewImage ? (
                    <img className="image-preview" src={previewImage} />
                  ) : (
                    <span>Preview Image</span>
                  )}
                </div>
                <button
                  onClick={() => handleAddNewQuiz()}
                  className="btn btn-success "
                >
                  Save
                </button>
              </fieldset>
            </div>
            <div className="table-quiz">
              <h5 className="mt-4">List quizzes</h5>
              <TableQuiz
                listQuiz={dataQuiz}
                onClickDeleteQuiz={handleDelete}
                onClickUpdateQuiz={handleUpdate}
              />
              <ModalDeleteQuiz
                show={showModalDelete}
                onClickClose={handleCloseDelete}
                inforDeleteQuiz={inforDeleteQuiz}
                fetchAllQuiz={fetchAllQuiz}
              />
              <ModalUpdateQuiz
                show={showModalUpdate}
                onClickClose={handleCloseUpdate}
                inforUpdateQuiz={inforUpdateQuiz}
                fetchAllQuiz={fetchAllQuiz}
                resetDataUpdate={handleResetDataUpdate}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <QuizQA listQuizzes={listQuizzes} />
      <AssignQuiz listQuizzes={listQuizzes} listUsers={listUsers} />
    </div>
  );
};

export default ManageQuiz;
