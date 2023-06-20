import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../services/apiService";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ModalUpdateQuiz = (props) => {
  const { show, onClickClose, inforUpdateQuiz, fetchAllQuiz, resetDataUpdate } =
    props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState({ value: "EASY" });
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    onClickClose();
    setName("");
    setDescription("");
    setImage("");
    setPreviewImage("");
    setQuizType("");
    resetDataUpdate();
  };

  useEffect(() => {
    setName(inforUpdateQuiz.name);
    setDescription(inforUpdateQuiz.description);
    setQuizType({
      value: inforUpdateQuiz.difficulty,
    });
    setPreviewImage(`data:image/png;base64, ${inforUpdateQuiz.image}`);
    setImage(inforUpdateQuiz.image);
  }, [inforUpdateQuiz]);

  const handleUpImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage("");
      setImage("");
    }
  };

  const handleUpdateQuiz = async () => {
    if (name && description) {
      const resUpdateQUiz = await putUpdateQuiz(
        inforUpdateQuiz.id,
        description,
        name,
        quizType.value,
        image
      );
      if (resUpdateQUiz && resUpdateQUiz.EC == 0) {
        toast.success(resUpdateQUiz.EM);
        handleClose();
        await fetchAllQuiz();
        setName("");
        setDescription("");
        setImage("");
        setQuizType("");
        setPreviewImage("");
      }
    } else {
      toast.error("Invalid input");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row" id="form">
              <div className="col-md-12">
                <label>Quiz Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz Name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label>Quiz Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz Description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group col-md-12">
                <label className="mb-1">Quiz Type</label>
                <Select
                  options={options}
                  placeholder="Quiz Type"
                  defaultValue={{
                    label: inforUpdateQuiz.difficulty,
                    value: inforUpdateQuiz.difficulty,
                  }}
                  onChange={setQuizType}
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="upload-image-quiz" className="btn-upload-image">
                  Upload File Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  hidden
                  id="upload-image-quiz"
                  placeholder="Username"
                  onChange={(event) => handleUpImage(event)}
                />
              </div>
              <div className="preview-image">
                {previewImage ? (
                  <img className="image-preview" src={previewImage} />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
