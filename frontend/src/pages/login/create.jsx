import { useState } from "react";
import "./styles.css";
import { HiUser } from "react-icons/hi2";
import { CreateUser, Login } from "/wailsjs/go/backend/App";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Create() {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState("Create");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    let r = CreateUser(name, email, password, inputs.isAdmin);
    r.then((res) => {
      if (res) setResult("Created!");
    });
  }

  return (
    <div className="login bxs">
      <div className="back-container" onClick={() => navigate("/manageusers")}>
        <IoMdArrowRoundBack className="back" />
      </div>
      <div className="icon">
        <HiUser className="icon-in" />
      </div>
      <div className="welcome-msg">
        <h1>Add User</h1>
        <p>Insert all the user information</p>
      </div>
      <form onSubmit={submit}>
        <div className="inputs">
          <input
            type="text"
            required
            placeholder="Name"
            autoFocus
            name="name"
            value={inputs.name}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="text"
            required
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <div
            onClick={() =>
              setInputs((prev) => ({ ...prev, isAdmin: !prev.isAdmin }))
            }
            className="isAdmin"
          >
            <span>Is Admin</span>
            <span
              style={{
                backgroundColor: inputs.isAdmin
                  ? "var(--main-green)"
                  : "var(--main-red)",
              }}
            >
              {inputs.isAdmin ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <button
          // disabled={result !== "Create"}
          style={{
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "18px",
            backgroundColor:
              result === "Create" ? "var(--main-blue)" : "var(--main-green)",
          }}
        >
          {result}
        </button>
      </form>
    </div>
  );
}
