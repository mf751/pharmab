import { Link } from "react-router-dom";
import "./styles.css";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import { GetUsers } from "/wailsjs/go/backend/App";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    GetUsers().then((res) => {
      if (res.error === "") {
        setUsers(res.users);
      }
    });
  }, []);

  return (
    <div className="manage-users ">
      <h1>Manage Users</h1>
      <Link to={"/users/create"} className="add-user bxs">
        <span>Add New User</span>
        <CgAddR className="icon" />
      </Link>
      <table className="users bxs">
        {users.map((user) => (
          <>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
            <div key={user.id}>{user.name} </div>
          </>
        ))}
      </table>
    </div>
  );
}
