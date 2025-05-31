import { useNavigate } from "react-router-dom";

export default function MyStats() {
  const navigate = useNavigate();
  return <h1 onClick={() => navigate("/user/create")}>Hi</h1>;
}
