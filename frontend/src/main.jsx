import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./Hero.jsx";
// import Login2 from "./Login2.jsx";
import Login2 from "./Login2.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import TrashDetaction from "./TrashDetaction.jsx";
import "./index.css";
import Prediction from "./Prediction.jsx";
import FormPembayaran from "./FormPenyetoran.jsx";
import Profile from "./UserProfile.jsx";
import Education from "./Education.jsx";
import Register2 from "./Register2.jsx";
import AdminDashboard from "./adminDashboard.jsx";
import AdminNasabah from "./adminNasabah.jsx";
import AdminMitra from "./adminMitra.jsx";
import AdminPenyetoran from "./adminPenyetoran.jsx";
import AdminPendataan from "./adminPendataan.jsx";
import AdminTrashDetaction from "./adminTrashDetaction.jsx";
import AdminEducation from "./adminEducation.jsx";
import AdminTPrice from "./adminTrashPrice.jsx";
import AdminPickup from "./adminPickup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/login",
    element: <Login2 />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register2",
    element: <Register2 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/trash-detaction",
    element: <TrashDetaction />,
  },
  {
    path: "/prediction",
    element: <Prediction />,
  },
  {
    path: "/form",
    element: <FormPembayaran />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/education",
    element: <Education />,
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
  },
  {
    path: "/admin/nasabah",
    element: <AdminNasabah/>,
  },
  {
    path: "/admin/mitra",
    element: <AdminMitra/>,
  },
  {
    path: "/admin/penyetoran",
    element: <AdminPenyetoran/>,
  },
  {
    path: "/admin/pendataan",
    element: <AdminPendataan/>,
  },
  {
    path: "/admin/trash-detaction",
    element: <AdminTrashDetaction/>,
  },
  {
    path: "/admin/education",
    element: <AdminEducation/>,
  },
  {
    path: "/admin/price",
    element: <AdminTPrice/>,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard/>,
  },
  {
    path: "/admin/pickup",
    element: <AdminPickup/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";

// import Hero from "./Hero.jsx";
// // import Login2 from "./Login2.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Hero />
//   </React.StrictMode>
// );
