import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllCounts, getMode } from "../action/authAction";

function LoadCount(props) {
  const { sender, level, getAllCounts, getMode } = props;
  if (sender === "login") {
    getAllCounts(level);
    getMode(level);
  }

  return <div></div>;
}

LoadCount.propTypes = {
  getAllCounts: PropTypes.func,
  getMode: PropTypes.func,
  auth: PropTypes.object.isRequired,
  sender: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllCounts, getMode })(LoadCount);
