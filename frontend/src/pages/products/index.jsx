import "./styles.css";
import dummyData from "./data.js";
import { FaDivide, FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function Products() {
  return (
    <div className="products">
      <h1>Porducts</h1>
      <div className="bar">
        <form action={(e) => e.preventDefault()}>
          <div className="child">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Amoxicillin"
            />
          </div>
          <div className="child">
            <label htmlFor="id">Product ID</label>
            <input type="text" name="id" id="id" placeholder="8204" />
          </div>
          <div className="child">
            <label htmlFor="data">Expiry Date</label>
            <input type="date" name="date" id="date" />
          </div>
          <div className="child">
            <label htmlFor="type">Type</label>
            <input type="text" name="type" id="type" placeholder="pill" />
          </div>
          <button>
            <FaSearch className="icon" />
          </button>
        </form>
        <span className="add">
          <IoMdAdd className="icon" />
          Add Product
        </span>
      </div>
      <div className="data bxs">
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Manufacture</th>
            <th>Expiry</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </thead>
          {dummyData.map((item) => (
            <tbody>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.manufacture}</td>
              <td>{item.expiry}</td>
              <td>${item.price}</td>
              <td>{item.amount}</td>
              <td>
                {item.active ? (
                  <div
                    className="active"
                    style={{ backgroundColor: "var(--main-green)" }}
                  >
                    Active
                  </div>
                ) : (
                  <div
                    className="expired"
                    style={{ backgroundColor: "var(--main-red)" }}
                  >
                    Expired
                  </div>
                )}
              </td>
              <td>{item.type}</td>
              <td>
                <button>edit</button>
              </td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
