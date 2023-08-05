import React, { useState } from "react";
import "./Featured.scss";
import { Link,useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/courses?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>Tutor</span>  for your learning.
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <Link className="link " to="/courses?courseCategory=ComputerScience"><button>Computer Science</button></Link>
            <Link className="link " to="/courses?courseCategory=SupplyChainManagement"><button>Supply Chain Management</button></Link>
            <Link className="link " to="/courses?courseCategory=Crafting"><button>Crafting</button></Link>
            <Link className="link " to="/courses?courseCategory=Business"><button>Business</button></Link>
          </div>
        </div>
        <div className="right">
          <img src="./img/mman.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
