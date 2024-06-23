import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [alertt, setAlert] = useState(false);
  const handelSubmit = async (e) => {
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      const response = await fetch(
        // `https://work-it-back.vercel.app/api/user/forgotPassword`,
        `https://work-it-back.vercel.app/api/user/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        alert(json.message ? json.message : "Error while reseting password");
      } else {
        // alert("Please check Your email to reset password");
        setAlert(true);
      }
    } catch (error) {
      alert("error while reseting password");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2
        className={styles.text}
        style={{ textAlign: "center", marginTop: 80, marginBottom: 50 }}
      >
        Reset Your Password
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handelSubmit} className={styles.main}>
          <div className={styles.name}>
            <div className={styles.first_name}>
              <span className={styles.text}>Email</span>
              <input
                type="email"
                required
                placeholder={"Enter your Registered email"}
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.save} style={{ marginBottom: 30 }}>
            <button>Send</button>
          </div>
        </form>
      )}
      <Modal
        show={alertt}
        handleClose={() => setAlert(false)}
        body={alertt}
        title={"Please check Your email to reset password"}
      />
    </div>
  );
};

export default ForgetPassword;
