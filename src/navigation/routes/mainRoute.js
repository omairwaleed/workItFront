// import React from "react";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
// import TestPage from "../screens/TestPage";
import PreviewScreen from "../screens/PreviewScreen";
import Profile from "../screens/Profile";
import DetailsScreen from "../screens/DetailsScreen";
import ImageUpload from "../screens/ImageUpload";
import ImageGallery from "../screens/ImageDownload";
import Myapps, { loader as myAppsLoader } from "../screens/Myapps";
import DetailsScreenIntern from "../screens/DetailsScreenIntern";
import DetailsScreenScholar from "../screens/DetailsScreenScholar";
import CompanyProfile, {
  loader as cProfileLoader,
} from "../screens/CompanyProfile";
import UniversityProfile from "../screens/UniversityProfile";
import Collegeview from "../screens/Collegeview";
import Companyview from "../screens/Companyview";
import AddInterScreen, {
  loader as addInternLoader,
  action as addInternAction,
} from "../screens/AddInterScreen";
import AddJobScreen, {
  loader as addJobLoader,
  action as addJobAction,
} from "../screens/AddJobScreen";
import AddScholarScreen, {
  action as addScholarAction,
} from "../screens/AddScholarScreen";
import Applicants, { loader as applicantsLoader } from "../screens/Applicants";

// [x] test logged out user senarnio
// [x] test user senarnio
// [x] test company senarnio
// [x] test university senarnio

const MainRoute = () => {
  const routes = createHashRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/universityProfile",
      element: <UniversityProfile />,
    },
    {
      path: "/collegeview",
      element: <Collegeview />,
    },
    {
      path: "/companyProfile",
      element: <CompanyProfile />,
      loader: cProfileLoader,
    },
    {
      path: "/companyview",
      element: <Companyview />,
    },
    {
      path: "/myapps",
      element: <Myapps />,
      loader: myAppsLoader,
    },
    {
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/add-scholar",
      element: <AddScholarScreen />,
      action: addScholarAction,
    },
    {
      path: "/add-intern",
      element: <AddInterScreen />,
      loader: addInternLoader,
      action: addInternAction,
    },
    {
      path: "/add-job",
      element: <AddJobScreen />,
      loader: addJobLoader,
      action: addJobAction,
    },

    {
      path: "/applicants/:type/:id",
      element: <Applicants />,
      loader: applicantsLoader,
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
      path: "/uploadImage",
      element: <ImageUpload />,
    },
    {
      path: "/downloadImage",
      element: <ImageGallery />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default MainRoute;

