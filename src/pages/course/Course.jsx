import React from "react";
import "./Course.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";

function Course() {
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const isTutor = currentUser.isTutor;
  const { isLoading, error, data } = useQuery({
    queryKey: ["course"],
    queryFn: () =>
      newRequest.get(`/courses/single/${id}`).then((res) => {
        console.log(res.data)
        return res.data;
      }),
  });

  const userId = data?.userId;


  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId], // Include userId in the query key
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        throw error; // Rethrow the error to be handled by React Query
      }
    },
    enabled: !!userId,
  });
  return (
    <div className="course">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              CoachMe {">"} {data.courseCategory}{">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    {/* <span>{Math.round(data.totalStars / data.starNumber)}</span> */}
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.length > 0 ? (
                data.images.map((img) => <img key={img} src={img} alt="" />)
              ) : (
                <p>No images available</p>
              )}
            </Slider>
            <h2>About This Course</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="tutor">
                <h2>About The Tutor</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        {/* <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span> */}
                      </div>
                    )}
                    <Link to={`/courses?userId=${data.userId}`}><button>See My other Course </button></Link>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">{new Date (data.createdAt).getFullYear()}</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>

                    <div className="item">
                      <span className="title">Language</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews courseId={data.courseId} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortDesc}</h3>
              <h2> ${data.price}</h2>
            </div>

            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.duration} Days </span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.numberOfClass}  Meeting</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {!isTutor && ( // If the user is NOT a tutor, show the button
              <Link to={`/pay/${id}`}>
                <button>Continue</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>

  );
}

export default Course;
