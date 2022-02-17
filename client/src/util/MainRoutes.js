import Main from "../main/Main";
import Register from "../main/component/Register";

const SubRoutes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/", element: <Main /> },
    ],
  },
];

export default SubRoutes;
