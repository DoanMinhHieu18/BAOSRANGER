import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import upload_image from "../../assets/upload1.jpg";
import icon_word from "../../assets/icon-word.png";
import icon_pdf from "../../assets/PDF_icon.svg.png";
import { toast } from "react-toastify";
import "./ModalUpload.scss";
class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeUpload: true,
      file: "",
    };
  }
  handleFileChangeFirst = async (event) => {
    this.setState({
      beforeUpload: !this.state.beforeUpload,
    });
    await this.setState({ file: event.target.files[0] });
    console.log(this.state.file);
  };
  handleFileChange = async (event) => {
    await this.setState({ file: event.target.files[0] });
    console.log(this.state.file);
  };
  toggle = () => {
    this.props.toggleFromParent();
    this.setState({
      file: "",
      beforeUpload: true,
    });
  };
  continuePrint = () => {
    this.props.continue();
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
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader className="modal-upload-header" toggle={() => this.toggle()}></ModalHeader>
        <ModalBody className="modal-upload-content">
          <div className="modal-upload-configs">
            <div className="attribute-file">
              <div className="attribute-name">
                Chọn vị trí lưu tệp
              </div>
              <select className="attribute-select">
                <option className="attribute-option">Kho cộng đồng</option>
                <option className="attribute-option">Kho cá nhân</option>
              </select>
            </div>
            <div className="attribute-file">
              <div className="attribute-name">
                Chọn môn học của tệp
              </div>
              <select className="attribute-select">
                <option className="attribute-option">Giải tích 1</option>
                <option className="attribute-option">Giải tích 2</option>
                <option className="attribute-option">Đại số tuyến tính</option>
                <option className="attribute-option">Vật lí 1</option>
              </select>
            </div>
          </div>
          <div className="modal-upload-configs">
            <div className="attribute-file">
              <div className="attribute-name">
                Nhập tên tệp
              </div>
              <input className="attribute-input" placeholder="Tên tài liệu" />
            </div>
          </div>

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
        <ModalFooter className="modal-upload-footer">
          <button onClick={() => this.handleUpload()} className="icon-continue">
            Tải lên
          </button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpload);
