import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import getCurrentUser from "../../utils/getCurrentUser";

const Reviews = ({ courseId }) => {
  const currentUser = getCurrentUser();
  const isTutor=currentUser.isTutor;
  const [err, setErr] = useState(null);
  const [desc, setDesc] = useState(""); 
  const [star, setStar] = useState(1);
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${courseId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
    
    },
    onError: (error) => {
      // Handle the error here
      console.error("An error occurred during mutation:", error.response.data);
      setErr(error.response.data)
      
   
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      courseId,
      desc, 
      star, 
    };
    mutation.mutate({ courseId, desc, star });
    setDesc("");
    setStar(1);
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
          ? "Something went wrong!"
          : data.map((review) => <Review key={review._id} review={review} />)}
       <div>
      {/* Other content... */}
      {!isTutor && ( // If the user is NOT a tutor, show the "Add a review" section
        <div className="add">
          <h3>Add a review</h3>
          <form action="" className="addForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="write your opinion"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <select name="" id="" value={star} onChange={(e) => setStar(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
          <div className="err">{err && err}</div>
        </div>
      )}
    </div>
        
      
    </div>
  ); 
};

export default Reviews;
