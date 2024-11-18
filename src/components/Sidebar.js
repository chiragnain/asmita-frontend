import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import logo from '../assets/logo.png'
import userlogo from '../assets/userLogo.png'
import logoutIcon from '../assets/logoutIcon.png'
import loginLogo from '../assets/loginLogo.png' 
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const {user,logout}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleLoginClick=()=>{
    navigate('/login');
  }
  const handleLogout=()=>{
    logout();
    navigate('/');
  }
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center  border-red-500">
          <div className="flex items-center libre-baskerville-bold text-xl">
            <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-10" : "w-0"}`} alt="Logo" />
            <p className={`overflow-hidden transition-all ${expanded ? "pl-4" : "w-0"}`}> ASMITA </p>
          </div>
          

          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600">
            {expanded ? <FontAwesomeIcon icon={faCircleLeft} className="w-6" /> : <FontAwesomeIcon icon={faCircleRight} className="w-6" />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
          
        <div className="border-t flex p-3">
          {user && <img
            src={userlogo}
            alt=""
            className="w-10 h-9 rounded-md"
          />
          }
          
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <div className="font-semibold">{user?user.name:
                  <button className="justify-center w-52 bg-blue-500 hover:bg-blue-600" onClick={handleLoginClick}>Login/Register</button>}
              </div>
              <span className="text-xs text-gray-600">{user?user.email:""}</span>
            </div>
            { user?
              <button className="p-0 bg-white text-gray-500 hover:bg-gray-100 " onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  alt=""
                  className="w-8"
                />
            </button>:""}
          </div>
          {!user && <img
            src={loginLogo}
            alt=""
            className="w-10 h-10 rounded-md cursor-pointer "
            onClick={handleLoginClick}
          />}
        </div>
      </nav>
    </aside>
  )
}

// sidebarItem

export function SidebarItem({ to, icon, text, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="relative">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            isActive
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
              : "hover:bg-blue-50 text-gray-600"
          }`
        }
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className="absolute right-2 w-2 h-2 rounded bg-blue-400"
          />
        )}
      </NavLink>
    </li>
  );
}
