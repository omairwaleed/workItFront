import { useState } from "react";
import styles from "./detailsStyle.module.css";
import pin from "../../assets/pin.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import ErrorImageHandler from "../../components/ErrorImageHandler";

const DetailsScreenScholar = () => {
  const [modal, setModal] = useState({ show: false });
  const [isDisabled, setisDisabled] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => {
    setModal({ show: false });
    navigate(`/${isDisabled ? "profile" : "myapps"}`);
  };

  const { state } = useLocation();
  if (!state) return <Navigate to={"/preview"} />;

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(state);

  const handleApply = async () => {
    if (!user?.user?.cv) {
      setisDisabled(true);
      return setModal({
        show: true,
        title: "Error",
        body: "Please upload your CV first! You have to complete your profile.",
      });
    }

    // fundingpercentage, scholarshiptitle, universityname, country, city
    const { userid } = user?.user;
    const { scholarshipid, universityname } = state;

    try {
      const res = await fetch("/api/scholarship/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid,
          scholarshipid,
          universityname,
        }),
      });

      const json = await res.json();

      setModal({
        show: true,
        title: "Success",
        body: json.msg,
      });
    } catch (error) {
      setModal({
        show: true,
        title: "Failure",
        body: error.message.includes("duplicate")
          ? "Can't Apply for the same scholarship twice!"
          : "Something went wrong.",
      });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.intro}>
        <div className={styles.img}>
          <ErrorImageHandler
            src={state.logo}
            classN={styles.sora}
            width={200}
            height={200}
          />
        </div>
        <div className={styles.portfolio}>
          <h1>{state.scholarshiptitle}</h1>
          {state.description}
        </div>
      </div>
      <div className={styles.Line}>
        <hr width="70%" size="2" />
      </div>
      <div className={styles.mobileview}>
        <section className={styles.carousel} aria-label="Gallery">
          <ol className={styles.carousel__viewport}>
            <li
              id="carousel__slide1"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide4" className={styles.carousel__prev}>
                  Go to last slide
                </a>
                <a href="#carousel__slide2" className={styles.carousel__next}>
                  Go to next slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>Country :</h2>
                <br />
                {state.city}, {state.country}
              </div>
            </li>
            <li
              id="carousel__slide2"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide1" className={styles.carousel__prev}>
                  Go to previous slide
                </a>
                <a href="#carousel__slide3" className={styles.carousel__next}>
                  Go to next slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>Univeristy Name:</h2>
                <br />
                {state.universityname}
              </div>
            </li>
            <li
              id="carousel__slide3"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide2" className={styles.carousel__prev}>
                  Go to previous slide
                </a>
                <a href="#carousel__slide4" className={styles.carousel__next}>
                  Go to next slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>Contact Email:</h2>
                <br />
                {state.contactemail}
              </div>
            </li>
            <li
              id="carousel__slide4"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide3" className={styles.carousel__prev}>
                  Go to previous slide
                </a>
                <a href="#carousel__slide5" className={styles.carousel__next}>
                  Go to first slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>Funding percentage:</h2>
                <br />
                {state.fundingpercentage}
              </div>
            </li>
            {/* <li
              id="carousel__slide5"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide4" className={styles.carousel__prev}>
                  Go to previous slide
                </a>
                <a href="#carousel__slide1" className={styles.carousel__next}>
                  Go to first slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>salary</h2>
                <br />
                {state.salary}
              </div>
            </li> */}
            {/* <li
              id="carousel__slide5"
              tabIndex="0"
              className={styles.carousel__slide}
            >
              <div className={styles.carousel__snapper}>
                <a href="#carousel__slide4" className={styles.carousel__prev}>
                  Go to previous slide
                </a>
                <a href="#carousel__slide1" className={styles.carousel__next}>
                  Go to first slide
                </a>
              </div>
              <div className={styles.content}>
                <h2>Required skills</h2>
                <br />
                {state.requiredskills}
              </div>
            </li> */}
          </ol>
        </section>
        <button
          disabled={isDisabled}
          className={styles.applybtn}
          onClick={handleApply}
        >
          Apply!
        </button>
      </div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.place}>
            <img src={pin} alt="" />
            {state.city}, {state.country}
          </div>
          {/* <div className={styles.place}>
            <img src={clock} alt="" />
            Posted # days ago
          </div> */}
          {/* <div className={styles.place}>
            <img src={bag} alt="" />
            {state.requiredskills}
          </div> */}

          <button
            disabled={isDisabled}
            className={styles.applybtn}
            onClick={handleApply}
          >
            Apply!
          </button>
        </div>
        <div className={styles.right}>
          <strong>University Name:</strong>
          <br />
          &#x2022; {state.universityname}
          <br />
          <strong> Contact Email:</strong>
          <br />
          &#x2022; {state.contactemail}
          <br />
          <strong>Funding percentage:</strong>
          <br />
          &#x2022; {state.fundingpercentage}
          <br />
          {/* <strong>salary:</strong>
          <br />
          &#x2022; {state.salary}
          <br />
          <strong>Required Skills :</strong>
          <br />
          &#x2022; {state.requiredskills} */}
          {/* <strong>Join Us!:</strong>
          <br />
          eing part of our team, you will join: - one of the largest global
          innovative companies, with more than 20,000 engineers working in
          Research & Development - a multi-cultural environment that values
          diversity and international collaboration - more than 100,000
          colleagues in 31 countries... which make a lot of opportunity for
          career growth. */}
        </div>
      </div>

      {modal?.show && (
        <Modal
          show={modal?.show}
          title={modal?.title}
          body={modal?.body}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default DetailsScreenScholar;
