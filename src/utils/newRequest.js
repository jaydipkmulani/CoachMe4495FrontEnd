import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://coachme1.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
