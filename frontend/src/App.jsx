import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
