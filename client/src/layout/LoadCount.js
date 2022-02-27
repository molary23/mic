import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {getAllCounts} from "../action/authAction";

function LoadCount(props) {

  const {sender, level} = props;
     if (sender === 'login') {
     if (level === 3) {
       props.getAllCounts(level)
     }
    }



  return (
    <div>
    
    </div>
  )
}

LoadCount.propTypes = {
  getAllCounts: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllCounts })(LoadCount);