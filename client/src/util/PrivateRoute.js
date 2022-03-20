import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ Component, auth }) => {
  // add isAuthenticated to make authentication active
  let location = useLocation();
  let currentlocation = location.pathname;

  return auth.isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to={`/?next=${currentlocation}`} replace={true} />
  );
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
