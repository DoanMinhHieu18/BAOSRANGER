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
  handleGetAllUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/getalluser`;
      let data = await axios({
        url: url,
        method: "POST",
        withCredentials: true,
      });
      console.log(data.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  handleGetBlockedUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/getblockeduser`;
      let data = await axios({
        url: url,
        method: "POST",
        withCredentials: true,
      });
      console.log(data.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  handleGetAllPrinter = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admingetallprinter`;
      let data = await axios({
        url: url,
        method: "POST",
        withCredentials: true,
      });
      console.log(data.data.printer)
    } catch (err) {
      console.log(err);
    }
  }
  handleBlockUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/blockuser`;
      const test = {
        userid: "2110162"
      }
      let data = await axios({
        url: url,
        method: "POST",
        data: test,
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleDeletePrinter = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/deleteprinter`;
      const test = {
        printerid: "2"
      }
      let data = await axios({
        url: url,
        method: "POST",
        data: test,
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleGetPrintHistory = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admingetprinthistory`;
      // const test = {
      //   printerid: "2"
      // }
      let data = await axios({
        url: url,
        method: "POST",
        withCredentials: true,
      });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }
  handleGetPrintHistoryByMSSV = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admingetprinthistorybymssv`;
      const test = {
        userid: "2110162"
      }
      let data = await axios({
        url: url,
        method: "POST",
        data: test,
        withCredentials: true,
      });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }
  handleAddPrinter = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/addprinter`;
      const test = {
        printerid: 10,
        status: true,
        location: "H6",
        slot: 10,
        name: "Máy in thêm",
        type: "In màu mè",
      }
      let data = await axios({
        url: url,
        method: "POST",
        data: test,
        withCredentials: true,
      });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }
  handleUpdatePrinter = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/updateprinter`;
      const test = {
        printerid: 1,
        status: true,
        location: "H1",
        slot: 10,
        name: "Tên máy đã được sửa đổi",
        type: "In thường",
      }
      let data = await axios({
        url: url,
        method: "POST",
        data: test,
        withCredentials: true,
      });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <React.Fragment>
        <HeaderAdmin user={this.state.user} />
        {/* <Bar /> */}
        <div><button onClick={() => this.handleGetAllUser()}>Click to get all user</button></div>
        <div><button onClick={() => this.handleGetBlockedUser()}>Click to get blocked user</button></div>
        <div><button onClick={() => this.handleGetAllPrinter()}>Click to get all printer</button></div>
        <div><button onClick={() => this.handleBlockUser()}>Click to get block user</button></div>
        <div><button onClick={() => this.handleDeletePrinter()}>Click to get delete printer</button></div>
        <div><button onClick={() => this.handleGetPrintHistory()}>Click to get history print</button></div>
        <div><button onClick={() => this.handleGetPrintHistoryByMSSV()}>Click to get history print by mssv</button></div>
        <div><button onClick={() => this.handleAddPrinter()}>Click to add printer</button></div>
        <div><button onClick={() => this.handleUpdatePrinter()}>Click to update printer</button></div>
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
