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

            <div className="link menuLink">
              <Link to="/courses?courseCategory=Development">Development</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=Accounting">Accounting & Finance</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=ComputerScience">Computer Science</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=AIServices">AI Services</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=Marketing">Marketing</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=Music">Music</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=ITAndSoftware">IT & Software</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=Business">Business</Link>
            </div>
            <div className="link menuLink">
              <Link to="/courses?courseCategory=Lifestyle">Lifestyle</Link>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
