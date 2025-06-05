import "./styles.css";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { FiBox } from "react-icons/fi";

export default function Dashboard() {
  const dummyData = [
    {
      transactionID: "7BA6C",
      producId: 551,
      customerName: "Kasey james",
      date: "21Feb 2025",
      amount: "$14.0",
      user: "Fred",
    },
    {
      transactionID: "5M97E",
      producId: 309,
      customerName: "David williams",
      date: "21Feb 2025",
      amount: "$21.5",
      user: "Fred",
    },
    {
      transactionID: "85GN3",
      producId: 471,
      customerName: "Robert Howel",
      date: "21Feb 2025",
      amount: "$33.2",
      user: "Fred",
    },
    {
      transactionID: "K829N",
      producId: 813,
      customerName: "Amy williams",
      date: "21Feb 2025",
      amount: "$4.0",
      user: "Fred",
    },
    {
      transactionID: "LZ9RQ",
      producId: 912,
      customerName: "Sarah Morian",
      date: "21Feb 2025",
      amount: "$42.4",
      user: "Fred",
    },
    {
      transactionID: "VB8B9",
      producId: 54,
      customerName: "Keith Alan",
      date: "21Feb 2025",
      amount: "$28.8",
      user: "Fred",
    },
    {
      transactionID: "91VAC",
      producId: 499,
      customerName: "Morgan Jordy",
      date: "21Feb 2025",
      amount: "$15.3",
      user: "Fred",
    },
  ];
  const dummyData2 = [
    {
      id: 1012,
      name: "Paracetamol",
      manufacture: "GSK",
      price: "2.50",
      sales: 220,
    },
    {
      id: 8493,
      name: "Amoxicillin",
      manufacture: "Pfizer",
      price: "5.00",
      sales: 104,
    },
    {
      id: 6542,
      name: "Cetirizine",
      manufacture: "Sun Pharma",
      price: "1.80",
      sales: 93,
    },
    {
      id: 7820,
      name: "Ibuprofen",
      manufacture: "Bayer",
      price: "3.25",
      sales: 86,
    },
    {
      id: 2156,
      name: "Dextromethorphan",
      manufacture: "Novartis",
      price: "4.10",
      sales: 68,
    },
    {
      id: 1093,
      name: "Eye Lubricant",
      manufacture: "Refresh",
      price: "7.00",
      sales: 52,
    },
  ];

  return (
    <div className="dashboard">
      <div className="head-stats">
        <div className="child bxs customers">
          <div className="content">
            <div className="logo">
              <HiMiniUserGroup className="icon" />
            </div>
            <div className="text">
              <div className="head">Todays Customers</div>
              <div className="number">41</div>
            </div>
          </div>
          <div className="details">Show Details</div>
        </div>
        <div className="child bxs sales">
          <div className="content">
            <div className="logo">
              <RiShoppingCartFill className="icon" />
            </div>
            <div className="text">
              <div className="head">Total Sales</div>
              <div className="number">74</div>
            </div>
          </div>
          <div className="details">Show Details</div>
        </div>
        <div className="child bxs profit">
          <div className="content">
            <div className="logo">
              <IoWallet className="icon" />
            </div>
            <div className="text">
              <div className="head">Total Profit</div>
              <div className="number">$388</div>
            </div>
          </div>
          <div className="details">Show Details</div>
        </div>
        <div className="child bxs orders">
          <div className="content">
            <div className="logo">
              <FiBox className="icon" />
            </div>
            <div className="text">
              <div className="head">Todays Orders</div>
              <div className="number">5</div>
            </div>
          </div>
          <div className="details">Show Details</div>
        </div>
      </div>
      <div className="head-history bxs">
        <table>
          <thead>
            <th>Transaction ID</th>
            <th>Product ID</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Sold by</th>
          </thead>
          {dummyData.map((item) => (
            <tbody>
              <td>{item.transactionID}</td>
              <td>{item.producId}</td>
              <td>{item.customerName}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.user}</td>
            </tbody>
          ))}
        </table>
      </div>
      <div className="bottom-row">
        <div className="monthly-progress bxs">
          <h2>Monthly Progress</h2>
          <div className="chart">
            <div className="scale">
              <div className="unit">120</div>
              <div className="unit">90</div>
              <div className="unit">60</div>
              <div className="unit">30</div>
              <div className="unit">0</div>
            </div>
            <div className="values">
              <div className="month">
                <span className="value" style={{ "--progress": "80%" }}></span>
                <span className="name">Jan</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "55%" }}></span>
                <span className="name" data-progress="62%">
                  Feb
                </span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "44%" }}></span>
                <span className="name">Mar</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "65%" }}></span>
                <span className="name">Apr</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "73%" }}></span>
                <span className="name">May</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "75%" }}></span>
                <span className="name">Jun</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "53%" }}></span>
                <span className="name">Jul</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "63%" }}></span>
                <span className="name">Aug</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "45%" }}></span>
                <span className="name">Sep</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "69%" }}></span>
                <span className="name">Oct</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "78%" }}></span>
                <span className="name">Nov</span>
              </div>
              <div className="month">
                <span className="value" style={{ "--progress": "82%" }}></span>
                <span className="name">Dec</span>
              </div>
            </div>
          </div>
        </div>
        <div className="orders bxs">
          <h2>Most Sold</h2>
          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Manufacture</th>
              <th>Sales</th>
              <th>Price</th>
            </thead>
            {dummyData2.map((item) => (
              <tbody>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.manufacture}</td>
                <td>{item.sales}</td>
                <td>${item.price}</td>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
