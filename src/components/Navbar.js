import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const type = user?.userType;
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("");

  const handleNavigation = async (selectedPage) => {
    switch (selectedPage) {
      case "profile":
        navigate("/profile");
        break;
      case "applications":
        navigate("/test");
        break;
      case "settings":
        navigate("/test");
        break;
      case "home":
        navigate("/test");
        break;
      case "logout":
        localStorage.removeItem("user");
        navigate("/");
        break;
      default:
        // Handle other cases if needed
        break;
    }

    // console.log("check point up")
  };

  return (
    <header className={styles.header}>
      <Link
        to={"/"}
        style={{ textDecoration: "none" }}
        className={styles.header_left}
      >
        <div className={styles.text}>WORK-IT!</div>
      </Link>
      {!user && (
        <div className={styles.button_container}>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
          <Link to={"/signup"}>
            <button>Join Now</button>
          </Link>
        </div>
      )}
      {user && (
        <div style={{ display: "flex", width: "fit-content", gap: "1rem" }}>
          <div
            style={{
              flex: 1,
              marginLeft: "auto",
              paddingTop: "10px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <p>
              Hello,{" "}
              {type == "user"
                ? user.user.name
                : type == "company"
                ? user.user?.companyname
                : user.user.universityname}
            </p>
          </div>

          <div className={styles.button_container}>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                size="lg"
                value={selectedPage}
                onChange={(e) => handleNavigation(e.target.value)}
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    const path =
                      type == "user"
                        ? "/profile"
                        : type == "company"
                        ? "/companyProfile"
                        : "/universityProfile";

                    navigate(path);
                  }}
                >
                  profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    const path =
                      type === "user"
                        ? "/myapps"
                        : type === "company"
                        ? "/companyview"
                        : "/collegeview";

                    navigate(path);
                  }}
                >
                  applications
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
