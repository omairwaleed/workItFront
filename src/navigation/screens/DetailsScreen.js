import { useState } from "react";
import styles from "./detailsStyle.module.css";
import pin from "../../assets/pin.png";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Modal from "../../components/Modal";
import ErrorImageHandler from "../../components/ErrorImageHandler";
import { fetchUser } from "../../actions";

export const loader = async ({ request, params }) => {
  const userData = await fetchUser();

  return userData;
};

const DetailsScreen = () => {
  const userData = useLoaderData();
  const [modal, setModal] = useState({ show: false });
  const [isDisabled, setisDisabled] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();
  if (!state) return <Navigate to={"/preview"} />;

  console.log(userData);
  console.log(state);
  console.log(userData[0]?.cv);

  const handleClose = () => {
    setModal({ show: false });
    navigate(`/${isDisabled ? "profile" : "myapps"}`);
  };

  const handleApply = async () => {
    if (!userData[0]?.cv) {
      setisDisabled(true);
      return setModal({
        show: true,
        title: "Error",
        body: "Please upload your CV first! You have to complete your profile.",
      });
    }

    // requiredskills , jobid , userid, date
    //   jobtitle, companyname, country, city
    const { userid } = userData[0];
    const { requiredskills, jobid, jobtitle, companyname, country, city } =
      state;

    try {
      const res = await fetch("/api/job/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid,
          jobid,
          requiredskills,
          jobtitle,
          companyname,
          country,
          city,
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
          ? "Can't Apply for the same job twice!"
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
          <h1>{state?.jobtitle}</h1>
          {state?.jobdescription}
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
                <h2>Job Location :</h2>
                <br />
                {state?.country}
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
                <h2>Company Name:</h2>
                <br />
                {state?.companyname}
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
                <h2>company location:</h2>
                <br />
                {state?.companycountry}
                {` , `}
                {state?.companycity}
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
                <h2>Number of employees:</h2>
                <br />
                {state?.company_size}
              </div>
            </li>
            <li
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
                {state?.salary}
              </div>
            </li>
            <li
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
                {state?.requiredskills}
              </div>
            </li>
          </ol>
        </section>
        <button
          disabled={userData?.error ? true : isDisabled}
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
            {state?.country}
          </div>
          {/* <div className={styles.place}>
            <img src={clock} alt="" />
            Posted # days ago
          </div> */}
          {/* <div className={styles.place}>
            <img src={bag} alt="" />
            {state?.'}
          </div> */}

          <button
            disabled={userData?.error ? true : isDisabled}
            className={styles.applybtn}
            onClick={handleApply}
          >
            Apply!
          </button>
        </div>
        <div className={styles.right}>
          <strong>Company Name:</strong>
          <br />
          &#x2022; {state?.companyname}
          <br />
          <strong> Company Location:</strong>
          <br />
          &#x2022; {state?.companycountry}
          {` , `}
          {state?.companycity}
          <br />
          <strong>Number of employees:</strong>
          <br />
          &#x2022; {state?.company_size}
          <br />
          <strong>salary:</strong>
          <br />
          &#x2022; {state?.salary}
          <br />
          <strong>Required Skills :</strong>
          <br />
          &#x2022; {state?.requiredskills}
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

export default DetailsScreen;
