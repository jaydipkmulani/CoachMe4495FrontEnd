import React, { useEffect, useRef, useState } from "react";
import "./Courses.scss";
import CourseCard from "../../components/courseCard/CourseCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Courses() {
  // State to manage sorting and filtering
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  // Get the search query parameters from the URL using react-router-dom
  const { search } = useLocation();

  // Use react-query to fetch course data from the server
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      newRequest
        .get(
          `/courses${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          // Process the response data and return it
          return res.data;
        }),  
  });

  // Function to change the sort type and close the dropdown menu
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Effect to refetch course data whenever the sorting changes
  useEffect(() => {
    refetch();
  }, [sort]);

  // Function to apply the filter and refetch course data
  const apply = () => {
    refetch();
  };

  return (
    <div className="courses">
      <div className="container">
      <h1>Courses</h1>

        {/* Filter and sort menu */}
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        {/* Course cards */}
        <div className="cards">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            data.map((course) => (
              <CourseCard key={course._id} item={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
