import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./HeaderStudent.scss";
import bk_logo from "../../assets/bk_logo.png";
// import { FALSE } from "node-sass";

class HeaderStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      clickDropDown: false,
      switchwarehouse: true,
    };
  }
  componentDidMount() { }
  isSwitchWarehouse() {
    { console.log(this.state.switchwarehouse) }
    this.setState({
      switchwarehouse: !this.state.switchwarehouse,
    })
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
  }
  handleOnClickDrop = () => {
    this.setState({
      clickDropDown: !this.state.clickDropDown,
    });
  };
  logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };
  render() {
    return (
      <React.Fragment>
        <div className="row header-homepagestudent-container">
          <img className="homepage-student-logo" src={bk_logo} />
          <div className="col-1 homepagestudent-ssps">SSPS</div>
          <div className={this.state.switchwarehouse ? "col-1 warehouse addbottom" : "col-1 warehouse"} onClick={() => this.isSwitchWarehouse()}>KHO HỆ THỐNG</div>
          <div className={this.state.switchwarehouse ? "col-1 warehouse" : "col-1 warehouse addbottom"} onClick={() => this.isSwitchWarehouse()}>KHO CÁ NHÂN</div>
          {/* <div className="avatar" onClick={() => this.handleOnClickDrop()}>
            <img src={this.state.user.picture} alt="profile" />
            <i className="fas fa-caret-down dropdown"></i>
          </div> */}
          {/* <div className="col-3">
            <div className="search">
              <i className="fas fa-search search1"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div> */}
        </div>
        {/* <div className="home-header-student-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="header-logo">
                <img className="homepage-student-logo" src={bk_logo} />
              </div>

              <div className="ssps">SSPO</div>
            </div>
            <div className="center-content col-8">
              <div className="search">
                <i className="fas fa-search search1"></i>
                <input type="text" placeholder="Search" />
              </div>
            </div>
            <div className="language">
              <div className="language-top">
                <i className="fas fa-globe"></i>Ngôn ngữ
              </div>
              <select className="language-bottom">
                <option>Tiếng Việt</option>
                <option>Tiếng Anh</option>
              </select>
              <div
                className={`container-opt ${this.state.clickDropDown ? "show" : ""
                  }`}
              >
                <div className="txt">Hồ sơ</div>
                <div className="txt" onClick={() => this.logout()}>
                  Đăng xuất
                </div>
              </div>
            </div>
            <div className="avatar" onClick={() => this.handleOnClickDrop()}>
              <img src={this.state.user.picture} alt="profile" />
              <i className="fas fa-caret-down dropdown"></i>
            </div>
          </div>
        </div> */}
      </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStudent);
