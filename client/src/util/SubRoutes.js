import Dashboard from "../dashboard/Dashboard";

const SubRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
];

export default SubRoutes;
