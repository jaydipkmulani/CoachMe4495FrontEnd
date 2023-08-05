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
  const handleCategoryClick = (category) => {
    setSelected(category);
  
    // Handle navigation programmatically
    switch (category) {
      case "Development":
        navigate("/courses?courseCategory=Development");
        break;
      case "Accounting":
        navigate("/courses?courseCategory=Accounting");
        break;
      case "ComputerScience":
        navigate("/courses?courseCategory=ComputerScience");
        break;
      case "AIServices":
        navigate("/courses?courseCategory=AIServices");
        break;
      case "Marketing":
        navigate("/courses?courseCategory=Marketing");
        break;
      case "Music":
        navigate("/courses?courseCategory=Music");
        break;
      case "ITAndSoftware":
        navigate("/courses?courseCategory=ITAndSoftware");
        break;
      case "Business":
        navigate("/courses?courseCategory=Business");
        break;
      case "Lifestyle":
        navigate("/courses?courseCategory=Lifestyle");
        break;
      default:
        break;
    }
  
    // Perform a full page refresh after navigation
    window.location.reload();
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
         
        <div
        className="link menuLink"
        
        onClick={() => handleCategoryClick("Development")}
      >
        Development
      </div>
        <div
        className="link menuLink"
       
        onClick={() => handleCategoryClick("Accounting")}
      >
        Accounting & Finance
      </div>
      <div
        className="link menuLink"
        
        onClick={() => handleCategoryClick("ComputerScience")}
      >
        Computer Science
      </div>
      <div
        className="link menuLink"
       
        onClick={() => handleCategoryClick("AIServices")}
      >
        AI Services
      </div>
      <div
        className="link menuLink"
        
        onClick={() => handleCategoryClick("Marketing")}
      >
        Marketing
      </div>
      <div
        className="link menuLink"
       
        onClick={() => handleCategoryClick("Music")}
      >
        Music
      </div>
      <div
        className="link menuLink"
        
        onClick={() => handleCategoryClick("ITAndSoftware")}
      >
        IT & Software
      </div>
      <div
        className="link menuLink"
       
        onClick={() => handleCategoryClick("Business")}
      >
        Business
      </div>
      <div
        className="link menuLink"
       
        onClick={() => handleCategoryClick("Lifestyle")}
      >
        Lifestyle
      </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
