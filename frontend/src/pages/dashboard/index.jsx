import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  return <h1>{user.name}</h1>;
}
