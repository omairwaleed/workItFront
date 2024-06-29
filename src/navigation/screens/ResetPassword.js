import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log(params);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      const response = await fetch(
        // `https://work-it-back.vercel.app/api/user/forgotPassword`,
        `https://work-it-back.vercel.app/api/user/resetPassword/${params.token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.password,
            type: params.type,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        alert(json.message ? json.message : "Error while reseting password");
      } else {
        // alert("Please check Your email to reset password");
        console.log("aa");
        navigate("/login");
        console.log("bb");
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
              <span className={styles.text}>Password</span>
              <input
                type="password"
                required
                placeholder={"Enter your New password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.save} style={{ marginBottom: 30 }}>
            <button>Send</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
