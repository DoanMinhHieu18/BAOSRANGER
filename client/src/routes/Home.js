import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Home.scss";
import "../styles/styles.scss"
import bk_logo from "../assets/bk_logo.png";
import bkcs2 from "../assets/bkcs2.jpg";
import home_footer from "../assets/home-footer.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  render() {
    // const { isLoggedIn } = this.props;

    let linkToRedirect = "/login";
    // /system/user-manage
    // return <Redirect to={linkToRedirect} />;
    return (
      <React.Fragment>
        <div className="row home-header-container">
          <img className="logo" src={bk_logo} />
          <div className="col-1 ssps">SSPS</div>
          <div className="header-language ml-auto">
            <div className="language-top">Ngôn ngữ</div>
            <select className="language-bottom">
              <option>Tiếng Việt</option>
              <option>Tiếng Anh</option>
            </select>
          </div>
          <div className="login">
            <Link
              type="button"
              class="btn btn-primary button-login"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </div>

        <div className="home-banner bg-fluid">
          <div className="welcome-content">
            Welcome to Student Smart Printing Service
          </div>
        </div>

        <div className="container-fluid home-footer">
          <div className="row home-footer-content">
            <img className="logo-footer" src={bk_logo} />
            <div className="col-3 ssps">Student Smart Printing Service</div>
            <div className="col-2 ml-auto">
              <div className="thongtin">THÔNG TIN</div>
              <div className="about">Về chúng tôi</div>
              <div className="policy">Điều khoản và dịch vụ</div>
            </div>
            <div className="col-3">
              <div className="content1">LIÊN HỆ</div>
              <div className="content2">
                <FontAwesomeIcon icon={faPhone} /> 0392264784
              </div>
              <div className="content3">
                <FontAwesomeIcon icon={faEnvelope} /> baosranger@hcmut.edu.vn
              </div>
              <div className="content4">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                https://meet.google.com/tuh-bcix-bvt
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="row home-footer">
            <div className="footer-content">
              <div className="left-content">
                <div className="header-logo">
                  <img className="logo" src={bk_logo} />
                </div>

                <div className="ssps">Student Smart Printing Service</div>
              </div>
              <div className="left-center"></div>
              <div className="center-content">
                <div className="content1">THÔNG TIN</div>
                <div className="content2">Về chúng tôi</div>
                <div className="content3">Điều khoản và dịch vụ</div>
                <div className="content4"></div>
              </div>
              <div className="right-content">
                <div className="content1">LIÊN HỆ</div>
                <div className="content2">
                  <FontAwesomeIcon icon={faPhone} /> 0392264784
                </div>
                <div className="content3">
                  <FontAwesomeIcon icon={faEnvelope} /> baosranger@hcmut.edu.vn
                </div>
                <div className="content4">
                  <FontAwesomeIcon icon={faLocationDot} />{" "}
                  https://meet.google.com/tuh-bcix-bvt
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
