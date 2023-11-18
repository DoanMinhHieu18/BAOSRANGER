import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import upload_image from "../../assets/upload1.jpg";
import icon_word from "../../assets/icon-word.png";
import icon_pdf from "../../assets/PDF_icon.svg.png";
import { toast } from "react-toastify";
import "./ModalUploadtoPrint.scss";
class ModalUploadtoPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeUpload: true,
      file: "",
      isOpenModalPrint: false,
      filePath: "",
    };
    this.fileInputRef = React.createRef();
  }
  handleFileChangeFirst = async (event) => {
    this.setState({
      beforeUpload: !this.state.beforeUpload,
    });
    await this.setState({ file: event.target.files[0] });
    console.log(this.state.file);
    if (this.state.file) {
      const filePath = URL.createObjectURL(this.state.file);
      console.log("File Path:", filePath);
      this.setState({
        filePath: filePath,
      });
    }
  };
  handleFileChange = async (event) => {
    await this.setState({ file: event.target.files[0] });
    console.log(this.state.file);
    if (this.state.file) {
      const filePath = URL.createObjectURL(this.state.file);
      console.log("File Path:", filePath);
      this.setState({
        filePath: filePath,
      });
    }
  };
  toggle = () => {
    this.props.toggleFromParent();
    this.setState({
      file: "",
      beforeUpload: true,
    });
  };
  continuePrint = () => {
    this.setState({
      isOpenModalPrint: !this.state.isOpenModalPrint,
    });
  };
  handleChangeSite = () => {
    if (this.state.beforeUpload) {
      this.setState({
        beforeUpload: !this.state.beforeUpload,
      });
    }
  };
  handleUpload = async () => {
    const formData = new FormData();
    await formData.append("file", this.state.file); // No 'await' needed here
    const url = `${process.env.REACT_APP_API_URL}/drive/uploadFile`;
    const { data } = await axios({
      url: url,
      method: "POST",
      data: formData,
      withCredentials: true,
    });
    this.toggle();
    if (data && data.errCode === 0) {
      toast.success(data.message);
    } else {
      toast.error("error!!!");
    }
  };
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.isOpenModalPrint}
          toggle={() => this.continuePrint()}
          className="modal-print"
          size="lg"
        >
          <div className="print-preview">
            <div>
              {this.state.filePath ? (
                <iframe
                  title="fileViewer"
                  src={this.state.filePath}
                  width="100%"
                  height="700"
                />
              ) : (
                <p>No file selected</p>
              )}
            </div>
          </div>
          <div className="print-config">
            <div className="setup-print-config">Cài đặt cấu hình in</div>
            <div className="setup1">
              <div className="name-config">Số trang:</div>
              <div className={this.state.isCustom ? "custom" : "noncustom"}>
                <select onChange={this.switchCustom} className="custom-select">
                  <option className="custom-detail-all">Tất cả</option>
                  <option className="custom-detail">Tùy chọn</option>
                </select>
                <input className="custom-input" placeholder="1-5, 8-11, ..." />
              </div>
            </div>
            <div className="setup">
              <div className="name-config">Layout:</div>
              <select className="config-layout">
                <option className="option">Portrait</option>
                <option className="option">Landscape</option>
              </select>
            </div>
            <div className="setup">
              <div className="name-config">Cỡ giấy:</div>
              <select className="config-layout">
                <option className="option">A4</option>
                <option className="option">A3</option>
                <option className="option">A2</option>
                <option className="option">A1</option>
              </select>
            </div>
            <div className="setup">
              <div className="name-config">Số trang trên một mặt:</div>
              <input className="config-numpage" placeholder="Eg: 1, 4, 8,..." />
            </div>
            <div className="setup">
              <div className="name-config">Căn lề:</div>
              <select className="config-layout">
                <option className="option">Mặc định</option>
                <option className="option">Trái</option>
                <option className="option">Phải</option>
              </select>
            </div>
            <div className="setup1">
              <div className="name-config">Tỉ lệ:</div>
              <div
                className={this.state.isCustomScale ? "custom" : "noncustom"}
              >
                <select
                  onChange={this.switchCustomScale}
                  className="custom-select"
                >
                  <option className="custom-detail-all">Mặc định</option>
                  <option className="custom-detail">Tùy chọn</option>
                </select>
                <input className="custom-input" placeholder="90%, 100%" />
              </div>
            </div>
            <div className="setup">
              <div className="name-config">Số bản in:</div>
              <input className="config-numpage" placeholder="Eg: 1, 2, 3,..." />
            </div>

            <div className="action-button">
              <button className="button-continue">Tiếp tục</button>
              <button onClick={() => this.continuePrint()} className="button-cancel">
                Hủy
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader className="modal-upload-to-print-header" toggle={() => this.toggle()}></ModalHeader>
          <ModalBody className="modal-upload-to-print-content">
            <div className={this.state.beforeUpload ? "firstupdate" : "updated"}>
              <img className="image-upload" src={upload_image} />
              <div className="content1">Kéo thả tệp đến màn hình này</div>
              <div className="Or">Hoặc</div>
              <div className="file-name">
                {this.state.file &&
                  this.state.file.type === "application/pdf" && (
                    <img className="icon-pdf" src={icon_pdf} />
                  )}
                {this.state.file &&
                  this.state.file.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                    <img className="icon-word" src={icon_word} />
                  )}

                <div className="file-content">
                  {this.state.file && this.state.file.name}
                </div>
              </div>
              <div className="button-upload-before">
                <label className="label">
                  <span>Tải lên từ máy tính</span>
                  <input
                    type="file"
                    required
                    onChange={(event) => this.handleFileChangeFirst(event)}
                  // onClick={() => this.handleChangeSite()}
                  />
                </label>
              </div>
              <div className="button-upload-after">
                <label className="label">
                  <span>Tải lên từ máy tính</span>
                  <input
                    type="file"
                    required
                    onChange={(event) => this.handleFileChange(event)}
                  // onClick={() => this.handleChangeSite()}
                  />
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="modal-upload-to-print-header">
            <button onClick={() => this.continuePrint()} className="icon-continue">
              Tiếp tục
            </button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUploadtoPrint);
