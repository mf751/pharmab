import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/index";
import Create from "./pages/login/create";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/create" element={<Create />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
