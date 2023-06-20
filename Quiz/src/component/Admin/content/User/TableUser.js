import React from "react"
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';





const TableUser = (props) => {
    var { listUsers, onClickShowUpdate, onClickViewUser, onClickDeleteUser, totalPage, onClickSetPageNumber, onClickSetLimitPerPage, currentPage } = props
    const [limitPerPage, setLimitPerPage] = useState("")

    const handleClickShowUpdate = (user) => {
        onClickShowUpdate(user)
    }
    const handleClickViewUser = (user) => {
        onClickViewUser(user)
    }
    const handleClickDeleteUser = (user) => {
        onClickDeleteUser(user)
    }

    const handleSetLimitPerPage = () => {
        if (limitPerPage > 0) {
            onClickSetLimitPerPage(limitPerPage)
            setLimitPerPage("")
        } else {
            toast.error("Please enter a number greater than 0")
        }
    }

    const handlePageClick = (event) => {
        onClickSetPageNumber(event.selected + 1)
    };

    useEffect(() => {

    }, [totalPage]);


    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table - user - ${item.id}`}>
                                    <th >{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info mx-1" onClick={() => handleClickViewUser(item)} >View</button>
                                        <button className="btn btn-warning mx-1" onClick={() => handleClickShowUpdate(item)}>Edit</button>
                                        <button className="btn btn-danger mx-1" onClick={() => handleClickDeleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={4}>Note found data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="form-group col-md-2">
                <input
                    className="form-control"
                    id="inputPassword2"
                    placeholder="Limit of page"
                    type="number"
                    width="50px"
                    value={limitPerPage}
                    onChange={e => setLimitPerPage(e.target.value)}
                />
                <button type="submit" className="btn btn-success mb-2"
                    onClick={handleSetLimitPerPage}
                >Enter</button>
            </div>


            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< Prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}

export default TableUser