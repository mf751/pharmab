import { useState } from "react";
import "./styles.css";
import { HiUser } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";
import { Login } from "/wailsjs/go/backend/App";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/user";

export default function LoginPage() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    Login(email, password).then((res) => {
      if (res.error !== "") setError(res.error);
      else {
        dispatch(setUser(res.user));
        navigate("/dashboard");
      }
    });
  }

  return (
    <div className="login bxs">
      <div className="icon">
        <HiUser className="icon-in" />
      </div>
      <div className="welcome-msg">
        <h1>Welcome Back</h1>
        <p>Please enter your email and password to log in.</p>
      </div>
      <form onSubmit={submit}>
        <div className="inputs">
          <input
            type="email"
            required
            placeholder="Email"
            autoFocus
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
        </div>
        <div className="error">{error}</div>
        <button>
          Continue{" "}
          <div className="arrow-icon">
            <GoArrowRight className="arrow-icon-in" />
          </div>
        </button>
      </form>
    </div>
  );
}
