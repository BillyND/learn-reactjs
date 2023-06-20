import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../Content.css"
import _ from "lodash"

function ModalViewUser(props) {
    const { show, onClickClose, inforUserUpdate, resetDataUpdate } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState('')
    const [previewImage, setPreviewImage] = useState('')



    //clode modal
    const handleClose = () => {
        onClickClose();
        setEmail("");
        setPassword("");
        setUsername("");
        setRole('USER');
        setPreviewImage('')
        resetDataUpdate()
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
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Info User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-6">
                                <label >Email</label>
                                <input type="email" className="form-control" placeholder="Email"
                                    value={email}
                                    disabled={true}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label >Password</label>
                                <input type="password" className="form-control" placeholder="Password"
                                    value={password}
                                    disabled={true}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Username</label>
                                <input type="text" className="form-control" placeholder="Username"
                                    value={username}
                                    disabled={true}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Role</label>
                                <select className="form-control"
                                    value={role}
                                    disabled={true}
                                    onChange={event => setRole(event.target.value)}
                                >
                                    <option >USER</option>
                                    <option>ADMIN</option>
                                </select>
                            </div>
                            <div className="form-group col-md-12">
                                <label >Image</label>
                            </div>
                            <div className='preview-image'>
                                {previewImage ?
                                    < img className='image-preview' src={previewImage} />
                                    :
                                    <span >Preview Image</span>
                                }


                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser




