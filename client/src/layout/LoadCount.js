import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllCounts } from "../action/authAction";

function LoadCount(props) {
  const { sender, level, getAllCounts } = props;
  if (sender === "login") {
    getAllCounts(level);
  }

  return <div></div>;
}

LoadCount.propTypes = {
  getAllCounts: PropTypes.func,
  auth: PropTypes.object.isRequired,
  sender: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllCounts })(LoadCount);
