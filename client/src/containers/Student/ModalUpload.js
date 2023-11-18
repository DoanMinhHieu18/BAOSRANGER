import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UpLoadFile from "./upLoadFIle";
// import { Modal } from "bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import upload_image from "../../assets/upload.jpg";
import icon_word from "../../assets/icon-word.png";
import "./ModalUpload.scss";
class ModalUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderId: "1wyuIVMdtVJ-jdDCpiweKu2ceO5xS_nqU",
            beforeUpload: true,
        };
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.folderId !== prevProps.folderId) {
            this.setState({ folderId: this.props.folderId });
        }
    }
    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0] });
    };
    toggle = () => {
        this.props.toggleFromParent();
    }
    continuePrint = () => {
        this.props.continue();
    }
    createFolder = async () => {
        const url = `${process.env.REACT_APP_API_URL}/drive/createFolder`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        if (data && data.errCode === 0) {
            alert("success");
            this.setState({ folderId: data.folderId });
        }
    };
    handleUploadFirst = async () => {
        this.state.beforeUpload = !this.state.beforeUpload;
        // Check if this.state.file is not null
        const formData = new FormData();
        await formData.append("file", this.state.file); // No 'await' needed here
        // const url = `${process.env.REACT_APP_API_URL}/drive/uploadFile?folderId=${this.state.folderId}`;
        // const { data } = await axios({
        //     url: url,
        //     method: "POST",
        //     data: formData,
        //     withCredentials: true,
        // });
    };
    handleUpload = async () => {
        const formData = new FormData();
        await formData.append("file", this.state.file); // No 'await' needed here
        // const url = `${process.env.REACT_APP_API_URL}/drive/uploadFile?folderId=${this.state.folderId}`;
        // const { data } = await axios({
        //     url: url,
        //     method: "POST",
        //     data: formData,
        //     withCredentials: true,
        // });
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg">
                <ModalHeader toggle={() => this.toggle()}></ModalHeader>
                <ModalBody className="modal-upload-content">
                    <div className={this.state.beforeUpload ? "firstupdate" : "updated"}>
                        <img className="image-upload" src={upload_image} />
                        <div className="content1">
                            Kéo thả tệp đến màn hình này
                        </div>
                        <div className="Or">
                            Hoặc
                        </div>
                        <div className="file-name">
                            <img className="icon-word" src={icon_word} />
                            <div className="file-content">
                                {this.state.file && this.state.file.name}
                            </div>
                        </div>
                        <div className="button-upload-before">
                            <label className="label">
                                <span onClick={() => this.handleUploadFirst()} >Tải lên từ máy tính</span>
                                <input type="file" required onChange={(event) => this.handleFileChange(event)} />

                            </label>
                        </div>
                        <div className="button-upload-after">
                            <label className="label">
                                <span onClick={() => this.handleUpload()} >Tải lên từ máy tính</span>
                                <input type="file" required onChange={(event) => this.handleFileChange(event)} />

                            </label>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button onClick={this.continuePrint} className="icon-continue">Tiếp tục</button>
                </ModalFooter>
            </Modal >
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
