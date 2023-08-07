import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createAppointment.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import moment from "moment";
import 'moment-timezone';

// import { Button } from "bootstrap";

const createAppointment = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [usersData, setUsersData] = useState({});
    // Get the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isTutor = currentUser.isTutor;
    const currentUserId = currentUser._id;

    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(time);
        console.log(date);
        // Convert the time to 24-hour format before sending to the server
        const formattedTime = moment(time, "HH:mm").format("hh:mm A");
        console.log(formattedTime);
        // Prepare the data to send to the backend
        const appointmentData = {
            currentUserId,
            date,
            time: formattedTime,
        };

        try {
            // Make the API call to create the appointment
            const response = await newRequest.post("/appointments", appointmentData);
            const createdAppointment = response.data;
            console.log("Appointment created:", createdAppointment);

            // Clear the form fields after successful submission
            setDate("");
            setTime("");
        } catch (error) {
            console.error("Failed to create appointment:", error);
        }
        window.location.reload()
    };
 //if user is tutor it will show this page 
 const renderAddAppointmentForm = () => {
    if (isTutor) {
        return (
            <div className="appointment-form-container">
                <div className="appointment-content">
                    <h2>Add Appointment</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
    return null;
};

  // Use query to fetch the orders from the server
const { isLoading, error, data } = useQuery({
    queryKey: ["appointments", currentUserId],
    queryFn: () =>
        newRequest.get(`/appointments/user/${currentUserId}`).then((res) => {
            // Parse dates with server's timezone
            const appointmentsWithServerTimezone = res.data.map((appointment) => ({
                ...appointment,
                date: moment.tz(appointment.date, "Central Daylight Time"),
            }));
            return appointmentsWithServerTimezone;
        }),
});

    // Add a conditional check for isLoading
    if (isLoading) {
        return "Loading...";
    };

   
    // Handle the error case
    if (error) {
        return (
            <div>
              <p>No appointment available. Please add an appointment.</p>
              {renderAddAppointmentForm()}
            </div>
          );
    };
   

   // Filter future appointments
   const futureAppointments = data.filter(
    (appointment) => moment(appointment.date).isSameOrAfter(moment().subtract(1, 'day').startOf('day'))
  );

// Sort appointments by date in ascending order
const sortedAppointments = futureAppointments.sort((a, b) => {
    return moment(a.date).toDate() - moment(b.date).toDate();
});
    const hasFutureAppointments = futureAppointments.length > 0;
 


    

    // Function to check if the time is within 1 hour from now
    const isTimeWithin1Hour = (time) => {
        const appointmentTime = moment(time, "hh:mm A");
        const currentTime = moment();

        // Check if the appointment is within the next hour
        if (
            appointmentTime.diff(currentTime, "hours") === 0 && // Same hour
            appointmentTime.format("A") === currentTime.format("A") && // Same AM/PM
            appointmentTime.diff(currentTime, "minutes") <= 60 // Within 60 minutes
        ) {
            return true;
        }

        return false;
    };


   
    return (
        <div className="orders">

            {isLoading ? (
                "loading"
            ) : error ? (
                "No appointments Available "
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Appointments</h1>
                    </div>
                    {hasFutureAppointments ? (
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>BookedBy</th>
                            {/* Conditionally render the "Status" column */}
                            <th>Video Meeting</th>
                        </tr>
                        {sortedAppointments.map((appointment) => {

                            const isCurrentUserTutor = currentUser.isTutor;
                            const otherUserId = isCurrentUserTutor ? appointment.studentId : appointment.tutorId;

                            return (
                                <tr key={appointment._id}>
                                    <td>{moment(appointment.date).tz("Central Daylight Time").format("YYYY-MM-DD")}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.bookedBy}</td>
                                    <td>
                                        {isTimeWithin1Hour(appointment.time) ? (
                                            <Link to={`/call/${appointment._id}`}><button >
                                                Join
                                            </button></Link>
                                        ) : (
                                            "Link will be available here"
                                        )}
                                    </td>
                                </tr>
                            )
                        })}

                    </table>
                     ) : (
                        <p>No appointments available</p>
                      )}
                    {renderAddAppointmentForm()}
                </div>

            )}



        </div>

    );
};

export default createAppointment;
