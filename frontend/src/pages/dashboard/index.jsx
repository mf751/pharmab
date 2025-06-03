import "./styles.css";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { FiBox } from "react-icons/fi";

export default function Dashboard() {
  const dummyData = [
    {
      producId: 551,
      customerName: "Kasey james",
      date: "21Feb 2025",
      amount: 14.0,
      user: "Fred",
    },
    {
      producId: 309,
      customerName: "David williams",
      date: "21Feb 2025",
      amount: 21.5,
      user: "Fred",
    },
    {
      producId: 471,
      customerName: "Robert Howel",
      date: "21Feb 2025",
      amount: 33.2,
      user: "Fred",
    },
    {
      producId: 813,
      customerName: "Amy williams",
      date: "21Feb 2025",
      amount: 4.0,
      user: "Fred",
    },
    {
      producId: 912,
      customerName: "Sarah Morian",
      date: "21Feb 2025",
      amount: 42.4,
      user: "Fred",
    },
    {
      producId: 54,
      customerName: "Keith Alan",
      date: "21Feb 2025",
      amount: 28.8,
      user: "Fred",
    },
    {
      producId: 499,
      customerName: "Morgan Jordy",
      date: "21Feb 2025",
      amount: 15.3,
      user: "Fred",
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
      <div className="head-history">
        {dummyData.map((item) => (
          <div className="item"></div>
        ))}
      </div>
    </div>
  );
}
