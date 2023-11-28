import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UpLoadFile from "./upLoadFIle";
import HeaderStudent from "./HeaderStudent";
import UpLoad_Print from "../Icon/UpLoad&PrintIcon";
import ModalPrint from "../ModalFunction/ModalPrint";
import "./homepage.scss";
import HomeFooter from "../../routes/HomeFooter";
import image_folder from "../../assets/folder.jpg";
import ModelSetUpPrint from "../ModalFunction/ModalSetupPrint";
// import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { getUserInfoService } from "../../services/userService"
class HomePageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isOpenModalSetupPrint: false,
      isOpenModalPrint: false,
      folderId: "",
      document: {},
      configprint: {},
      setupprinter: {},
      searchcontent: "",
    };
  }
  toggleModalSetupPrint = () => {
    this.setState({ isOpenModalSetupPrint: !this.state.isOpenModalSetupPrint });
  }
  toggleModalPrint = (doc) => {
    this.setState({ isOpenModalPrint: !this.state.isOpenModalPrint, doc: doc })
  }
  async componentDidMount() {
    await this.getUser();
    await this.getAllDoc();
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
  getAllDoc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/getalldoc`;
    const { data } = await axios.post(url, { userid: "2110162" })
    if (data) {
      this.setState({
        document: data
      })
    }

  }
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
  handleConfigPrint = (data) => {
    this.setState({
      configprint: data
    })
  };
  handleSetupPrint = async (data) => {
    await this.setState({
      setupprinter: data
    });
    await this.handlePrint()
  }
  handlePrint = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/print`;
    const test = {
      doc: this.state.document.doc[0],
      configprint: this.state.configprint,
      setupprinter: this.state.setupprinter
    }
    await axios({
      url: url,
      method: "POST",
      data: test,
      withCredentials: true,
    });
  }
  handleBuyPage = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/buypage`;
    const test = {
      userid: "2110162",
      numpage: 10,
      price: 50000,
      payconfirm: false
    }
    await axios({
      url: url,
      method: "POST",
      data: test,
      withCredentials: true,
    });
  }
  handleOnChangeSearch = (event) => {
    this.setState({
      searchcontent: event.target.value
    })
  }
  handleSearch = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/search`;
    const test = {
      content: this.state.searchcontent,
      location: "kho cá nhân"
    }
    let data = await axios({
      url: url,
      method: "POST",
      data: test,
      withCredentials: true,
    });
    console.log(data.data.doc[0])
  }
  handleDeleteDocument = async (doc) => {
    const url = `${process.env.REACT_APP_API_URL}/api/deletedoc`;
    let data = await axios({
      url: url,
      method: "POST",
      data: doc,
      withCredentials: true,
    });
  }
  handleGetHistoryPrint = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/getprinthistory`;
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
  }
  handleGetHistoryBuy = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/getprintbuy`;
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
  }
  render() {
    const listdoc = this.state.document.doc;
    return (
      <React.Fragment>
        <HeaderStudent user={this.state.user} />
        <div>
          {listdoc && listdoc.length > 0 && listdoc.map((doc, index) => (
            // { console.log(doc) }
            <button onClick={() => this.toggleModalPrint(doc)}>Print</button>

          ))
          }
        </div>
        <div>
          {listdoc && listdoc.length > 0 && listdoc.map((doc, index) => (
            // { console.log(doc) }
            <button onClick={() => this.handleDeleteDocument(doc)}>Delete</button>

          ))
          }
        </div>
        <div>
          <button onClick={() => this.handleBuyPage()}>Buy Page</button>
        </div>
        <div><input onChange={(event) => this.handleOnChangeSearch(event)} /></div>
        <div><button onClick={() => this.handleSearch()}>Click to Search</button></div>
        <div><button onClick={() => this.handleGetHistoryPrint()}>Click to xem lịch sử in</button></div>
        <div><button onClick={() => this.handleGetHistoryBuy()}>Click to xem lịch sử mua</button></div>
        {/* <table >
          <tr>
            <th>STT</th>
            <th>Tên flie</th>
            <th>Môn</th>
            <th>Link</th>
            <th>Xóa</th>
          </tr>
          {this.state.document.doc.forEach(element => {
            
          });}
          <tr>
            <td>1</td>
            <td>{this.state.coursetoShow.subject_code}</td>
            <td>{this.state.coursetoShow.subject_name}</td>
            <td>{this.state.coursetoShow.credits}</td>
            <td><button className="custombuttoncourse" onClick={() => this.handleChooseCourse()}>Chọn</button></td>
          </tr>
        </table> */}
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
          handle={this.handleSetupPrint}
        />
        <ModalPrint
          doc={this.state.doc}
          isOpen={this.state.isOpenModalPrint}
          toggleFromParent={this.toggleModalPrint}
          handle={this.handleConfigPrint}
          toSetupPrint={this.toggleModalSetupPrint}
        />
      </React.Fragment >
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
