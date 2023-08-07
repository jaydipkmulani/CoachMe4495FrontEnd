import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const handleLinkClick = async (category) => {
    try {
      // Construct the URL with the query parameter
      const url = `/courses?courseCategory=${category}`;
      
      // Navigate to the desired route
      navigate(url);
      window.location.reload();
      
    } catch (error) {
      console.error(error);
    }
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">CoachMe</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>English</span>
          {!currentUser?.isTutor && <span>Become a Tutor</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isTutor && (
                    <>
                      <Link className="link" to="/mycourses">
                        My Courses
                      </Link>
                      <Link className="link" to="/add">
                        Add New Course
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/appointment">
                    Appointment
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
         <div className="menu">
         <Link className="link menuLink" onClick={() => handleLinkClick("Development")}>
              Development
            </Link>
            <Link className="link menuLink" onClick={() => handleLinkClick("Accounting")}>
              Accounting & Finance
            </Link>
           
            <Link className="link menuLink" onClick={() => handleLinkClick("ComputerScience")}>
              Computer Science
            </Link>
         
            <Link className="link menuLink" onClick={() => handleLinkClick("AIServices")}>
              AI Services
            </Link>
            <Link className="link menuLink" onClick={() => handleLinkClick("Marketing")}>
              Marketing
            </Link>
            <Link className="link menuLink" onClick={() => handleLinkClick("Music")}>
              Music
            </Link>
             <Link className="link menuLink" onClick={() => handleLinkClick("ITAndSoftware")}>
              IT & Software
            </Link>
            <Link className="link menuLink" onClick={() => handleLinkClick("Business")}>
              Business
            </Link>
            <Link className="link menuLink" onClick={() => handleLinkClick("Lifestyle")}>
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
