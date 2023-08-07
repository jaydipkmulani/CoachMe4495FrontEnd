import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://coachmebackend.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
