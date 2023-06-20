import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from "react-toastify";
import { getHistoryQuiz, postChangePassword } from "../services/apiService";

function ProfileUser(props) {
  const { user, show, setClose } = props;
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [quizHistory, setQuizHistory] = useState([]);

  const handleClose = () => setClose(false);

  const handleChangePassword = async () => {
    console.log("changee");
    const resChangePass = await postChangePassword(currentPassword, password);

    if (resChangePass && resChangePass.EC === 0) {
      setCurrentPassword("");
      setPassword("");
      handleClose();
      toast.success(resChangePass.EM);
    } else {
      toast.error(resChangePass.EM);
    }
  };

  useEffect(() => {
    fetchHistoryQuiz();
  }, []);

  const fetchHistoryQuiz = async () => {
    const resHistory = await getHistoryQuiz();
    if (resHistory && resHistory.EC === 0) {
      setQuizHistory(resHistory.DT.data);
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
          <Modal.Title>User information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="infor-flex mb-3"
            >
              <Tab eventKey="home" title="Main Infor">
                <form>
                  <div className="row" id="form">
                    <div className="col-md-6">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={user.email}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={user.username}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Role</label>
                      <select
                        className="form-control"
                        value={user.role}
                        disabled={true}
                      >
                        <option>USER</option>
                        <option>ADMIN</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <label>Image</label>
                    </div>
                    <div className="preview-image">
                      {user.image ? (
                        <img
                          className="image-preview"
                          src={`data:image/png;base64, ${user.image}`}
                        />
                      ) : (
                        <span>Preview Image</span>
                      )}
                    </div>
                  </div>
                </form>
              </Tab>

              <Tab eventKey="profile" title="Password">
                <div>
                  <div className="row" id="form">
                    <div className="col-md-6">
                      <label>Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Username"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleChangePassword()}
                  >
                    Save
                  </button>
                </div>
              </Tab>
              <Tab eventKey="contact" title="History">
                ok
              </Tab>
            </Tabs>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ProfileUser;
