import React from "react";
import "./CourseCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const CourseCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["courseUser", item.userId], // Include user ID as part of the query key
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/course/${item._id}`} className="link">
      <div className="courseCard">
        <img src={item.coverImage} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p className="two-line-description">{item.title}</p>
          <div className="star">
            {!isNaN(item.totalStars / item.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(item.totalStars / item.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span className="">
                          {Math.round(item.totalStars / item.starNumber)}
                        </span>
                        
                      </div>
                      
                    )}
                    
          </div>
          
        </div>
       
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
