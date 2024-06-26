// import React from "react";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import TestPage from "../screens/TestPage";
import PreviewScreen from "../screens/PreviewScreen";
import Profile, { loader as profileLoader } from "../screens/Profile";
import DetailsScreen, {
  loader as detailsLoader,
} from "../screens/DetailsScreen";
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
import ChangePassword from "../screens/ChangePassword";
import ApplyScreen from "../screens/ApplyScreen";

import ForgetPassword from "../screens/ForgetPassword";
import ResetPassword from "../screens/ResetPassword";

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
      path: "/test",
      element: <TestPage />,
    },
    {
      path: "/apply",
      element: <ApplyScreen />,
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
      loader: profileLoader,
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
      loader: detailsLoader,
    },
    {
      path: "/detailsIntern",
      element: <DetailsScreenIntern />,
      loader: detailsLoader,
    },
    {
      path: "/detailsScholar",
      element: <DetailsScreenScholar />,
      loader: detailsLoader,
    },
    {
      path: "/downloadImage",
      element: <ImageGallery />,
    },
    {
      path: "/changePassword",
      element: <ChangePassword />,
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/resetPassword/:token/:type",
      element: <ResetPassword />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default MainRoute;
