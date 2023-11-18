import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./Icon.scss"; // file scss chung cho section
//
import ModalUpload from "../ModalFunction/ModalUpload";
import UploadIcon from "../../assets/upload.jpg";
import printIcon from "../../assets/printIcon.png";
import ModalUploadtoPrint from "../ModalFunction/ModalUploadtoPrint";
import ModalPrint from "../ModalFunction/ModalPrint";
class UpLoadIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalUpload: false,
      isOpenModalUploadtoPrint: false,
      isOpenModalPrint: false,
      isOptVisible: false,
    };
  }
  toggleModalUpload = () => {
    this.setState({
      isOpenModalUpload: !this.state.isOpenModalUpload,
    });
  };
  toggleModalUploadtoPrint = () => {
    this.setState({
      isOpenModalUploadtoPrint: !this.state.isOpenModalUploadtoPrint,
    });
  };
  toggleModalPrint = () => {
    this.setState({
      isOpenModalPrint: !this.state.isOpenModalPrint,
    })
  }
  directToUpload = () => {
    this.setState({
      isOpenModalUploadtoPrint: false,
      isOpenModalPrint: !this.state.isOpenModalPrint,
    });
  }
  handleClick = () => {
    this.setState({
      isOptVisible: !this.state.isOptVisible, // Toggle .opt visibility on "IconPrint" click
    });
  };

  handleDocumentClick = (event) => {
    // Check if the click is outside the .opt menu or "IconPrint"
    if (
      this.state.isOptVisible &&
      !this.optRef.contains(event.target) &&
      !this.iconPrintRef.contains(event.target)
    ) {
      this.setState({ isOptVisible: false });
    }
  };
  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  render() {
    return (
      <div className="containerr">
        <ModalUpload
          isOpen={this.state.isOpenModalUpload}
          toggleFromParent={this.toggleModalUpload}
          continue={this.directToUpload}
        />
        <ModalUploadtoPrint
          isOpen={this.state.isOpenModalUploadtoPrint}
          toggleFromParent={this.toggleModalUploadtoPrint}
        />
        <section class="support1">
          <div>
            <div
              class="visible-desktop-upload"
              onClick={() => this.toggleModalUpload()}
            >
              {" "}
              <img alt="" src={UploadIcon} />
            </div>
            <div className="visible-desktop-print">
              {" "}
              <div className={`opt ${this.state.isOptVisible ? "show" : ""}`} ref={(ref) => (this.optRef = ref)}>
                <div className="txt">In từ kho cộng đồng</div>
                <div className="txt">In từ kho cá nhân</div>
                <div className="txt" onClick={() => this.toggleModalUploadtoPrint()}>In từ thiết bị</div>
              </div>
              <div className="iconPrint" ref={(ref) => (this.iconPrintRef = ref)}>
                {" "}
                <img
                  alt=""
                  src={printIcon}
                  className=""
                  onClick={() => this.handleClick()}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpLoadIcon);
