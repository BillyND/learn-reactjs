import ModalCreateuser from "./ModalCreateuser"
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react"
import { paginationUser } from "../../../services/apiService"
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";


const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [totalPages, setTotalPages] = useState(null)
    const [inforUserUpdate, setInforUserUpdate] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [limitPerPage, setLimitPerPage] = useState(4)
    const handleShow = () => {
        setShowModal(true)
    }
    const handleShowUpdate = (user) => {
        setShowModalUpdate(true)
        setInforUserUpdate(user)
    }
    const handleViewUser = (user) => {
        setShowModalViewUser(true)
        setInforUserUpdate(user)
    }
    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true)
        setInforUserUpdate(user)
    }

    const resetDataUpdate = () => {
        setInforUserUpdate({})
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const handleCloseUpdate = () => {
        setShowModalUpdate(false)
    }
    const handleCloseViewUser = () => {
        setShowModalViewUser(false)
    }
    const handleCloseDeleteUser = () => {
        setShowModalDeleteUser(false)
    }
    const handleSetPageNumber = (event) => {
        setPageNumber(event)
    }
    const handleSetLimitPerPage = (event) => {
        setPageNumber(1)
        setLimitPerPage(event)
    }


    //componentDidmount
    useEffect(() => {
        fetchListUsers()
    }, [limitPerPage, pageNumber])


    const fetchListUsers = async () => {
        let dataGetUser = await paginationUser(pageNumber, limitPerPage)

        setTotalPages(dataGetUser.DT.totalPages)
        if (dataGetUser.EC == 0) {
            setListUsers(dataGetUser.DT.users)
        }
    }

    const handleBackToPageOne = () => {
        setPageNumber(1)
    }



    return (
        <div className="managerPage user">
            <h3 className="title-manager-user">Manage User</h3>
            <Button variant="primary" onClick={handleShow} className="btn-adduser">
                Add new user
            </Button>
            <ModalCreateuser
                show={showModal}
                onClickClose={handleClose}
                fetchListUsers={fetchListUsers}
                backToPage1={handleBackToPageOne}
            />
            <ModalUpdateUser
                show={showModalUpdate}
                onClickClose={handleCloseUpdate}
                inforUserUpdate={inforUserUpdate}
                fetchListUsers={fetchListUsers}
                resetDataUpdate={resetDataUpdate}
                backToPage1={handleBackToPageOne}
            />
            <ModalViewUser
                show={showModalViewUser}
                onClickClose={handleCloseViewUser}
                inforUserUpdate={inforUserUpdate}
                fetchListUsers={fetchListUsers}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                onClickClose={handleCloseDeleteUser}
                inforUserUpdate={inforUserUpdate}
                fetchListUsers={fetchListUsers}
                resetDataUpdate={resetDataUpdate}
                backToPage1={handleBackToPageOne}
            />
            <div>
                <TableUser
                    listUsers={listUsers}
                    onClickShowUpdate={handleShowUpdate}
                    onClickViewUser={handleViewUser}
                    onClickDeleteUser={handleDeleteUser}
                    totalPage={totalPages}
                    onClickSetPageNumber={handleSetPageNumber}
                    onClickSetLimitPerPage={handleSetLimitPerPage}
                    currentPage={pageNumber}
                />
            </div>
        </div>
    )
}

export default ManageUser