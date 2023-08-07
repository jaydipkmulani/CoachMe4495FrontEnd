import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import Course from "./pages/course/Course";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyCourses from "./pages/myCourses/MyCourses";
import Call from "./components/vidocall/call"
import Appointment from "./pages/appointment/cretae/createAppointment";
import ShowAppoint from "./components/appointCard/BookAppointment";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/myCourses",
          element: <MyCourses />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/course/:id",
          element: <Course />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/call/:roomID",
          element: <Call />,
        },
        {
          path: "/appoint/:id",
          element: <ShowAppoint />,
        },
        {
          path: "appointment",
          element: <Appointment />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
