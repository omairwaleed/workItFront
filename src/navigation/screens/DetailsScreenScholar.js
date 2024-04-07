import React from "react";
import styles from "./detailsStyle.module.css";
import scarab from "../../assets/scarab.png";
import pin from "../../assets/pin.png";
import { useLocation } from "react-router-dom";
const DetailsScreenScholar = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className={styles.body}>
      <div className={styles.intro}>
        <div className={styles.img}>
          <img
            className={styles.sora}
            src={state.logo ?? scarab}
            width={200}
            height={200}
            alt=""
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
                {state.country}
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
            {state.country}
          </div>
          {/* <div className={styles.place}>
            <img src={clock} alt="" />
            Posted # days ago
          </div> */}
          {/* <div className={styles.place}>
            <img src={bag} alt="" />
            {state.requiredskills}
          </div> */}

          <div className={styles.applybtn}>
            <a href="url" className={styles.applyy}>
              Apply!
            </a>
          </div>
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
    </div>
  );
};

export default DetailsScreenScholar;
