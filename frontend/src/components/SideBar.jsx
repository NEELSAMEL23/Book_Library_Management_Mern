import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FilePlus, BarChart2, LogOut } from "lucide-react";

export default function SideBar({ isOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const avatarSrc = user?.avatar || "/default-avatar.png";

  // ✅ Handle logout properly
  const handleLogout = async () => {
    await logout();
    navigate("/auth/login"); // navigate after logout
  };

  return (
    <aside
      className={`bg-gray-800 text-white fixed top-[3.1rem] left-0 
        h-[calc(100vh-3.1rem)] z-40
        transition-all duration-300 ease-in-out transform
        ${isOpen ? "w-64" : "w-16"} animate-fadeIn`}
    >
      {/* User Info */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        {isOpen && (
          <div className="text-sm">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-300">{user?.email}</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="p-4 space-y-4 text-sm">
        <SidebarItem to="/books" icon={<BarChart2 />} label="All books" isOpen={isOpen} />
        <SidebarItem to="/books-list" icon={<FilePlus />} label="Books List" isOpen={isOpen} />

        {/* Logout as a button */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-2 rounded-md w-full text-left hover:text-blue-300 transition"
          >
            <span className="text-lg"><LogOut /></span>
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}

function SidebarItem({ to, icon, label, isOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-2 py-2 rounded-md transition 
           ${isActive ? "bg-blue-600 text-white" : "hover:text-blue-300"}`
        }
      >
        <span className="text-lg">{icon}</span>
        {isOpen && <span>{label}</span>}
      </NavLink>
    </li>
  );
}
