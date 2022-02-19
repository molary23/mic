import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../util/withRouter";
import { registeruser } from "../../action/authAction";
import PropTypes from "prop-types";

export class Signal extends Component {
  state = {
    errors: {},
  };
  componentDidUpdate(nextProps) {
    /*if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }*/
  }
  clickHandler = (e) => {
    const newUser = {
      name: "Addeola",
      age: 34,
    };
    this.props.registeruser(newUser, this.props.history);
  };
  render() {
    return (
      <div>
        Signal
        <button onClick={this.clickHandler}>click </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registeruser })(withRouter(Signal));
