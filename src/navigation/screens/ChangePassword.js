import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./profile.module.css";
import Loader from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
const ChangePassword = () => {
  let { oldPassword: passwordInDatabase, type } = useLocation().state;
  console.log(type, passwordInDatabase);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target));
    const localStrData = JSON.parse(localStorage.getItem("user"));
    console.log(localStrData);
    try {
      const response = await fetch(
        // "https://work-it-back.vercel.app/api/user/editProfile",
        `http://localhost:5002/api/${type}/editPassword`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: "token: " + localStrData.token,
            type: "user",
          },
          body: JSON.stringify({
            userData: {
              ...formData,
              userID:
                type === "user"
                  ? localStrData.user.userid
                  : type === "company"
                  ? localStrData.user.companyid
                  : localStrData.user.universityid,
              passwordInDatabase,
            },
          }),
        }
      );
      const json = await response.json();
      if (json.message === "wrong password") alert("wrong password");
      else if (json.message === "validation error") alert(json.error);
      else if (response.ok) return navigate("/preview");
    } catch (error) {
      alert("error while editing password");
    }
    setLoading(false);
  };
  return (
    <div>
      <Navbar />
      <h2 className={styles.text} style={{ textAlign: "center" }}>
        EDIT YOUR PROFILE
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handelSubmit} className={styles.main}>
          <div className={styles.name}>
            <div className={styles.first_name}>
              <span className={styles.text}>Old Password</span>
              <input
                type="password"
                required
                placeholder={"Enter old password"}
                value={oldPassword}
                name="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.email}>
            <span className={styles.text}>New Password</span>
            <input
              type="password"
              required
              placeholder={"Enter new password"}
              value={newPassword}
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={styles.save} style={{ marginBottom: 30 }}>
            <button>Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
