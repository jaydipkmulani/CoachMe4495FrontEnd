import React from "react";
import { Link } from "react-router-dom";
import "./MyCourses.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyCourses() {
  // Get the current user using the getCurrentUser utility function
  const currentUser = getCurrentUser();
// Initialize the query client to manage cache and data
  const queryClient = useQueryClient();
  // Use query to fetch the user's courses from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["myCourses"],
    queryFn: () =>
      newRequest.get(`/courses?userId=${currentUser._id}`).then((res) => {
        
        return res.data;
        
      }),
  });
// Use mutation to handle the deletion of a course
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCourses"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myCourses">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Courses</h1>
            {currentUser.isTutor && (
              <Link to="/add">
                <button>Add New Course</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((course) => (
              <tr key={course._id}>
                <td>
                 <Link to={`/course/${course._id}`}><img className="image" src={course.coverImage} alt="no image available "  /></Link> 
                </td>
                <td>{course.title}</td>
                <td>{course.price}</td>
                <td>{course.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(course._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
