import { Link } from "react-router-dom";
import "./styles.css";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { GetUsers } from "/wailsjs/go/backend/App";
import { IoClose } from "react-icons/io5";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [upInputs, setUpInputs] = useState({});
  const [edit, setEdit] = useState({});
  const isEdit = Object.values(edit).length > 0;

  useEffect(() => {
    GetUsers().then((res) => {
      if (res.error === "") {
        setUsers(res.users);
      }
    });
  }, []);

  function update(e) {}

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <Link to={"/users/create"} className="add-user bxs">
        <span>Add New User</span>
        <CgAddR className="icon" />
      </Link>
      <table className="users bxs">
        {isEdit && (
          <div className="edit bxs">
            <IoClose className="close-icon" onClick={() => setEdit({})} />
            <form onSubmit={update} className="update"></form>
          </div>
        )}
        <div
          className="edit-overlay"
          style={{ zIndex: isEdit ? 5 : -1, opacity: isEdit ? "0.3" : "0" }}
        ></div>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Admin</th>
            <th>Created</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <span
                  style={{
                    backgroundColor: user.is_admin
                      ? "var(--main-green)"
                      : "var(--main-red)",
                  }}
                  className="admin"
                >
                  {user.is_admin ? "Yes" : "No"}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button onClick={() => setEdit(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
