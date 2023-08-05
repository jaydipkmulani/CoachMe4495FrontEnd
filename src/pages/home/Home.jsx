import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      {/* Featured Section */}
      <Featured />

      {/* TrustedBy Section */}
      <TrustedBy />

      {/* Slide Section for Categories */}
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Personalized Tutoring Tailored for You</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Unlock the Power of Personalized Tutoring, Tailored Just for You
            </div>
            <p>
              Experience the transformative benefits of one-to-one tutoring, designed specifically to meet your unique learning needs.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Flexible Scheduling for Convenient and Personalized Learning
            </div>
            <p>
              Enjoy the freedom to schedule tutoring sessions at your convenience, ensuring a personalized learning experience that fits your busy life.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Expert Tutors, Devoted to Your Success, Every Step of the Way
            </div>
            <p>
              Benefit from dedicated and experienced tutors who are committed to guiding you towards academic excellence through one-on-one personalized attention
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Maximize Your Learning Potential with Individualized Attention
            </div>
            <p>
              Discover the remarkable progress you can achieve with personalized tutoring that focuses solely on your academic goals, strengths, and areas for improvement.

            </p>
          </div>
          <div className="item">
            {/* <video src="./img/video.mp4" controls /> */}
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Discover an Extensive Marketplace for Your Learning Journey</h1>
          <div className="items">
            <div className="item">
            <Link to="/courses?courseCategory=Accounting"> <img
                src="./img/accounting.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Accounting & Finance</span>
            </div>
            <div className="item">
             <Link to="/courses?courseCategory=AIServices"> <img
                src="./img/ai.png"
                alt=""
              /></Link>
              <div className="line"></div>

              <span>AI Services</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=Business">  <img
                src="./img/handshake.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=ComputerScience">  <img
                src="/img/computerScience.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Computer Science</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=Development">  <img
                src="/img/devlopment.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Development</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=Design">   <img
                src="/img/design.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Design</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=ITAndSoftware">  <img
                src="/img/IT.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>IT & Software</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=Marketing">  <img
                src="/img/marketing.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Marketing</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=Music">  <img
                src="/img/music.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Music</span>
            </div>
            <div className="item">
            <Link to="/courses?courseCategory=LifeStyle">  <img
                src="/img/lifestyle.png"
                alt=""
              /></Link>
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>

          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              CoachMe <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>tutors</i>
            </h1>
            <p>
              Connect with Experienced Tutors specialized in business tutoring
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect with Experienced Tutors specialized in business tutoring
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              src="./img/luffy.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Slide Section for Projects */}
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
