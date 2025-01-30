import React from 'react';
import { NavbarLinks } from "../../data/navbar-links";
import "../../styles/components/navbar.css";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token)
  // console.log("tokn",token)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // logout Handler
  const logoutHandler =() => {
    dispatch(logout(navigate));
  }
  return (
    <div className='navbar-container'>
      <nav className="">
        <ul className="navbar-list">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="navbar-item">
              <Link to={link?.path}>
                <p className={`${matchRoute(link?.path) ? "navbar-link-active" : "navbar-link"}`}>
                  {link.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Signup And logim button with cart  */}
      <div className='auth'>
        {
          token===null && 
          (
              <Link to="/login">
                  <button className='navbar-link'>
                      Log In
                  </button>                        
              </Link>
          ) 
        }
        {
           token===null &&
           (
             <Link to="/signup">
                 <button >
                     Sign Up
                 </button>
             </Link>
         )
        }
        {
           token &&
           (
             <Link to="/dashboard">
                 <button >
                     Dashboard
                 </button>
             </Link>
         )
        }
        {
          token &&
          (
            <button 
              onClick={logoutHandler}
            >
                Logout
            </button>
        )
        }
      </div>
    </div>
  );
};

export default Navbar;
