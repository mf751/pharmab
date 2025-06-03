import { Link } from "react-router-dom";
import "./styles.css";
import { CgAddR } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { GetUsers, UpdateUser } from "/wailsjs/go/backend/App";
import { IoClose } from "react-icons/io5";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [upInputs, setUpInputs] = useState({});
  const [edit, setEdit] = useState({});
  const editBtnRef = useRef(null);
  const isEdit = Object.values(edit).length > 0;

  useEffect(() => {
    GetUsers().then((res) => {
      if (res.error === "") {
        setUsers(res.users);
      }
    });
  }, []);

  function update(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const phoneNumber = data.get("phone_number");
    if (
      !(
        email !== edit.email ||
        password !== "" ||
        name !== edit.name ||
        phoneNumber !== edit.phoneNumber ||
        upInputs.admin !== edit.is_admin
      )
    )
      return;

    UpdateUser(
      edit.id,
      name,
      email,
      password,
      phoneNumber,
      upInputs.admin,
    ).then((res) => {
      if (res) {
        GetUsers().then((res) => {
          if (res.error === "") {
            setUsers(res.users);
          }
        });
        editBtnRef.current.textContent = "Edited Successfully!";
        editBtnRef.current.style.backgroundColor = "var(--main-green)";
        editBtnRef.current.disabled = true;
      }
    });
  }

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
            <form onSubmit={update} className="update">
              <div className="child">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={upInputs.name}
                  onChange={(e) =>
                    setUpInputs((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="child">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={upInputs.email}
                  name="email"
                  onChange={(e) =>
                    setUpInputs((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="child">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  id="phoneNumber"
                  value={upInputs.phoneNumber}
                  onChange={(e) =>
                    setUpInputs((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="child">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={upInputs.password}
                  onChange={(e) =>
                    setUpInputs((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="child">
                <label htmlFor="password">Admin</label>
                <div
                  className="admin"
                  onClick={() =>
                    setUpInputs((prev) => ({ ...prev, admin: !prev.admin }))
                  }
                >
                  <div className="in">{upInputs.admin ? "Yes" : "No"}</div>
                </div>
              </div>
              <button ref={editBtnRef}>Update</button>
            </form>
          </div>
        )}
        <div
          className="edit-overlay"
          style={{ zIndex: isEdit ? 5 : -1, opacity: isEdit ? "0.4" : "0" }}
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
                <span className="admin">{user.is_admin ? "Yes" : "No"}</span>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button
                  onClick={() => {
                    setEdit(user);
                    setUpInputs({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      phoneNumber: user.phone_number,
                      admin: user.is_admin,
                    });
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
