import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate,useHistory  } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const { pathname } = useLocation();
  const history = useHistory();

  function handleClick() {
    history.push("/path", { data: "some data" });
  }
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
            <Link className="link menuLink" to="/courses?courseCategory=Development" onClick={handleClick}>
              Development
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=Accounting" onClick={handleClick}>
              Accounting & Finance
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=ComputerScience" onClick={handleClick}>
              Computer Science
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=AIServices" onClick={handleClick}>
              AI Services
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=Marketing" onClick={handleClick}>
              Marketing
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=Music" onClick={handleClick}>
              Music
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=ITAndSoftware" onClick={handleClick}>
              IT & Software
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=Business" onClick={handleClick}>
              Business
            </Link>
            <Link className="link menuLink" to="/courses?courseCategory=Lifestyle" onClick={handleClick}>
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
