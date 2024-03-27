import React from "react";
import styles from "./detailsStyle.module.css";
import scarab from "../../assets/scarab.png";
import clock from "../../assets/clock.png";
import pin from "../../assets/pin.png";
import bag from "../../assets/bag.png";
import { useLocation } from "react-router-dom";
const DetailsScreen = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className={styles.body}>
      <div className={styles.intro}>
        <div className={styles.img}>
          <img className={styles.sora} src={scarab} alt="" />
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
        <div className={styles.applybtn}>
          <a href="url" className={styles.applyy}>
            Apply!
          </a>
        </div>
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

          <div className={styles.applybtn}>
            <a href="url" className={styles.applyy}>
              Apply!
            </a>
          </div>
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
    </div>
  );
};

export default DetailsScreen;
