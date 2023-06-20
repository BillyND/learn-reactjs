import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../services/apiService";

function ModalDeleteQuiz(props) {
  const { show, onClickClose, inforDeleteQuiz, fetchAllQuiz } = props;

  const handleClose = () => {
    onClickClose();
  };

  const handleConfirmDelete = async () => {
    let idDelete = inforDeleteQuiz.id;
    let resDeleteQuiz = await deleteQuiz(idDelete);
    if (resDeleteQuiz && resDeleteQuiz.EC == 0) {
      toast.success(resDeleteQuiz.EM);
      fetchAllQuiz();
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this quiz. Id = <b>{inforDeleteQuiz.id}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;
