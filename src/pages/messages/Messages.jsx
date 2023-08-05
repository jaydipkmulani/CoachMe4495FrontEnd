import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  // Get the current user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  // Initialize the queryClient to manage query states
  const queryClient = useQueryClient();

  // Use query to fetch conversations data
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {

        return res.data;
      }),
  });

  // Use mutation to mark a conversation as read when the button is clicked
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      // Invalidate the conversations query cache after a successful mutation
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Handle the "Mark as Read" button click event
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  // State to store user data
  const [usersData, setUsersData] = useState({});

  // Fetch user data and store it in the state
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

  // Function to get the full name of the user based on their ID
  const getUserFullName = (userId) => {
    const userData = usersData[userId];
    return userData ? (currentUser.isTutor ? userData.username : userData.username) : "User Not Found";
  };
  // Render the Messages component
  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isTutor ? "Student" : "Tutor"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => {
              const isCurrentUserTutor = currentUser.isTutor;
              const otherUserId = isCurrentUserTutor ? c.studentId : c.tutorId;


              return (
                <tr
                  className={
                    ((isCurrentUserTutor && !c.readByTutor) ||
                      (!isCurrentUserTutor && !c.readByStudent)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{getUserFullName(otherUserId)}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((isCurrentUserTutor && !c.readByTutor) ||
                      (!isCurrentUserTutor && !c.readByStudent)) && (
                        <button onClick={() => handleRead(c.id)}>Mark as Read</button>
                      )}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;