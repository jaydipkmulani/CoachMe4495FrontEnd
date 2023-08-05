import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://coachme1.onrender.com",
  withCredentials: true,
});

export default newRequest;
