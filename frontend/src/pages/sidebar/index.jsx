import "./styles.css";
import { VscDashboard } from "react-icons/vsc";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { GoPackage } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/user";

export default function SideBar() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  let list = [
    { name: "Dashboard", icon: <VscDashboard className="icon" /> },
    { name: "Purchase", icon: <HiOutlineShoppingCart className="icon" /> },
    { name: "Products", icon: <GoPackage className="icon" /> },
    { name: "Orders", icon: <LuClipboardList className="icon" /> },
    { name: "Expiries", icon: <GiSandsOfTime className="icon" /> },
    { name: "History", icon: <FaHistory className="icon" /> },
    { name: "My Statistics", icon: <ImStatsBars className="icon" /> },
  ];

  if (user.is_admin) {
    list = list.concat([
      { name: "Manage Users", icon: <FaUsersCog /> },
      { name: "All Statistics", icon: <TfiStatsUp /> },
    ]);
  }

  return (
    <nav className="bxs">
      <div className="header">
        <div className="icon">
          <HiUser className="icon-in" />
        </div>
        <span>{user.name}</span>
        {user.is_admin && (
          <MdAdminPanelSettings
            style={{
              color: "var(--main-green)",
              width: "20px",
              height: "20px",
            }}
          />
        )}
      </div>
      {list.map((item) => {
        const path = `/${item.name.replace(" ", "").toLowerCase()}`;
        return (
          <Link
            to={path}
            className={`item ${location.pathname === path ? "active" : ""}`}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
      <Link className="logout" to={"/"} onClick={() => dispatch(setUser({}))}>
        <IoMdArrowRoundBack className="icon" />
      </Link>
    </nav>
  );
}
