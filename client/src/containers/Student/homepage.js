import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UpLoadFile from "./upLoadFIle";
import HeaderStudent from "./HeaderStudent";
import UpLoad_Print from "../Icon/UpLoad&PrintIcon";
import "./homepage.scss";
import HomeFooter from "../../routes/HomeFooter";
import image_folder from "../../assets/folder.jpg";
import ModelSetUpPrint from "../ModalFunction/ModalSetupPrint";
// import { push } from "connected-react-router";
import * as actions from "../../store/actions";

class HomePageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isOpenModalSetupPrint: false,
      folderId: "",
    };
  }
  toggleModalSetupPrint = () => {
    this.setState({ isOpenModalSetupPrint: !this.state.isOpenModalSetupPrint });
  }
  async componentDidMount() {
    await this.getUser();

  }
  getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      this.setState({
        user: data.user._json,
      });
      this.props.getUserInfo(this.state.user);
    } catch (err) {
      console.log(err);
    }
  };
  createFolder = async () => {
    const url = `${process.env.REACT_APP_API_URL}/drive/createFolder`;
    const { data } = await axios({
      url: url,
      method: "GET",
      withCredentials: true,
    });
    if (data && data.errCode === 0) {
      alert("success");
      this.setState({ folderId: data.folderId });
    }
  };
  render() {
    return (
      <React.Fragment>
        {console.log(this.props.userInfo)}
        <HeaderStudent user={this.state.user} />

        {/* {console.log(this.props.userInfo)} */}
        {/* <div className="container-folder">
          <div className="container-folder-content">
            <div className="folder">
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Cấu trúc rời rạc</div>
              </div>
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Chủ nghĩa xã hội khoa học</div>
              </div>
            </div>
            <div className="folder">
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Công nghệ phần mềm</div>
              </div>
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Đại số tuyến tính</div>
              </div>
            </div>
            <div className="folder">
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Giải tích 2</div>
              </div>
              <div className="folder-content">
                <img src={image_folder} className="image-folder" />
                <div className="folder-name">Hóa đại cương</div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter /> */}
        <UpLoad_Print />
        <ModelSetUpPrint
          isOpen={this.state.isOpenModalSetupPrint}
          toggleFromParent={this.toggleModalSetupPrint}
        />

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (userInfo) => dispatch(actions.getUserInfo(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageStudent);
