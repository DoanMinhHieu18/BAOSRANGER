import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import './homepage.scss';
import bk_logo from '../../assets/bk_logo.png';
import { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Bar from "./Bar";
// import { FALSE } from "node-sass";
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";

class HomePageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.getUser();
  }

  openBar = () => {
    this.setState({
      isOpen: !this.state.isOpen

    })
  }
  getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      this.setState({
        user: data.user._json,
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        <HeaderAdmin user={this.state.user} />
        <Bar />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageAdmin);
