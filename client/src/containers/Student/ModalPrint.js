import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./ModalPrint.scss";
// import { Modal } from "bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faL } from "@fortawesome/free-solid-svg-icons";

class ModalPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCustom: false,
            isCustomScale: false,
        };
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    switchCustom = () => {
        this.setState({
            isCustom: !this.state.isCustom,
        })
    }
    switchCustomScale = () => {
        this.setState({
            isCustomScale: !this.state.isCustomScale,
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className="modal-print"
                size="lg"
            >
                <div className="print-preview">

                </div>
                <div className="print-config">
                    <div className="setup-print-config">
                        Cài đặt cấu hình in
                    </div>
                    <div className="setup1">
                        <div className="name-config">
                            Số trang:
                        </div>
                        <div className={this.state.isCustom ? "custom" : "noncustom"}>
                            <select onChange={this.switchCustom} className="custom-select">
                                <option className="custom-detail-all" >Tất cả</option>
                                <option className="custom-detail" >Tùy chọn</option>
                            </select>
                            <input className="custom-input" placeholder="1-5, 8-11, ..." />
                        </div>

                    </div>
                    <div className="setup">
                        <div className="name-config">
                            Layout:
                        </div>
                        <select className="config-layout">
                            <option className="option">Portrait</option>
                            <option className="option">Landscape</option>
                        </select>
                    </div>
                    <div className="setup">
                        <div className="name-config">
                            Cỡ giấy:
                        </div>
                        <select className="config-layout">
                            <option className="option">A4</option>
                            <option className="option">A3</option>
                            <option className="option">A2</option>
                            <option className="option">A1</option>
                        </select>
                    </div>
                    <div className="setup">
                        <div className="name-config">
                            Số trang trên một mặt:
                        </div>
                        <input className="config-numpage" placeholder="Eg: 1, 4, 8,..." />

                    </div>
                    <div className="setup">
                        <div className="name-config">
                            Căn lề:
                        </div>
                        <select className="config-layout">
                            <option className="option">Mặc định</option>
                            <option className="option">Trái</option>
                            <option className="option">Phải</option>
                        </select>
                    </div>
                    <div className="setup1">
                        <div className="name-config">
                            Tỉ lệ:
                        </div>
                        <div className={this.state.isCustomScale ? "custom" : "noncustom"}>
                            <select onChange={this.switchCustomScale} className="custom-select">
                                <option className="custom-detail-all" >Mặc định</option>
                                <option className="custom-detail" >Tùy chọn</option>
                            </select>
                            <input className="custom-input" placeholder="90%, 100%" />
                        </div>

                    </div>
                    <div className="setup">
                        <div className="name-config">
                            Số bản in:
                        </div>
                        <input className="config-numpage" placeholder="Eg: 1, 2, 3,..." />
                    </div>

                    <div className="action-button">
                        <button className="button-continue">
                            Tiếp tục
                        </button>
                        <button className="button-cancel">
                            Hủy
                        </button>
                    </div>
                </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPrint);
