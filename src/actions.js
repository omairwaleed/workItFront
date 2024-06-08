import defaultPP from "./assets/defaultPP.jpeg";

export const fetchUser = async () => {
  try {
    const localStrData = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      "https://work-it-back.vercel.app/api/user/userDetails",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStrData.token,
          type: localStrData.userType,
        },
      }
    );

    if (!response.ok) return { error: "Network response was not ok" };

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { error: "Error fetching user data:" };
  }
};
export const fetchImage = async () => {
  const localStrData = JSON.parse(localStorage.getItem("user"));
  const type = localStrData.userType;
  try {
    const response = await fetch(
      "https://work-it-back.vercel.app/api/user/gallery",
      {
        headers: {
          authorization: "token: " + localStrData.token,
          type: type,
        },
      }
    );
    const data = await response.json();

    if (data.success) {
      if (data.images[0].photo) return data.images[0];
      // setProfilePhoto(data.images[0]);
      else return { photo: defaultPP };
      // setProfilePhoto({ photo: defaultPP });
    } else return { error: "Failed to fetch images" };
  } catch (error) {
    return error;
  }
};
