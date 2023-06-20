import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../Content.css"
import _ from "lodash"
import { deleteUser } from '../../../services/apiService';


function ModalDeleteUser(props) {
    const { show, onClickClose, fetchListUsers, inforUserUpdate, resetDataUpdate, backToPage1 } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')


    //clode modal
    const handleClose = () => {
        onClickClose();
        setEmail("");
        setPassword("");
        setUsername("");
        setRole('USER');
        setPreviewImage('')
        setImage('')
        resetDataUpdate()
    }

    const handleDeleteUser = async () => {
        var dataDeleteUser = await deleteUser(inforUserUpdate.id)
        console.log(">>>Check data delete:", inforUserUpdate.id)
        if (dataDeleteUser && dataDeleteUser.EC == 1) {
            toast.error(dataDeleteUser.EM)
        } else if (dataDeleteUser && dataDeleteUser.EC == 0) {
            toast.success(dataDeleteUser.EM)
            handleClose();
            fetchListUsers();
            backToPage1()
        } else {
            toast.error(dataDeleteUser.EM)
        }
        // var dataDeleteUser = await deleteUser(inforUserUpdate.id)
        // console.log(">>>Check data delete:", inforUserUpdate.id)
        // toast.success("Delete success")
        // handleClose();
        // fetchListUsers();
        // backToPage1()

    }

    useEffect(() => {
        if (!_.isEmpty(inforUserUpdate)) {
            setEmail(inforUserUpdate.email);
            setPassword(inforUserUpdate.password);
            setUsername(inforUserUpdate.username);
            setRole(inforUserUpdate.role)
            setPreviewImage(`data:image/png;base64, ${inforUserUpdate.image}`)
        }
    }, [inforUserUpdate])


    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user. email = <b>{inforUserUpdate.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser




