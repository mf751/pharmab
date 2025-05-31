import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/index";
import Create from "./pages/login/create";
import Dashboard from "./pages/dashboard";
import SideBar from "./pages/sidebar";
import Purchase from "./pages/purchase";
import Products from "./pages/products";
import Orders from "./pages/orders";
import Expiries from "./pages/expiries";
import History from "./pages/history";
import MyStats from "./pages/mystats";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/create" element={<Create />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SideBar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/purchase"
          element={
            <>
              <SideBar />
              <Purchase />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <SideBar />
              <Products />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <SideBar />
              <Orders />
            </>
          }
        />
        <Route
          path="/expiries"
          element={
            <>
              <SideBar />
              <Expiries />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <SideBar />
              <History />
            </>
          }
        />
        <Route
          path="/mystatistics"
          element={
            <>
              <SideBar />
              <MyStats />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
