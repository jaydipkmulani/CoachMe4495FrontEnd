import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import "./BookAppointment.scss";
import { useQuery,useMutation,useQueryClient  } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

// import { Button } from "bootstrap";

const createAppointment = () => {
    const { id } = useParams(); 
    
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [usersData, setUsersData] = useState({});
    // Get the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isTutor = currentUser.isTutor;
    const currentUserId = currentUser._id;
    const currentUserName = currentUser.username;
   
    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();


   

     // Use query to fetch the orders from the server
const { isLoading, error, data } = useQuery({
    queryKey: ["appointments", id],
    queryFn: () =>
        newRequest.get(`/appointments/user/${id}`).then((res) => {
            // Parse dates with server's timezone
            const appointmentsWithServerTimezone = res.data.map((appointment) => ({
                ...appointment,
                date: moment.tz(appointment.date, "Central Daylight Time"),
            }));
            return appointmentsWithServerTimezone;
        }),
});


// Inside your component
const queryClient = useQueryClient();

// Use the useMutation hook to handle the appointment booking mutation
const bookAppointmentMutation = useMutation(
  (appointmentId) => {
    return newRequest.put(`/appointments/${appointmentId}`, {
      studentId: currentUserId,
      bookedBy: currentUserName,
      isBooked: true,
    });
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments", id]);
    },
  }
);
    // Add a conditional check for isLoading
    if (isLoading) {
        return "Loading...";
    };

   
    // Handle the error case
    if (error) {
        return (<p>Opps no appointments available</p>
        );
    };
   
   

  // Event handler for booking an appointment
const handleBookAppointment = (appointmentId) => {
    bookAppointmentMutation.mutate(appointmentId);
  };
   // Filter future appointments
   const futureAppointments = data.filter(
    (appointment) =>  moment(appointment.date).isSameOrAfter(moment().subtract(1, 'day').startOf('day')) && !appointment.isBooked
  );

 
// Sort appointments by date in ascending order
const sortedAppointments = futureAppointments.sort((a, b) => {
    return moment(a.date).toDate() - moment(b.date).toDate();
});

  
    const hasFutureAppointments = futureAppointments.length > 0;
 


    
    


   
    return (
        <div className="orders">

            {isLoading ? (
                "loading"
            ) : error ? (
                "No appointments Available "
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Book Appointments</h1>
                    </div>
                    {hasFutureAppointments ? (
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Book Appointment</th>
                            
                            {/* Conditionally render the "Status" column */}
                           
                        </tr>
                        {sortedAppointments.map((appointment) => {

                            const isCurrentUserTutor = currentUser.isTutor;
                            const otherUserId = isCurrentUserTutor ? appointment.studentId : appointment.tutorId;

                            return (
                                <tr key={appointment._id}>
                                    <td>{moment(appointment.date).format("YYYY-MM-DD")}</td>
                                    <td>{appointment.time}</td>
                                    <button className="button" onClick={() => handleBookAppointment(appointment._id)}>
                          Book Now
                        </button>
                                    
                                </tr>
                            )
                        })}

                    </table>
                     ) : (
                        <p>No appointments available</p>
                      )}
                   
                </div>

            )}



        </div>

    );
};

export default createAppointment;
