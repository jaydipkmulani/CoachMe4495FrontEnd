import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
// import { Button } from "bootstrap";

const Orders = () => {
 // State to store user data
 const [usersData, setUsersData] = useState({});
  // Get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isTutor = currentUser.isTutor;
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();
  // Use query to fetch the orders from the server
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    const fetchUsersData = async () => {
      for (const c of data) {
        const isCurrentUserTutor = currentUser.isTutor;
        const otherUserId = isCurrentUserTutor ? c.studentId : c.tutorId;
        try {
          const response = await newRequest.get(`/users/${otherUserId}`);
          setUsersData((prevData) => ({
            ...prevData,
            [otherUserId]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUsersData();
  }, [data, currentUser.isTutor]);
  // Handler to handle contacting the tutor or student associated with an order
  const handleContact = async (order) => {
    const tutorId = order.tutorId;
    const studentId = order.studentId;
    const id = tutorId + studentId;

    try {
      // Check if a conversation already exists between tutor and student
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        // If no conversation exists, create a new conversation
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isTutor ? studentId : tutorId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
 
  const handleCompleteOrder = async (id) => {
    try {
      // Make an API request to update the order status to completed
      const response = newRequest.put(`/orders/${id}`);

      // Assuming the backend responds with updated order data
      const updatedOrder = response.data;

      // You can update the frontend state or do further actions with the updatedOrder data if needed
      // For example, if you have a list of orders, you can update the list with the updatedOrder

      console.log("Order marked as completed:", updatedOrder);
    } catch (error) {
      console.log("Error completing order:", error);
    }
  };
  const getUserFullName = (userId) => {
    const userData = usersData[userId];
    return userData ? (currentUser.isTutor ? userData.username : userData.username) : "User Not Found";
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "No order available"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>{currentUser.isTutor ? "Student Name" : "Tutor Name"}</th>
              <th>Price</th>
              <th>Contact</th>
              {/* Conditionally render the "Status" column */}
            {/* Conditionally render the "Book appointment" column */}
            {isTutor ? null : <th>Book appointment</th>}
              <th>Status</th>
             

            </tr>
            {data.map((order) => {
              const isCurrentUserTutor = currentUser.isTutor;
              const otherUserId = isCurrentUserTutor ? order.studentId : order.tutorId;
             
 return(
              <tr key={order._id}>
                <td>
                  <Link to={`/course/${order.courseId}`}><img className="image" src={order.img} alt="" /></Link>
                </td>
                <td>{order.title}</td>
                <td>{getUserFullName(otherUserId)}</td>
                <td>{order.price}</td>



                <td>
                  {order.isFinished ? (
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  )}
                </td>


                {/* ... Other table cells */}
                {isTutor && (
                  <td>
                    {order.isFinished ? (
                      <button className="completed-button"  disabled >Completed</button>
                    ) : (
                      <button onClick={() => handleCompleteOrder(order._id)}>Mark as Complete</button>
                    )}
                  </td>
                )}
                <td>
                  {order.isFinished ? (
                    <td>{!isTutor && (
                      <td>
                        
                        <p>Finished</p>
                       
                      </td>
                    )}</td>
                  ) : (
                    <td>{!isTutor && (
                      <td>
                        
                        <Link to={`/appoint/${order.tutorId}?order=${JSON.stringify(order)}`}>
  <button>Book Now</button>
</Link>
                       
                      </td>
                    )}</td>
                  )}
                </td>
                 
             
                {!isTutor && (
                  <td>
                    {order.isFinished ? (
                      <p >Completed</p>
                    ) : (
                      <p >in progress</p>
                    )}
                  </td>
                )}
              </tr>
 )}
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
