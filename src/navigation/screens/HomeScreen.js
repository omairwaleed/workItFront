// import Rectangle from "../../assets/Rectangle.png";
import landingImage from "../../assets/landingImage.png";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const HomeScreen = () => {
  const user = JSON.parse(localStorage?.getItem("user"))?.userType;

  if (user === "company" || user === "university")
    return <Navigate to="/preview" />;

  return (
    <>
      <Navbar />
      <div className="body_omar">
        <div className="image-container">
          <img
            className="silhouette-people-working-offi-icon"
            src={landingImage}
            alt="home hero image"
          />
          <div className="overlay" />

          {/* </div> */}
          <div className="text-overlay">
            GRAB
            <br />
            YOUR CHANCE
            <br />
            PAVE YOUR SUCCESS ROAD
          </div>
        </div>
        <div className="welcome">
          Welcome To , <br />
          WORK-IT!
        </div>
        <div className="intro">
          Work-IT ! is your one-stop hub for unlocking a world of possibilities
          in your career and education. Whether you're on the hunt for that
          perfect job, seeking a scholarship to fuel your academic dreams, or
          eager to kickstart your professional journey with an internship,
          Work-IT ! is here to guide you towards success.
        </div>
        <div className="grandparent">
          <span className="parent_omar">
            <div className="son">JOBS</div>
            <div className="son2">
              Explore a vast array of job listings from top companies across
              various industries. Our user-friendly interface allows you to
              customize your search based on your skills, experience, and career
              preferences. Say goodbye to job-hunting stress and hello to your
              next exciting career move.
              {JSON.parse(localStorage.getItem("user"))?.userType !==
                "university" && (
                <Link to={"/preview?type=jobs"} className="see_more">
                  See More...
                </Link>
              )}
            </div>
          </span>

          <span className="parent_omar">
            <div className="son">INTERNSHIPS</div>
            <div className="son2">
              Kickstart your career with valuable hands-on experience through
              our extensive internship listings. WORK-iIT ! collaborates with
              leading companies to provide you with diverse internship
              opportunities, allowing you to build a foundation for success in
              your chosen field.
              {JSON.parse(localStorage.getItem("user"))?.userType !==
              "university" ? (
                <Link to={"/preview?type=interns"} className="see_more">
                  See More...
                </Link>
              ) : null}
            </div>
          </span>

          <span className="parent_omar">
            <div className="son">SCHOLARSHIPS</div>
            <div className="son2">
              Unleash your academic potential by accessing a curated list of
              scholarships tailored to your field of study. WORK-IT !
              understands the importance of education, and we're here to help
              you achieve your academic goals without the financial burden.
              {JSON.parse(localStorage.getItem("user"))?.userType !==
                "company" && (
                <Link to={"/preview?type=scholarships"} className="see_more">
                  See More...
                </Link>
              )}
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
