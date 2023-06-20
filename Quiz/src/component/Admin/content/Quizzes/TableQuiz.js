import { useState } from "react";

const TableQuiz = (props) => {
  const { listQuiz, onClickDeleteQuiz, onClickUpdateQuiz } = props;
  const [showDeleteQuiz, setShowDeleteQUiz] = useState(false);

  const handleClickDeleteQuiz = (quiz) => {
    onClickDeleteQuiz(quiz);
  };
  const handleClickUpdateQuiz = (quiz) => {
    onClickUpdateQuiz(quiz);
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table - user - ${item.id}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-1"
                      onClick={() => handleClickUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleClickDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan={4}>Note found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
