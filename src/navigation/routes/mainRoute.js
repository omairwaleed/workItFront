// import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import TestPage from "../screens/TestPage";
import PreviewScreen from "../screens/PreviewScreen";
import Profile from "../screens/Profile";
import DetailsScreen from "../screens/DetailsScreen";
import ImageUpload from "../screens/ImageUpload";
import ImageGallery from "../screens/ImageDownload";
import Myapps from "../screens/Myapps";
import DetailsScreenIntern from "../screens/DetailsScreenIntern";
import DetailsScreenScholar from "../screens/DetailsScreenScholar";
import CompanyProfile from "../screens/CompanyProfile";
import UniversityProfile from "../screens/UniversityProfile";
import Collegeview from "../screens/Collegeview";

const MainRoute = () => {
  const routes = createHashRouter([
    {
      path: "/",
      element: <HomeScreen />,
      // children: [
      //     { index: true, element: <OverviewScreen /> },
      //     { path: "studios", element: <StudiosScreen /> }
      // ],
    },
    {
      path: "/universityProfile",
      element: <UniversityProfile />,
    },
    {
      path: "/companyProfile",
      element: <CompanyProfile />,
    },
    {
      path: "/uploadImage",
      element: <ImageUpload />,
    },
    {
      path: "/downloadImage",
      element: <ImageGallery />,
    },
    {
      path: "/login",
      element: <LogInScreen />,
    },
    {
      path: "/signUp",
      element: <SignUpScreen />,
    },
    {
      path: "/preview",
      element: <PreviewScreen />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/details",
      element: <DetailsScreen />,
    },
    {
      path: "/detailsIntern",
      element: <DetailsScreenIntern />,
    },
    {
      path: "/detailsScholar",
      element: <DetailsScreenScholar />,
    },
    {
      path: "/myapps",
      element: <Myapps />,
    },
    {
      path: "/collegeview",
      element: <Collegeview />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default MainRoute;
